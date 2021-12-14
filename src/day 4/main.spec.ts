import fs from 'fs';
import path from 'path';
import fetchInput from 'src/helper/fetchInput';
import { parseInput } from './main';

const buildExampleInput = () =>
  fs.readFileSync(path.resolve(__dirname, './example.input.txt'), 'utf-8');

test('parse Input works as expected', () => {
  const input = buildExampleInput();
  const { drawnNumbers, bingoBoards } = parseInput(input);
  expect(drawnNumbers).toEqual([
    7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26,
    1,
  ]);
  expect(bingoBoards[0][0]).toMatchInlineSnapshot(`
Array [
  Object {
    "isMarked": false,
    "value": 22,
  },
  Object {
    "isMarked": false,
    "value": 13,
  },
  Object {
    "isMarked": false,
    "value": 17,
  },
  Object {
    "isMarked": false,
    "value": 11,
  },
  Object {
    "isMarked": false,
    "value": 0,
  },
]
`);
});
xtest('parse Input works as expected 2', () => {
  // const input = buildExampleInput();
  const input = fetchInput(4);
  const output = parseInput(input);
  console.log(output);
});
