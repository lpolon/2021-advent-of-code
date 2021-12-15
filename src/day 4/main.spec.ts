import fs from 'fs';
import path from 'path';
import fetchInput from 'src/helper/fetchInput';
import { Cell, Board } from './main';
/*
I fell that I am not really thinking much by myself anymore for this one. I guess I will kinda copy how Guy did TDD in this one to get more familiar.
*/

const buildExampleBoardInput = () => {
  const ROOLS = [
    7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26,
    1,
  ];

  const BOARDS = [
    [
      [22, 13, 17, 11, 0],
      [8, 2, 23, 4, 24],
      [21, 9, 14, 16, 7],
      [6, 10, , 3, 18, 5],
      [1, 12, 20, 15, 19],
    ],
    [
      [3, 15, 0, 2, 22],
      [9, 18, 13, 17, 5],
      [19, 8, 7, 25, 23],
      [20, 11, 10, 24, 4],
      [14, 21, 16, 12, 6],
    ],
    [
      [14, 21, 17, 24, 4],
      [10, 16, 15, 9, 19],
      [18, 8, 23, 26, 20],
      [22, 11, 13, 6, 5],
      [2, 0, 12, 3, 7],
    ],
  ];
  return {
    ROOLS,
    BOARDS,
  };
};

const buildBoard = () => {
  const testBoard = [
    [98, 75, 12, 86, 96],
    [16, 89, 17, 5, 14],
    [85, 42, 64, 74, 78],
    [4, 63, 86, 50, 43],
    [31, 48, 44, 67, 66],
  ];

  const testBoardSum = testBoard.flat().reduce((acc, cell) => acc + cell, 0);

  return {
    testBoard,
    testBoardSum,
  };
};

describe('the Cell class', () => {
  let cell: Cell;
  beforeEach(() => {
    cell = new Cell(666);
  });
  it('has a number', () => {
    expect(cell.value).toEqual(666);
  });

  it('is instanciated with marked as false', () => {
    expect(cell.isMarked).toEqual(false);
  });
  it('can be marked as true', () => {
    cell.mark();
    expect(cell.isMarked).toEqual(true);
  });
});

describe('board', () => {
  let board: Board;
  beforeEach(() => {
    const { testBoard } = buildBoard();
    board = new Board(testBoard);
  });
  it('is not a winner', () => {
    expect(board.isWinner).toBe(false);
  });
  it('has an unmarked sum of all the cells', () => {
    const { testBoardSum } = buildBoard();
    expect(board.unmarkedSum).toBe(testBoardSum);
  });
  describe('when a valid cell is marked', () => {
    const { testBoard, testBoardSum } = buildBoard();
    const validValue = testBoard[0][0];
    beforeEach(() => {
      board.mark(validValue);
    });

    it('is still not a winner', () => {
      expect(board.isWinner).toBe(false);
    });
    it('reduces the unmarked sum by the marked cell value', () => {
      expect(board.unmarkedSum).toBe(testBoardSum - validValue);
    });
  });

  describe('when multiple valid cells are marked', () => {
    const { testBoard, testBoardSum } = buildBoard();
    const validValues = testBoard[0].slice(0, 3);
    beforeEach(() => {
      validValues.forEach((value) => {
        board.mark(value);
      });
    });

    it('is still not a winner', () => {
      expect(board.isWinner).toBe(false);
    });
    it('reduces the unmarked sum by the sum of each marked value', () => {
      const validValuesSum = validValues.reduce((acc, e) => acc + e);
      expect(board.unmarkedSum).toBe(testBoardSum - validValuesSum);
    });
  });

  describe('when an invalid space is marked', () => {
    const { testBoardSum } = buildBoard();
    beforeEach(() => {
      const invalidValue = 103;
      board.mark(invalidValue);
    });
    it('is still not a winner', () => {
      expect(board.isWinner).toBe(false);
    });
    it('does not reduce the unmarked sum by the cell value', () => {
      expect(board.unmarkedSum).toBe(testBoardSum);
    });
  });

  describe('when multiple invalid cells are marked', () => {
    const { testBoardSum } = buildBoard();

    beforeEach(() => {
      const invalidValues = [103, 102, 1];
      invalidValues.forEach((value) => {
        board.mark(value);
      });
    });
    it('is still not a winner', () => {
      expect(board.isWinner).toBe(false);
    });
    it('does not reduce the unmarked sum by each of invalid cells', () => {
      expect(board.unmarkedSum).toBe(testBoardSum);
    });
  });
  describe('when mixed values of valid and invalid are marked', () => {
    const { testBoard, testBoardSum } = buildBoard();
    const validValues = testBoard[0].slice(0, 3);
    const invalidValues = [103, 102, 1];
    const values = [...validValues, ...invalidValues];
    beforeEach(() => {
      values.forEach((value) => {
        board.mark(value);
      });
    });

    it('is still not a winner', () => {
      expect(board.isWinner).toBe(false);
    });

    it('the unmarked sum is reduced by the sum of the valid values', () => {
      const validValuesSum = validValues.reduce((acc, e) => acc + e);
      expect(board.unmarkedSum).toBe(testBoardSum - validValuesSum);
    });
  });

  describe.each([
    { row: [98, 75, 12, 86, 96] },
    { row: [16, 89, 17, 5, 14] },
    { row: buildBoard().testBoard[2] },
  ])('when a entire row is selected', ({ row }) => {
    beforeEach(() => {
      row.forEach((cell) => {
        board.mark(cell);
      });
    });
    it('is a winner', () => {
      expect(board.isWinner).toBe(true);
    });
  });

  describe.each([
    { column: [98, 16, 85, 4, 31] },
    { column: [75, 89, 42, 63, 48] },
    { column: [86, 5, 74, 50, 67] },
  ])('when a entire column is selected', ({ column }) => {
    beforeEach(() => {
      column.forEach((cell) => {
        board.mark(cell);
      });
    });
    it('is a winner', () => {
      expect(board.isWinner).toBe(true);
    });
  });
});
