/*
* @Author: JoseMunoz
* @Date:   2018-06-10 10:01:40
 * @Last modified by:   JoseMunoz
 * @Last modified time: 2018-09-15T17:41:56-06:00
*/
import { round } from 'lodash';

const initialState = {
  step: 0,
  end: '',
  start: '',
  transitionSpeed: 0.005,
  colorIndices: [0, 1, 2, 3],
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

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_COLORS: {
      const { start, end } = payload;
      const { step: prevStep, transitionSpeed } = state;
      const step = round(prevStep + transitionSpeed, 3);

      return {
        ...state,
        end,
        step,
        start,
      };
    }

    case SET_INDICES: {
      let { step } = state;
      const { colorIndices } = payload;

      if (step >= 1) {
        step %= 1;
      }

      return { ...state, colorIndices, step };
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

export default reducer;
export {
  setColors,
  setIndices,
  changeColor,
  SET_COLORS,
  SET_INDICES,
  CHANGE_COLOR,
};
