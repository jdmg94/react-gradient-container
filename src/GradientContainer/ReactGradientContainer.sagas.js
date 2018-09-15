/*
* @Author: JoseMunoz
* @Date:   2018-06-10 10:01:51
 * @Last modified by:   JoseMunoz
 * @Last modified time: 2018-09-15T15:24:51-06:00
*/
import {
  nth,
  map,
  chunk,
} from 'lodash';

import {
  all,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

import {
  setColors,
  setIndices,
  SET_COLORS,
  CHANGE_COLOR,
} from './ReactGradientContainer.ducks';

import { interpolateColors } from '../utils/helpers';

const colorLength = 6;
const StepFromState = state => state.step;
const ColorsFromState = state => state.colors;
const TransitionIndicesFromState = state => state.colorIndices;

function* calculateNewIndices() {
  const step = yield select(StepFromState);

  if (step >= 1) {
    const colorIndices = yield select(TransitionIndicesFromState);
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
  }
}

function* calculateNewGradient() {
  const step = yield select(StepFromState);
  const colors = yield select(ColorsFromState);
  const colorIndices = yield select(TransitionIndicesFromState);

  const newColors = map(colorIndices, i => colors[i]);
  const chunks = chunk(newColors, 2);
  const [start, end] = map(chunks, item => interpolateColors(step, item));


  yield put(setColors(start, end));
}

function* rootSaga() {
  yield all([
    takeEvery(CHANGE_COLOR, calculateNewGradient),
    takeEvery(SET_COLORS, calculateNewIndices),
  ]);
}

export default rootSaga;
