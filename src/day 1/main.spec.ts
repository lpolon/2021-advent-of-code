import { countDepthIncreases, countDepthIncreasesInThreeMeasurementSlidingWindow } from './main';
import { getInput } from 'src/helper/getInput';
const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

test('day 1-1 example', () => {
  const result = countDepthIncreases(input);
  expect(result).toEqual(7);
});

test('day 1-1 input result', () => {
  console.log(countDepthIncreases(getInput(1)));
});

test('day 1-2 example', () => {
  const result = countDepthIncreasesInThreeMeasurementSlidingWindow(input);
  expect(result).toEqual(5);
});

test('day 1-2 input result', () => {
  console.log(countDepthIncreasesInThreeMeasurementSlidingWindow(getInput(1)));
});
