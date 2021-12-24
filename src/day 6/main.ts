export const parseInput = (input: string): number[] => {
  return input.split(',').map(Number);
};

export const updateLanternfishState = (fishes: number[]): number[] => {
  const newFishes: number[] = [];
  const updatedFishes = fishes.map((fish) => {
    if (fish === 0) {
      newFishes.push(8);
      return 6;
    }
    return fish - 1;
  });
  return [...updatedFishes, ...newFishes];
};

export const countFishes = (days: number, fishes: number[]): number => {
  if (days === 0) return fishes.length;
  const updatedFishes = updateLanternfishState(fishes);
  return countFishes(days - 1, updatedFishes);
};
