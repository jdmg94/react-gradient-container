/*
* @Author: JoseMunoz
* @Date:   2018-06-10 10:01:51
* @Last Modified by:   JoseMunoz
* @Last Modified time: 2018-06-12 12:44:14
*/
import { map, chunk, nth, round } from 'lodash';
import { detect } from 'detect-browser';
import {
  all,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

import {
  CHANGE_COLOR,
  INCREASE_STEP,
  reduceStep,
  setIndices,
  setGradient,
  increaseStep,
} from './ReactGradientContainer.ducks';

const getStep = state => state.step;
const getColors = state => state.colors;
const getColorLength = state => state.colors.length;
const getColorTransitionIndices = state => state.colorIndices;

const interpolateColors = (step, colors = []) => {
  const [start, end] = colors;
  const invertedStep = round(1 - step, 3);

  const [R, G, B] = map(start, (value, i) => {
    const nextValue = end[i] * step;
    const invertedValue = value * invertedStep;
    return Math.round(invertedValue + nextValue);
  });

  return `rgb(${R}, ${G}, ${B})`;
};

const deriveGradient = (...colors) => {
  const [start, end] = colors;
  const browser = detect();

  switch (browser.name) {
    case 'chrome': {
      return `-webkit-gradient(linear, left top, right bottom, from(${start}), to(${end}))`;
    }

    case 'firefox': {
      return `-moz-linear-gradient(to right bottom, ${start}, ${end})`;
    }

    case 'opera': {
      return `-o-linear-gradient(to right bottom, ${start}, ${end})`;
    }

    default:
      return `linear-gradient(to right bottom, ${start}, ${end})`;
  }
};

function* calculateNewIndices() {
  const step = yield select(getStep);

  if (step >= 1) {
    const colorLength = yield select(getColorLength);
    const colorIndices = yield select(getColorTransitionIndices);
    const newIndices = map(colorIndices, (value, i) => {
      if (i % 2 !== 0) {
        const baseZeroColorLength = colorLength - 1;
        const seed = Math.random() * baseZeroColorLength;
        const nextValue = value + Math.floor(1 + seed);
        return nextValue % colorLength;
      }

      return nth(colorIndices, i + 1);
    });

    yield put(setIndices(newIndices));
    yield put(reduceStep());
  }
}

function* calculateNewGradient() {
  const step = yield select(getStep);
  const colors = yield select(getColors);
  const colorIndices = yield select(getColorTransitionIndices);

  const newColors = map(colorIndices, i => colors[i]);
  const chunks = chunk(newColors, 2);
  const [start, end] = map(chunks, item => interpolateColors(step, item));
  const gradient = deriveGradient(start, end);

  yield put(setGradient(gradient));
  yield put(increaseStep());
}

function* rootSaga() {
  yield all([
    takeEvery(CHANGE_COLOR, calculateNewGradient),
    takeEvery(INCREASE_STEP, calculateNewIndices),
  ]);
}

export default rootSaga;
