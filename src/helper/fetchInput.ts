import fs from 'fs';
import path from 'path';

export const fetchInput = (day: number) => {
  return fs.readFileSync(path.resolve(__dirname, `../../inputs/${day}.txt`), 'utf-8');
};

export default fetchInput;
