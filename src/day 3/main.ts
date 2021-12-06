type BitValues = '0' | '1';

type BitFrequencyHt = {
  [Key in BitValues]: number;
};

const parseInput = (input: string): string[] => input.split(/\n/);

export const parseInput = (input: string): string[] => input.split(/\n/);

const isValidBit = (bit: string): bit is BitValues => bit === '0' || bit === '1';

export const getModalBitByIndex = (parsedInput: string[], index: number): '1' | '0' | null => {
  const bitFrequencyHt = parsedInput.reduce<BitFrequencyHt>(
    (acc, curr) => {
      const currentBit = curr[index];
      if (!isValidBit(currentBit)) return acc;
      acc[currentBit] += 1;
      return acc;
    },
    { '0': 0, '1': 0 },
  );

  if (bitFrequencyHt[0] === bitFrequencyHt[1]) {
    return null;
  }

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
  const bitNumbers = parseInput(input);

  const gammaBitNumber = Array(bitNumberLength)
    .fill(null)
    .map((_, index) => {
      return getModalBitByIndex(bitNumbers, index);
    })
    .join('');

  return parseInt(gammaBitNumber, 2);
};

export const calcEpsilonRate = (input: string): number => {
  const bitNumberLength = getBitNumberLength(input);
  const bitNumbers = parseInput(input);

  const epsilonBitNumber = Array(bitNumberLength)
    .fill(null)
    .map((_, index) => {
      return getModalBitByIndex(bitNumbers, index) === '1' ? '0' : '1';
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
the biggest difference between part 1 and 2 is that the array changes after each iteration
A grande diferença entre a parte 1 e a parte 2 é que o array muda a cada iteração na parte dois. utiliza-se o array filtrado.
*/

// fazer depois
// const handleRatings = () => {}

export const getOxyGenRating = (input: string): number => {
  const bitNumberLength = getBitNumberLength(input);

  let bitNumbers = parseInput(input);
  for (
    let currentBitNumberIndex = 0;
    currentBitNumberIndex < bitNumberLength;
    currentBitNumberIndex += 1
  ) {
    const modalBitValue = getModalBitByIndex(bitNumbers, currentBitNumberIndex) ?? '1'; // this changes from first rating to second, must be a param
    const filteredBitNumbers = bitNumbers.filter((number) => {
      const currentBitValue = number[currentBitNumberIndex];
      return currentBitValue === modalBitValue;
    });

    bitNumbers = filteredBitNumbers;
    if (bitNumbers.length === 1) {
      break;
    }
  }
  return parseInt(bitNumbers[0], 2);
};
