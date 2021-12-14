type DrawnNumbers = number[];

type BingoBoard = Cell[][];

type Cell = {
  value: number;
  isMarked: boolean;
};
const parseBoards = (boards: string[]): BingoBoard[] => {
  return boards.map<BingoBoard>((board) => {
    return board.split(/\n/).map<Cell[]>((row) =>
      row
        .split(/\s/)
        .filter(Boolean)
        .map((cellValue) => ({ value: Number(cellValue), isMarked: false })),
    );
  });
};

export const parseInput = (
  input: string,
): { drawnNumbers: DrawnNumbers; bingoBoards: BingoBoard[] } => {
  const [drawnNumbersStr, ...boards] = input.split(/\n\n/);
  const drawnNumbers = drawnNumbersStr.split(/,/).map(Number);
  const bingoBoards = parseBoards(boards);
  return {
    drawnNumbers,
    bingoBoards,
  };
};
