type Coords = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};
/*
Ajustes: iterar uma vez para pegar o maior valor de x e o maior de y.
construir um array de tamanho x + 1;
construir um array de x de tamanho y + 1;
limpar lógica validando antes.
Usar reduce & DI para as diferenças entre cenários.
*/

export const parseInput = (input: string): Coords[] => {
  const coords: Coords[] = [];

  for (const coordSet of input.split(/\n/)) {
    const matchResult = coordSet.match(/(^.),(.)\s->\s(.),(.)/);
    if (!matchResult) {
      continue;
    }
    const [, x1, y1, x2, y2] = matchResult.map(Number);
    coords.push({ x1, y1, x2, y2 });
  }
  return coords;
};

export const buildDiagram = (coordsList: Coords[]): number[][] => {
  const diagram: number[][] = [];

  coordsList.forEach(({ x1, x2, y1, y2 }) => {
    if (x1 === x2) {
      const xIndex = x1;
      const yDelta = y2 - y1;
      if (yDelta > 0) {
        const yInitial = y1;
        for (let i = 0; i <= yDelta; i += 1) {
          if (diagram[yInitial + i] === undefined) {
            diagram[yInitial + i] = [];
          }
          const currentCoord = diagram[yInitial + i][xIndex];
          if (currentCoord === undefined) {
            diagram[yInitial + i][xIndex] = 0;
          } else {
            diagram[yInitial + i][xIndex] += 1;
          }
        }
      } else {
        const yInitial = y2;
        for (let i = Math.abs(yDelta); i >= 0; i -= 1) {
          if (diagram[yInitial - i] === undefined) {
            diagram[yInitial - i] = [];
          }
          const currentCoord = diagram[yInitial - i][xIndex];
          if (currentCoord === undefined) {
            diagram[yInitial - i][xIndex] = 0;
          } else {
            diagram[yInitial - i][xIndex] += 1;
          }
        }
      }
    } else {
      const yIndex = y1;
      const xDelta = x2 - x1;
      if (xDelta > 0) {
        const xInitial = x1;
        for (let i = 0; i <= xDelta; i += 1) {
          if (diagram[yIndex] === undefined) {
            diagram[yIndex] = [];
          }
          const currentCoord = diagram[yIndex][xInitial + 1];
          if (currentCoord === undefined) {
            diagram[yIndex][xInitial + 1] = 0;
          } else {
            diagram[yIndex][xInitial + 1] += 1;
          }
        }
      } else {
        const xInitial = x2;
        for (let i = Math.abs(xDelta); i >= 0; i -= 1) {
          if (diagram[yIndex] === undefined) {
            diagram[yIndex] = [];
          }
          const currentCoord = diagram[yIndex][xInitial - 1];
          if (currentCoord === undefined) {
            diagram[yIndex][xInitial - 1] = 0;
          } else {
            diagram[yIndex][xInitial - 1] += 1;
          }
        }
      }
    }
  });
  console.log('antes', diagram);
  diagram.forEach((row, i) => {
    row.forEach((value, j) => {
      console.log('qual foi', value);
      if (diagram[i][j] === undefined) {
        diagram[i][j] = 0;
      }
    });
  });
  console.log('depois', diagram);
  return diagram;
};
