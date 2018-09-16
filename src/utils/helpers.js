/**
 * @Author: JoseMunoz
 * @Date:   2018-09-15T15:14:12-06:00
 * @Last modified by:   JoseMunoz
 * @Last modified time: 2018-09-15T18:19:50-06:00
 */
import { round, map, toUpper } from 'lodash';

const padHex = hex => {
  const zeroesPadding = new Array(7 - hex.length).join('0');

  return `${zeroesPadding}${hex}`;
};

export const RGBToHex = ([r, g, b]) => {
  const bin = r << 16 | g << 8 | b; // eslint-disable-line
  const rawHex = toUpper(bin.toString(16));

  return padHex(rawHex);
};

export const interpolateColors = (step, colors = []) => {
  const [start, end] = colors;
  const invertedStep = round(1 - step, 3);

  const RGBData = map(start, (value, i) => {
    const nextValue = round(end[i] * step, 3);
    const invertedValue = round(value * invertedStep, 3);
    const componentValue = round(invertedValue + nextValue, 0);

    return componentValue;
  });

  return RGBToHex(RGBData);
};
