import fetchInput from 'src/helper/fetchInput';
import {
  buildBitFrequencyPerPosition,
  calcEpsilonRate,
  calcGammaRate,
  calcPowerConsumption,
} from './main';

const buildExampleInput = () =>
  '00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010';

describe('buildBitFrequencyPerPosition', () => {
  it('returns an array with length equal the number of bits', () => {
    const input = buildExampleInput();
    const expectedLength = input.split(/\n/)[0].length;

    const output = buildBitFrequencyPerPosition(input);
    expect(output.length).toBe(expectedLength);
  });
  it('returns arr of object with frequency of 0 and 1 in its respective positions', () => {
    const input = buildExampleInput();
    const [firstPos, secondPos, thirdPos, fourthPos, fifthPos] =
      buildBitFrequencyPerPosition(input);

    expect(firstPos).toEqual({ 0: 5, 1: 7 });
    expect(secondPos).toEqual({ 0: 7, 1: 5 });
    expect(thirdPos).toEqual({ 0: 4, 1: 8 });
    expect(fourthPos).toEqual({ 0: 5, 1: 7 });
    expect(fifthPos).toEqual({ 0: 7, 1: 5 });
  });
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

describe ('the o2 generator rating', () => {

})
