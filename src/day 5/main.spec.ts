import fs from 'fs';
import path from 'path';
import { buildDiagram, parseInput } from './main';

const fetchExampleInput = () =>
  fs.readFileSync(path.resolve(__dirname, './example.input.txt'), 'utf-8');

/*

*/

const buildCoordsList = () => [
  { x1: 0, y1: 5, x2: 5, y2: 5 },
  { x1: 3, y1: 1, x2: 3, y2: 5 },
  { x1: 5, y1: 4, x2: 3, y2: 4 },
  { x1: 2, y1: 2, x2: 2, y2: 1 },
];

test('parse input works', () => {
  const input = fetchExampleInput();
  const output = parseInput(input);
  expect(output).toMatchSnapshot();
});

test('build diagram', () => {
  const coordsList = buildCoordsList();
  const output = buildDiagram(coordsList);
  /*
  - x ou y é constante.
  - encontre o constante e acesse a linha ou coluna.
  - itera sobre a diferença dos dois.. como?
    - se for negativo. itera do maior pro menor
    - se for positivo. do menor pro maior.
  */
  expect(output).toMatchInlineSnapshot(`
[
  [
    ,
    ,
    0,
  ],
  [
    ,
    ,
    0,
    0,
  ],
  [
    ,
    ,
    ,
    0,
  ],
  [
    ,
    ,
    ,
    0,
  ],
  [
    ,
    ,
    2,
    0,
  ],
  [
    ,
    5,
    ,
    0,
  ],
]
`);
  // expect(output).toEqual([
  //   [0, 0, 0, 0, 0, 0],
  //   [0, 0, 1, 1, 0, 0],
  //   [0, 0, 1, 1, 0, 0],
  //   [0, 0, 0, 1, 0, 0],
  //   [0, 0, 0, 2, 1, 1],
  //   [1, 1, 1, 2, 1, 1],
  // ]);
});
