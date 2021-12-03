import { countDepthIncreases, countDepthIncreasesInThreeMeasurementSlidingWindow } from './main';
import { fetchInput } from 'src/helper/fetchInput';
const input = '199\n200\n208\n210\n200\n207\n240\n269\n260\n263';

test('day 1-1 example', () => {
  const result = countDepthIncreases(input);
  expect(result).toEqual(7);
});

test('day 1-1 input result', () => {
  expect(countDepthIncreases(fetchInput(1))).toMatchInlineSnapshot(`1754`);
});

test('day 1-2 example', () => {
  const result = countDepthIncreasesInThreeMeasurementSlidingWindow(input);
  expect(result).toEqual(5);
});

test('day 1-2 input result', () => {
  expect(countDepthIncreasesInThreeMeasurementSlidingWindow(fetchInput(1))).toMatchInlineSnapshot(
    `1789`,
  );
});
