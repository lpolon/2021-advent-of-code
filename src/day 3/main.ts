type BitValues = '0' | '1';

type BitFrequencyHt = {
  [Key in BitValues]: number;
};

const parseInput = (input: string): string[] => input.split(/\n/);

const isValidBit = (bit: string): bit is '0' | '1' => bit === '0' || bit === '1';

export const getModalBitByIndex = (input: string, index: number): '1' | '0' => {
  const bitFrequencyHt = parseInput(input).reduce<BitFrequencyHt>(
    (acc, curr) => {
      const currentBit = curr[index];
      if (!isValidBit(currentBit)) return acc;
      acc[currentBit] += 1;
      return acc;
    },
    { '0': 0, '1': 1 },
  );

  if (bitFrequencyHt[0] > bitFrequencyHt[1]) {
    return '0';
  }
  return '1';
};

export const getBitNumberLength = (input: string): number => {
  return parseInput(input)[0].length;
};

export const calcGammaRate = (input: string): number => {
  const bitNumberLength = getBitNumberLength(input);
  const gammaBitNumber = Array(bitNumberLength)
    .fill(null)
    .map((_, index) => {
      return getModalBitByIndex(input, index);
    })
    .join('');

  return parseInt(gammaBitNumber, 2);
};

export const calcEpsilonRate = (input: string): number => {
  const bitNumberLength = getBitNumberLength(input);
  const epsilonBitNumber = Array(bitNumberLength)
    .fill(null)
    .map((_, index) => {
      return getModalBitByIndex(input, index) === '1' ? '0' : '1';
    })
    .join('');

  return parseInt(epsilonBitNumber, 2);
};

export const calcPowerConsumption = (input: string): number => {
  const epsilonRate = calcEpsilonRate(input);
  const gammaRate = calcGammaRate(input);

  return epsilonRate * gammaRate;
};

// Day 3 - 2 -- i should split these files

/*
A grande diferença entre a parte 1 e a parte 2 é que o array muda a cada iteração na parte dois. utiliza-se o array filtrado.
*/
