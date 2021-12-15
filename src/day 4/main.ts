/*
approach heavily inspired by
https://github.com/guyroyse/advent-of-code-2021/blob/main/lib/dec.04.js

I liked the class approach because it handles the mutation of the boards in a clean fashion.
The fact that the board inside the Board class is flattened is pretty neat. I definitely would not have thought of it myself. I felt like a cheated in this one, but it was enlightening.
*/

import { transpose } from './helpers';

type DrawnNumbers = number[];

export class Cell {
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

export class Board {
  // TODO: board não flatten
  // columns
  // rows
  private _flattenedCells: Cell[];
  private _rows: Cell[][];
  private _columns: Cell[][];

  constructor(boardValues: number[][]) {
    // converter os values em string
    // const cells = values.split(/\n/).map<Cell[]>((row) =>
    //   row
    //     .split(/\s/)
    //     .filter(Boolean)
    //     .map(Number)
    // TODO: Essa última linha faz as Cells. O resto vai para outra função
    //     .map((cellValue) => new Cell(cellValue)),
    // );

    const cells = boardValues.map((rows) => rows.map((cell) => new Cell(cell)));
    this._flattenedCells = cells.flat();
    this._rows = cells;
    this._columns = transpose(cells);
  }

  public mark(number: number): void {
    this._flattenedCells.find((cell) => cell.value === number)?.mark();
  }
  public get isWinner(): boolean {
    return (
      this._rows.some((row) => row.every((cell) => cell.isMarked)) ||
      this._columns.some((column) => column.every((cell) => cell.isMarked))
    );
  }

  public get unmarkedSum() {
    return this._flattenedCells.reduce((acc, cell) => {
      if (!cell.isMarked) {
        acc += cell.value;
      }
      return acc;
    }, 0);
  }
}

export class Game {
  private _boards: Board[];
  private _drawnNumbers: number[];
  constructor(input: string) {
    const { bingoBoards, drawnNumbers } = parseInput(input);
    this._boards = bingoBoards.map((board) => new Board(board));
    this._drawnNumbers = drawnNumbers;
  }
  play() {}
}

function parseInput(input: string): { drawnNumbers: DrawnNumbers; bingoBoards: number[][][] } {
  const [drawnNumbersStr, ...boards] = input.split(/\n\n/);
  const drawnNumbers = drawnNumbersStr.split(/,/).map(Number);
  const bingoBoards = parseBoards(boards);
  return {
    drawnNumbers,
    bingoBoards,
  };
}

function parseBoards(boards: string[]): number[][][] {
  return boards.map((board) => {
    return board.split(/\n/).map((row) => row.split(/\s/).filter(Boolean).map(Number));
  });
}
