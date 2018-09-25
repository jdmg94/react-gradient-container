/*
* @Author: JoseMunoz
* @Date:   2018-06-10 10:01:40
 * @Last modified by:   JoseMunoz
 * @Last modified time: 2018-09-15T17:41:56-06:00
*/
import {
  round,
  reduce,
  isArray,
  isString,
  isNumber,
} from 'lodash';

const initialState = {
  step: 0,
  end: '',
  start: '',
  colors: [],
  transitionSpeed: 0.005,
  colorIndices: [0, 1, 2, 3],
  gradientOrientation: 'to bottom right',
};

const SET_COLORS = 'jdmg94/ReactGradientContainer/SET_COLORS';
const SET_INDICES = 'jdmg94/ReactGradientContainer/SET_INDICES';
const CHANGE_COLOR = 'jdmg94/ReactGradientContainer/CHANGE_COLOR';
const SET_ORIENTATION = 'jdmg94/ReactGradientContainer/SET_ORIENTATION';
const SET_GRADIENT_RANGE = 'jdmg94/ReactGradientContainer/SET_GRADIENT_RANGE';

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_COLORS: {
      const { colors } = payload;

      return {
        ...state,
        colors,
      };
    }

    case SET_INDICES: {
      let { step } = state;
      const { colorIndices } = payload;

      if (step >= 1) {
        step %= 1;
      }

      return {
        ...state,
        step,
        colorIndices,
      };
    }

    case SET_GRADIENT_RANGE: {
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

    case SET_ORIENTATION: {
      const { orientationValues } = payload;

      if (isArray(orientationValues)) {
        const gradientOrientation = reduce(orientationValues, (aggregator, item, index) => {
          if (index < 2) {
            return `${aggregator} ${item}`;
          }

          return aggregator;
        }, 'to');

        return { ...state, gradientOrientation };
      }

      if (isString(orientationValues)) {
        const gradientOrientation = `to ${orientationValues}`;

        return { ...state, gradientOrientation };
      }

      if (isNumber(orientationValues)) {
        const gradientOrientation = `${orientationValues}deg`;

        return { ...state, gradientOrientation };
      }

      return state;
    }

    case CHANGE_COLOR:
    default: return state;
  }
};

const changeColor = () => ({ type: CHANGE_COLOR });
const setColors = colors => ({ type: SET_COLORS, payload: { colors }});
const setIndices = colorIndices => ({
  type: SET_INDICES,
  payload: { colorIndices },
});

const setGradientRange = (start, end) => ({
  type: SET_GRADIENT_RANGE,
  payload: { start, end },
});

const setOrientation = orientationValues => ({
  type: SET_ORIENTATION,
  payload: { orientationValues },
});

export default reducer;
export {
  setColors,
  setIndices,
  changeColor,
  setOrientation,
  setGradientRange,
  SET_COLORS,
  SET_INDICES,
  CHANGE_COLOR,
  SET_ORIENTATION,
  SET_GRADIENT_RANGE,
};
