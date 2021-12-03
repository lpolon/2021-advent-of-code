import { parseInput } from './main';

it('day 2 parse input should work as expected', () => {
  const output = parseInput('forward 8\ndown 9\nup 4\ndown 8\ndown 3');
  expect(output).toMatchInlineSnapshot(`
Array [
  Object {
    "direction": "forward",
    "distance": 8,
  },
  Object {
    "direction": "down",
    "distance": 9,
  },
  Object {
    "direction": "up",
    "distance": 4,
  },
  Object {
    "direction": "down",
    "distance": 8,
  },
  Object {
    "direction": "down",
    "distance": 3,
  },
]
`);
});
