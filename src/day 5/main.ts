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

const setYCoord = (
  diagram: number[][],
  { xIndex, y1, y2 }: { xIndex: number; y1: number; y2: number },
): void => {
  const yDelta = y2 - y1;
  if (yDelta > 0) {
    const yInitial = y1;
    for (let i = 0; i <= yDelta; i += 1) {
      diagram[yInitial + i][xIndex] += 1;
    }
  } else {
    const yInitial = y2;
    for (let i = Math.abs(yDelta); i >= 0; i -= 1) {
      diagram[yInitial + i][xIndex] += 1;
    }
  }
};

const setXCoord = (
  diagram: number[][],
  { yIndex, x1, x2 }: { yIndex: number; x1: number; x2: number },
): void => {
  const xDelta = x2 - x1;
  if (xDelta > 0) {
    const xInitial = x1;
    for (let i = 0; i <= xDelta; i += 1) {
      diagram[yIndex][xInitial + i] += 1;
    }
  } else {
    const xInitial = x2;
    for (let i = Math.abs(xDelta); i >= 0; i -= 1) {
      diagram[yIndex][xInitial + i] += 1;
    }
  }
};

export const buildDiagram = (coordsList: Coords[]): number[][] => {
  // TODO: alguma merda aqui
  const diagram = buildDefaultDiagram(coordsList);
  console.log('oioioioioi', diagram);
  coordsList.forEach(({ x1, x2, y1, y2 }) => {
    if (x1 === x2) {
      setYCoord(diagram, { xIndex: x1, y1, y2 });
    } else {
      setXCoord(diagram, { yIndex: y1, x1, x2 });
    }
  });
  return diagram;
};

export const getSumOfDangerousPoints = (input: string): number => {
  const coordsList = parseInput(input);
  const diagram = buildDiagram(coordsList);
  console.log(diagram);
  return diagram.flat().reduce<number>((acc, curr) => {
    if (curr > 1) acc += 1;
    return acc;
  }, 0);
};
