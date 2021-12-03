const subDirectionTup = ['forward', 'down', 'up'] as const;
type SubDirection = typeof subDirectionTup[number];
type SubInstruction = {
  direction: SubDirection;
  distance: number;
};

const isValidDirection = (d: string): d is SubDirection => {
  return subDirectionTup.includes(d);
};

export const parseInput = (input: string): SubInstruction[] =>
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
    .filter((s: SubInstruction | undefined): s is SubInstruction => Boolean(s));
