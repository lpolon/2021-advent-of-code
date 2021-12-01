import { getInput } from 'src/helper/getInput';

export const countDepthIncreases = (input: number[]) => {
  return input.reduce<number>((acc, value, index, arr) => {
    const prevValue = arr[index - 1];

    if (!prevValue) return acc;

    if (value - prevValue > 0) return acc + 1;

    return acc;
  }, 0);
};

console.log(countDepthIncreases(getInput(1)));
