/*
* @Author: JoseMunoz
* @Date:   2018-06-10 10:01:40
 * @Last modified by:   JoseMunoz
 * @Last modified time: 2018-09-15T15:07:14-06:00
*/
import { round } from 'lodash';

const initialState = {
  // color table indices for:
  // current color left
  // next color left
  // current color right
  // next color right
  colorIndices: [
    0,
    1,
    2,
    3,
  ],
  step: 0,
  end: '',
  start: '',
  currentTask: null,
  transitionSpeed: 0.005,
  colors: [
  // R    G    B
    [62, 35, 255],
    [60, 255, 60],
    [255, 35, 98],
    [45, 175, 230],
    [255, 0, 255],
    [255, 128, 0],
  ],
};

const SET_INDICES = 'jdmg94/ReactGradientContainer/SET_INDICES';
const SET_COLORS = 'jdmg94/ReactGradientContainer/SET_COLORS';
const CHANGE_COLOR = 'jdmg94/ReactGradientContainer/CHANGE_COLOR';
const INCREASE_STEP = 'jdmg94/ReactGradientContainer/INCREASE_STEP';

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_COLORS: {
      const { start, end } = payload;

      return { ...state, start, end };
    }

    case SET_INDICES: {
      let { step } = state;
      const { colorIndices } = payload;

      if (step >= 1) {
        step %= 1;
      }

      return { ...state, colorIndices, step };
    }

    case INCREASE_STEP: {
      const { step: prevStep, transitionSpeed } = state;
      const step = round(prevStep + transitionSpeed, 3);

      return { ...state, step };
    }

    case CHANGE_COLOR:
    default: return state;
  }
};

const setIndices = colorIndices => ({
  type: SET_INDICES,
  payload: { colorIndices },
});

const setColors = (start, end) => ({
  type: SET_COLORS,
  payload: { start, end },
});

const changeColor = () => ({ type: CHANGE_COLOR });
const increaseStep = () => ({ type: INCREASE_STEP });

export default reducer;
export {
  setColors,
  setIndices,
  changeColor,
  increaseStep,
  SET_COLORS,
  SET_INDICES,
  CHANGE_COLOR,
  INCREASE_STEP,
};
