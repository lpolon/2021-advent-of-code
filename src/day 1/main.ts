import { getInput } from 'src/helper/getInput';

export const countDepthIncreases = (input: number[]) => {
  return input.reduce<number>((acc, value, index, arr) => {
    const prevValue = arr[index - 1];

    if (!prevValue) return acc;

    if (value - prevValue > 0) return acc + 1;

    return acc;
  }, 0);
};

export const countDepthIncreasesInThreeMeasurementSlidingWindow = (input: number[]) => {
  const threeValueSum = input
    .map<number | undefined>((value, index, arr) => {
      const valueMinusOne = arr[index - 1];
      const valueMinusTwo = arr[index - 2];

      if (!valueMinusOne || !valueMinusTwo || !value) {
        return;
      }
      return valueMinusTwo + valueMinusOne + value;
    })
    .filter((e: number | undefined): e is number => Boolean(e));

  return countDepthIncreases(threeValueSum);
};
