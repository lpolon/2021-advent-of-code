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
  const board = [
    [98, 75, 12, 86, 96],
    [16, 89, 17, 5, 14],
    [85, 42, 64, 74, 78],
    [4, 63, 86, 50, 43],
    [31, 48, 44, 67, 66],
  ];

  const sum = board.flat().reduce((acc, cell) => acc + cell);

  return {
    board,
    sum,
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

describe('the Board class', () => {
  xit('is not a winner', () => {});
  xit('has an unmarked sum of all the cells', () => {});
  describe('when a valid cell is marked', () => {
    xit('is still not a winner', () => {});
    xit('reduces the unmarked sum by the marked cell value', () => {});
  });

  describe('when multiple valid cells are marked', () => {
    xit('is still not a winner', () => {});
    xit('reduces the unmarked sum by the sum of each marked value', () => {});
  });

  describe('when an invalid space is marked', () => {
    xit('is still not a winner', () => {});
    xit('does not reduce the unmarked sum by the cell value', () => {});
  });

  describe('when multiple invalid cells are marked', () => {
    xit('is still not a winner', () => {});
    xit('does not reduce the unmarked sum by each of invalid cells', () => {});
  });
  describe('when mixed values of valid and invalid are marked', () => {
    xit('is still not a winner', () => {});

    xit('the unmarked sum is reduced by the sum of the valid values', () => {});
  });
});
