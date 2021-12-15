export function transpose<Type>(matrix: Type[][]): Type[][] {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}
