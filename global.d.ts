declare global {
  interface ReadonlyArray<T> {
    includes(searchElement: number | boolean | string, fromIndex?: number): boolean;
  }

  interface Array<T> {
    includes(searchElement: number | boolean | string, fromIndex?: number): boolean;
  }
}

export {};
