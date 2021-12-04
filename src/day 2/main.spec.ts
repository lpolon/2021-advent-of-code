import fetchInput from 'src/helper/fetchInput';
import {
  getCoordinates,
  getCoordinatesWithAim,
  getSubCoordinatesProduct,
  parseInput,
} from './main';

const buildInputExample = () => 'forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2';

test('day 2 parse input should work as expected', () => {
  const input = buildInputExample();
  const output = parseInput(input);
  expect(output).toMatchInlineSnapshot(`
Array [
  Object {
    "direction": "forward",
    "distance": 5,
  },
  Object {
    "direction": "down",
    "distance": 5,
  },
  Object {
    "direction": "forward",
    "distance": 8,
  },
  Object {
    "direction": "up",
    "distance": 3,
  },
  Object {
    "direction": "down",
    "distance": 8,
  },
  Object {
    "direction": "forward",
    "distance": 2,
  },
]
`);
});

test('day 2-1 example input', () => {
  const input = buildInputExample();
  const output = getSubCoordinatesProduct(input, getCoordinates);
  expect(output).toEqual((5 + 8 + 2) * (5 - 3 + 8));
});

test('day 2-1 input result', () => {
  const input = fetchInput(2);
  const output = getSubCoordinatesProduct(input, getCoordinates);

  expect(output).toMatchInlineSnapshot(`1459206`);
});

test('day 2-2 example input', () => {
  const input = buildInputExample();
  const output = getSubCoordinatesProduct(input, getCoordinatesWithAim);

  expect(output).toEqual(900);
});

test('day 2-1 input result', () => {
  const input = fetchInput(2);
  const output = getSubCoordinatesProduct(input, getCoordinatesWithAim);

  expect(output).toMatchInlineSnapshot(`1320534480`);
});
