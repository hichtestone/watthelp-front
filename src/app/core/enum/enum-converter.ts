export function enumToArray<T>(p: T): ReadonlyArray<T[keyof T]> {
  const values = Object.values(p);
  return values.some(x => typeof x === 'string')
    ? values.filter(x => typeof x === 'string')
    : values;
}
