/*
approach heavily inspired by
https://github.com/guyroyse/advent-of-code-2021/blob/main/lib/dec.04.js

I liked the class approach because it handles the mutation of the boards in a clean fashion.
The fact that the board inside the Board class is flattened is pretty neat. I definitely would not have thought of it myself. I felt like a cheated in this one, but it was enlightening.
*/

type DrawnNumbers = number[];

type BingoBoard = Cell[][];

class Cell {
  private _value: number;
  private _isMarked: boolean;

  constructor(number: number) {
    this._value = number;
    this._isMarked = false;
  }

  get value() {
    return this._value;
  }

  get isMarked() {
    return this._isMarked;
  }

  mark() {
    this._isMarked = true;
  }
}

class Board {
  // TODO: board não flatten
  // columns
  // rows
  _flattenedCells: Cell[];
  constructor(values: string) {
    this._flattenedCells = values
      .split(/\n/)
      .map<Cell[]>((row) =>
        row
          .split(/\s/)
          .filter(Boolean)
          .map(Number)
          .map((cellValue) => new Cell(cellValue)),
      )
      .flat();
  }

  mark(number: number): void {
    this._flattenedCells.find((cell) => cell.value === number)?.mark();
  }
}

const parseBoards = (boards: string[]): Board[] => {
  return boards.map((board) => new Board(board));
};

export const parseInput = (input: string): { drawnNumbers: DrawnNumbers; bingoBoards: Board[] } => {
  const [drawnNumbersStr, ...boards] = input.split(/\n\n/);
  const drawnNumbers = drawnNumbersStr.split(/,/).map(Number);
  const bingoBoards = parseBoards(boards);
  return {
    drawnNumbers,
    bingoBoards,
  };
};

const updateBoards = (number: number, boards: Board[]): void => {};
