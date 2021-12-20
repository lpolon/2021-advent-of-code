type Coords = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

export const parseInput = (input: string): Coords[] => {
  const coords: Coords[] = [];

  for (const coordSet of input.split(/\n/)) {
    const matchResult = coordSet.match(/(^.+),(.+)\s->\s(.+),(.+)/);
    if (!matchResult) {
      continue;
    }
    const [, x1, y1, x2, y2] = matchResult.map(Number);
    coords.push({ x1, y1, x2, y2 });
  }
  return coords;
};

type MaxCoordsValues = { xMax: number; yMax: number };

const getMaxCoordsValues = (coordsList: Coords[]): MaxCoordsValues => {
  return coordsList.reduce<MaxCoordsValues>(
    (acc, curr) => {
      const currentMaxX = Math.max(curr.x1, curr.x2);
      if (currentMaxX > acc.xMax) acc.xMax = currentMaxX;
      const currentMaxY = Math.max(curr.y1, curr.y2);
      if (currentMaxY > acc.yMax) acc.yMax = currentMaxY;
      return acc;
    },
    { xMax: 0, yMax: 0 },
  );
};

export const buildDefaultDiagram = (coordsList: Coords[]): number[][] => {
  const { xMax, yMax } = getMaxCoordsValues(coordsList);
  const xArr = Array<number>(xMax + 1).fill(0);
  return [...Array(yMax + 1)].map(() => [...xArr]);
};

export const buildDiagram = (coordsList: Coords[]): number[][] => {
  const diagram = buildDefaultDiagram(coordsList);
  coordsList.forEach(({ x1, x2, y1, y2 }) => {
    const isXConstant = x1 === x2;
    const isYConstant = y1 === y2;

    const xDelta = x1 - x2;
    const yDelta = y1 - y2;
    if (isXConstant) {
      for (let i = 0; i <= Math.abs(yDelta); i += 1) {
        const y = yDelta < 0 ? y1 + i : y1 - i;
        diagram[y][x1] += 1;
      }
    } else if (isYConstant) {
      for (let i = 0; i <= Math.abs(xDelta); i += 1) {
        const x = xDelta < 0 ? x1 + i : x1 - i;
        diagram[y1][x] += 1;
      }
    }
  });
  return diagram;
};

export const getSumOfDangerousPoints = (input: string): number => {
  const coordsList = parseInput(input);
  const diagram = buildDiagram(coordsList);
  return diagram.flat().reduce<number>((acc, curr) => {
    if (curr > 1) acc += 1;
    return acc;
  }, 0);
};

export const buildDiagramWithDiagonals = (coordsList: Coords[]): number[][] => {
  const diagram = buildDefaultDiagram(coordsList);
  coordsList.forEach(({ x1, x2, y1, y2 }) => {
    const isXConstant = x1 === x2;
    const isYConstant = y1 === y2;
    const xDelta = x1 - x2;
    const yDelta = y1 - y2;
    if (isXConstant) {
      for (let i = 0; i <= Math.abs(yDelta); i += 1) {
        const y = yDelta < 0 ? y1 + i : y1 - i;
        diagram[y][x1] += 1;
      }
    } else if (isYConstant) {
      for (let i = 0; i <= Math.abs(xDelta); i += 1) {
        const x = xDelta < 0 ? x1 + i : x1 - i;
        diagram[y1][x] += 1;
      }
    } else if (!isXConstant && !isYConstant) {
      for (let i = 0; i <= Math.abs(xDelta); i += 1) {
        const x = xDelta < 0 ? x1 + i : x1 - i;
        const y = yDelta < 0 ? y1 + i : y1 - i;
        diagram[y][x] += 1;
      }
    }
  });
  return diagram;
};

export const getSumOfDangerousPointsWithDiagonals = (input: string): number => {
  const coordsList = parseInput(input);
  const diagram = buildDiagramWithDiagonals(coordsList);
  return diagram.flat().reduce<number>((acc, curr) => {
    if (curr > 1) acc += 1;
    return acc;
  }, 0);
};
