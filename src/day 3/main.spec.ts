import fetchInput from 'src/helper/fetchInput';
import {
  calcEpsilonRate,
  calcGammaRate,
  calcPowerConsumption,
  getBitNumberLength,
  getCO2ScrubberRating,
  getLifeSupportRating,
  getModalBitByIndex,
  getOxyGenRating,
  parseInput,
} from './main';

const buildExampleInput = () =>
  '00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010';

test('getBitNumberLength should return expected value', () => {
  const input = buildExampleInput();
  const output = getBitNumberLength(input);
  expect(output).toBe(5);
});

test('getModalBitByIndex return the most common bit value given an index', () => {
  const input = buildExampleInput();
  const bitNumbers = parseInput(input);
  expect(getModalBitByIndex(bitNumbers, 0)).toBe('1');
  expect(getModalBitByIndex(bitNumbers, 1)).toBe('0');
  expect(getModalBitByIndex(bitNumbers, 2)).toBe('1');
  expect(getModalBitByIndex(bitNumbers, 3)).toBe('1');
  expect(getModalBitByIndex(bitNumbers, 4)).toBe('0');
});

test('calcGammaRate works', () => {
  const input = buildExampleInput();
  const output = calcGammaRate(input);

  expect(output).toBe(22);
});
test('calcEpsilonRate works', () => {
  const input = buildExampleInput();
  const output = calcEpsilonRate(input);

  expect(output).toBe(9);
});

test('day 3-1 input result', () => {
  const input = fetchInput(3);
  const output = calcPowerConsumption(input);

  expect(output).toMatchInlineSnapshot(`3309596`);
});

test('the o2 generator rating works as expect', () => {
  const input = buildExampleInput();
  const output = getOxyGenRating(input);

  expect(output).toBe(23);
});

test('the CO2 scrubbing rating works as expect', () => {
  const input = buildExampleInput();
  const output = getCO2ScrubberRating(input);

  expect(output).toBe(10);
});

test('day 3-2 example result', () => {
  const input = buildExampleInput();

  const output = getLifeSupportRating(input);

  expect(output).toMatchInlineSnapshot(`230`);
});

test('day 3-2 input result', () => {
  const input = fetchInput(3);
  const output = getLifeSupportRating(input);

  expect(output).toMatchInlineSnapshot(`2981085`);
});
