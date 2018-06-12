/*
* @Author: JoseMunoz
* @Date:   2018-06-10 10:01:40
* @Last Modified by:   JoseMunoz
* @Last Modified time: 2018-06-10 22:41:42
*/
import { round } from 'lodash';

const initialState = {
  // color table indices for:
  // current color left
  // next color left
  // current color right
  // next color right
  colorIndices: [0, 1, 2, 3],
  step: 0,
  gradient: '',
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

const SET_TASK = 'jdmg94/ReactGradientContainer/SET_TASK';
const SET_INDICES = 'jdmg94/ReactGradientContainer/SET_INDICES';
const REDUCE_STEP = 'jdmg94/ReactGradientContainer/REDUCE_STEP';
const SET_GRADIENT = 'jdmg94/ReactGradientContainer/SET_GRADIENT';
const CHANGE_COLOR = 'jdmg94/ReactGradientContainer/CHANGE_COLOR';
const INCREASE_STEP = 'jdmg94/ReactGradientContainer/INCREASE_STEP';
const REMOVE_GRADIENT = 'jdmg94/ReactGradientContainer/REMOVE_GRADIENT';

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TASK: {
      const { currentTask } = payload;

      return { ...state, currentTask };
    }

    case SET_INDICES: {
      const { colorIndices } = payload;

      return { ...state, colorIndices };
    }

    case SET_GRADIENT: {
      const { gradient } = payload;

      return { ...state, gradient };
    }

    case INCREASE_STEP: {
      const { step: prevStep, transitionSpeed } = state;
      const step = round(prevStep + transitionSpeed, 3);

      return { ...state, step };
    }

    case REDUCE_STEP: {
      let { step } = state;

      if (step >= 1) {
        step %= 1;
      }

      return { ...state, step };
    }

    case REMOVE_GRADIENT: {
      const { currentTask } = state;

      clearInterval(currentTask);

      return { ...state, currentTask: null };
    }

    case CHANGE_COLOR:
    default:
      return state;
  }
};

const setTask = currentTask => ({
  type: SET_TASK,
  payload: { currentTask },
});

const setIndices = colorIndices => ({
  type: SET_INDICES,
  payload: { colorIndices },
});

const setGradient = gradient => ({
  type: SET_GRADIENT,
  payload: { gradient },
});

const reduceStep = () => ({ type: REDUCE_STEP });
const changeColor = () => ({ type: CHANGE_COLOR });
const increaseStep = () => ({ type: INCREASE_STEP });
const removeGradient = () => ({ type: REMOVE_GRADIENT });

export default reducer;
export {
  // actions
  SET_TASK,
  SET_INDICES,
  REDUCE_STEP,
  SET_GRADIENT,
  CHANGE_COLOR,
  INCREASE_STEP,
  REMOVE_GRADIENT,
  // action creators
  setTask,
  setIndices,
  setGradient,
  reduceStep,
  changeColor,
  increaseStep,
  removeGradient,
};
