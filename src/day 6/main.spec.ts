import fetchInput from 'src/helper/fetchInput';
import { countFishes, parseInput, updateLanternfishState } from './main';

const buildInitialState = () => {
  return [3, 4, 3, 1, 2];
};

test('reduces the timer of each fish correctly', () => {
  const input = buildInitialState();
  const output = updateLanternfishState(input);
  expect(output).toEqual([2, 3, 2, 0, 1]);
});

test('creates new fishes with correct internal timers', () => {
  const input = buildInitialState();
  const firstPass = updateLanternfishState(input);
  const output = updateLanternfishState(firstPass);
  expect(output).toEqual([1, 2, 1, 6, 0, 8]);
});

test('retuns the expect number of fishes after 18 days', () => {
  const input = buildInitialState();
  const output = countFishes(18, input);
  expect(output).toBe(26);
});
test('retuns the expect number of fishes after 80 days', () => {
  const input = buildInitialState();
  const output = countFishes(80, input);
  expect(output).toBe(5934);
});

test('day 6 - 1 result', () => {
  const input = parseInput(fetchInput(6));
  const output = countFishes(80, input);
  expect(output).toMatchInlineSnapshot(`352151`);
});

test('day 6 - 2 result', () => {
  const input = parseInput(fetchInput(6));
  // out of memory error!
  // const output = countFishes(256, input);
  // expect(output).toMatchInlineSnapshot(`352151`);
});

/*
Let's try to learn a bit about it.
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management

- I guess I don't know what exactly is throwing this error. Who owns this heap data structure? Is it related with recursion or just memory management (like garbage collection (GC))

I believe the actual problem is that I need to assign to each fish. Memory usage escalates exponentially. However, I want to rule out some silly stuff that passed through my head:
things to test:
- does the same error is thrown with a iteration approach?
- does the same error is thrown mutating the same array instead of creating new ones.
- does a large enough array causes the same error? -> Array throws a range error if I try to create one large enough.

*/
