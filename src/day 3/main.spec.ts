import fetchInput from 'src/helper/fetchInput';
import {
  // buildBitFrequencyPerPosition,
  calcEpsilonRate,
  calcGammaRate,
  calcPowerConsumption,
  getBitNumberLength,
  getModalBitByIndex,
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
  expect(getModalBitByIndex(input, 0)).toBe('1');
  expect(getModalBitByIndex(input, 1)).toBe('0');
  expect(getModalBitByIndex(input, 2)).toBe('1');
  expect(getModalBitByIndex(input, 3)).toBe('1');
  expect(getModalBitByIndex(input, 4)).toBe('0');
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

xtest('day 3-1 input result', () => {
  const input = fetchInput(3);
  const output = calcPowerConsumption(input);

  expect(output).toMatchInlineSnapshot(`3309596`);
});

xdescribe('the o2 generator rating', () => {
  it('lala', () => {
    const input = buildExampleInput();
    // getO2GenRating(input);
  });
});
