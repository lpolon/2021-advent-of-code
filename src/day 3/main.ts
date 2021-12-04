type BitFrequencyMap = {
  '0': number;
  '1': number;
};

const parseInput = (input: string): string[] => input.split(/\n/);

export const buildBitFrequencyPerPosition = (input: string): BitFrequencyMap[] => {
  return parseInput(input).reduce<BitFrequencyMap[]>((acc, curr) => {
    [...curr]
      .filter((bit): bit is '0' | '1' => bit === '0' || bit === '1')
      .forEach((bit, i) => {
        if (!acc[i]) {
          acc[i] = {
            0: 0,
            1: 0,
          };
        }
        acc[i][bit] += 1;
      });
    return acc;
  }, []);
};

export const calcGammaRate = (input: string): number => {
  const gammaBitNumber = buildBitFrequencyPerPosition(input).reduce<string>((acc, curr) => {
    if (curr[0] > curr[1]) {
      acc += '0';
      return acc;
    }
    acc += '1';
    return acc;
  }, '');
  return parseInt(gammaBitNumber, 2);
};

export const calcEpsilonRate = (input: string): number => {
  const gammaBitNumber = buildBitFrequencyPerPosition(input).reduce<string>((acc, curr) => {
    if (curr[0] < curr[1]) {
      acc += '0';
      return acc;
    }
    acc += '1';
    return acc;
  }, '');
  return parseInt(gammaBitNumber, 2);
};

export const calcPowerConsumption = (input: string): number => {
  const epsilonRate = calcEpsilonRate(input);
  const gammaRate = calcGammaRate(input);

  return epsilonRate * gammaRate;
};

// Day 3 - 2 -- i should split these files

const getO2GenRating = () => {};
