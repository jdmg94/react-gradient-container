/*
* @Author: JoseMunoz
* @Date:   2018-06-10 10:01:51
 * @Last modified by:   JoseMunoz
 * @Last modified time: 2018-09-15T17:07:16-06:00
*/
import {
  nth,
  map,
  chunk,
  round,
  isString,
  startsWith,
} from 'lodash';

import {
  all,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

import convert from 'color-convert';
import {
  setIndices,
  setGradientRange,
  CHANGE_COLOR,
  SET_GRADIENT_RANGE,
} from './ReactGradientContainer.ducks';

const StepFromState = state => state.step;
const ColorsFromState = state => state.colors;
const ColorLengthFromState = state => state.colors.length;
const TransitionIndicesFromState = state => state.colorIndices;

const sanitizeHash = item => (startsWith(item, '#') ? item.replace('#', '') : item);

const interpolateColors = (step, colors = []) => {
  const [start, end] = colors;
  const invertedStep = round(1 - step, 3);

  const RGBData = map(start, (value, i) => {
    const nextValue = round(end[i] * step, 3);
    const invertedValue = round(value * invertedStep, 3);
    const componentValue = round(invertedValue + nextValue, 0);

    return componentValue;
  });

  return convert.rgb.hex(RGBData);
};

function* calculateNewIndices() {
  const step = yield select(StepFromState);

  if (step >= 1) {
    const colorLength = yield select(ColorLengthFromState);
    const colorIndices = yield select(TransitionIndicesFromState);
    const newIndices = map(colorIndices, (value, i) => {
      if (i % 2 !== 0) {
        const seed = Math.random() * colorLength;
        const nextValue = value + Math.floor(1 + seed);

        return nextValue % colorLength;
      }

      return nth(colorIndices, i + 1);
    });

    yield put(setIndices(newIndices));
  }
}

function* calculateNewGradient() {
  const step = yield select(StepFromState);
  const colorIndices = yield select(TransitionIndicesFromState);
  const colors = map(yield select(ColorsFromState), item => {
    if (isString(item)) {
      const buffer = sanitizeHash(item);
      return convert.hex.rgb(buffer);
    }

    return item;
  });

  const newColors = map(colorIndices, i => colors[i]);
  const chunks = chunk(newColors, 2);
  const [start, end] = map(chunks, item => interpolateColors(step, item));

  yield put(setGradientRange(start, end));
}

function* rootSaga() {
  yield all([
    takeEvery(CHANGE_COLOR, calculateNewGradient),
    takeEvery(SET_GRADIENT_RANGE, calculateNewIndices),
  ]);
}

export default rootSaga;
