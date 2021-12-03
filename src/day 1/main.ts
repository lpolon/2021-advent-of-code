const parseInput = (input: string): number[] => input.split(/\n/).map(Number);

const countDepthIncreasesFromNumbers = (input: number[]): number => {
  return input.reduce<number>((acc, value, index, arr) => {
    const prevValue = arr[index - 1];
    if (value - prevValue > 0) acc += 1;
    return acc;
  }, 0);
};

export const countDepthIncreases = (input: string) => {
  const values = parseInput(input);
  return countDepthIncreasesFromNumbers(values);
};

export const countDepthIncreasesInThreeMeasurementSlidingWindow = (input: string) => {
  const values = parseInput(input);

  const threeValueSum = values
    .map<number | undefined>((value, index, arr) => {
      const valueMinusOne = arr[index - 1];
      const valueMinusTwo = arr[index - 2];

      if (!valueMinusOne || !valueMinusTwo || !value) {
        return;
      }
      return valueMinusTwo + valueMinusOne + value;
    })
    .filter((e: number | undefined): e is number => Boolean(e));

  return countDepthIncreasesFromNumbers(threeValueSum);
};
