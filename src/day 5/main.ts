type Coords = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

export const parseInput = (input: string): Coords[] => {
  const coords: Coords[] = [];

  for (const coordSet of input.split(/\n/)) {
    const matchResult = coordSet.match(/(^.),(.)\s->\s(.),(.)/);
    if (!matchResult) {
      continue;
    }
    const [,x1, y1, x2, y2] = matchResult.map(Number);
    coords.push({ x1, y1, x2, y2 });
  }
  return coords;
};
