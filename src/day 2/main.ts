const subDirectionTup = ['forward', 'down', 'up'] as const;

type Direction = typeof subDirectionTup[number];

type Command = {
  direction: Direction;
  distance: number;
};

type SubCoordinates = {
  hDir: number;
  depth: number;
};

type SubCoordinatesWithAim = SubCoordinates & { aim: number };

const isValidDirection = (d: string): d is Direction => {
  return subDirectionTup.includes(d);
};

export const parseInput = (input: string): Command[] =>
  input
    .split(/\n/)
    .map((i) => i.split(/\s/))
    .map(([direction, distance]) => {
      if (!isValidDirection(direction)) {
        return;
      }
      return {
        direction: direction,
        distance: Number(distance),
      };
    })
    .filter((s: Command | undefined): s is Command => Boolean(s));

export const getCoordinates = (input: string): SubCoordinates => {
  return parseInput(input).reduce<SubCoordinates>(
    (acc, { direction, distance }) => {
      switch (direction) {
        case 'up':
          acc.depth -= distance;
          return acc;
        case 'down':
          acc.depth += distance;
          return acc;
        case 'forward':
          acc.hDir += distance;
          return acc;
      }
    },
    { hDir: 0, depth: 0 },
  );
};

export const getCoordinatesWithAim = (input: string): SubCoordinatesWithAim => {
  return parseInput(input).reduce<SubCoordinatesWithAim>(
    (acc, { direction, distance }) => {
      switch (direction) {
        case 'up':
          acc.aim -= distance;
          break;
        case 'down':
          acc.aim += distance;
          break;
        case 'forward':
          acc.hDir += distance;
          acc.depth += acc.aim * distance;
          break;
      }
      return acc;
    },
    { hDir: 0, depth: 0, aim: 0 },
  );
};

export const getSubCoordinatesProduct = <
  Coords extends { depth: number; hDir: number },
  CoordsFn extends (input: string) => Coords,
>(
  input: string,
  getCoordinatesFn: CoordsFn,
): number => {
  const { depth, hDir } = getCoordinatesFn(input);
  return depth * hDir;
};
