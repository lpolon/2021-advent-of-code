import fs from 'fs';
import path from 'path';
import fetchInput from 'src/helper/fetchInput';
import { buildDiagram, getSumOfDangerousPoints, parseInput } from './main';

const fetchExampleInput = () =>
  fs.readFileSync(path.resolve(__dirname, './example.input.txt'), 'utf-8');

const buildXKCoordsList = () => [
  { x1: 3, y1: 1, x2: 3, y2: 5 },
  { x1: 2, y1: 2, x2: 2, y2: 1 },
];

const buildYKCoordsList = () => [
  { x1: 0, y1: 5, x2: 5, y2: 5 },
  { x1: 5, y1: 4, x2: 3, y2: 4 },
];

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

test('build x coords works', () => {
  const input = buildYKCoordsList();
  const output = buildDiagram(input);
  expect(output).toEqual([
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
  ]);
});
test('build y coords works', () => {
  const input = buildXKCoordsList();
  const output = buildDiagram(input);
  expect(output).toEqual([
    [0, 0, 0, 0],
    [0, 0, 1, 1],
    [0, 0, 1, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
  ]);
});

test('build diagram works', () => {
  const coordsList = buildCoordsList();
  const output = buildDiagram(coordsList);

  expect(output).toEqual([
    [0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 2, 1, 1],
    [1, 1, 1, 2, 1, 1],
  ]);
});

test('build diagram with exemple input', () => {
  const input = fetchExampleInput();
  const coordsList = parseInput(input);
  const diagram = buildDiagram(coordsList);

  expect(diagram).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 2, 1, 1, 1, 2, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 2, 2, 1, 1, 1, 0, 0, 0, 0],
  ]);
});
test('day 5 - 1 test input works', () => {
  const input = fetchExampleInput();
  const output = getSumOfDangerousPoints(input);
  expect(output).toMatchInlineSnapshot(`5`);
});

test('day 5 - 1 result', () => {
  const input = fetchInput(5);
  const output = getSumOfDangerousPoints(input);
  expect(output).toMatchInlineSnapshot(`7438`);
});
