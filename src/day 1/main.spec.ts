import { countDepthIncreases } from './main';

test('test', () => {
  const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

  const result = countDepthIncreases(input);

  expect(result).toEqual(7);
});
