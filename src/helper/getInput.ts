import fs from 'fs';
import path from 'path';

export const getInput = (day: number): number[] => {
  const inputString = fs.readFileSync(path.resolve(__dirname, `../../inputs/${day}.txt`), 'utf-8');
  return inputString.split('\n').map(Number);
};

export default getInput;
