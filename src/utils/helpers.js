/**
 * @Author: JoseMunoz
 * @Date:   2018-09-15T15:14:12-06:00
 * @Last modified by:   JoseMunoz
 * @Last modified time: 2018-09-15T15:15:49-06:00
 */
import { round, reduce } from 'lodash';

const toHex = number => number.toString(16);
const padHex = hex => (hex.length === 1 ? `0${hex}` : hex);

const interpolateColors = (step, colors = []) => {
  const [start, end] = colors;
  const invertedStep = round(1 - step, 3);

  return reduce(start, (aggregator, value, i) => {
    const nextValue = end[i] * step;
    const invertedValue = value * invertedStep;
    const componentValue = round(invertedValue + nextValue, 3);
    const hexValue = toHex(componentValue);

    return `${aggregator}${padHex(hexValue)}`;
  }, '#');
};

export {
  toHex,
  padHex,
  interpolateColors,
};
