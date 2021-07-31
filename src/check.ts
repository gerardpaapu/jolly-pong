import type { ISchemaAlgebra } from './schema';
import type { TPredicateSymbol } from './symbols';

const check: ISchemaAlgebra<TPredicateSymbol> = {
  string:
    () =>
    (x): x is string =>
      typeof x === 'string',
  number:
    () =>
    (x): x is number =>
      typeof x === 'number',

  array:
    <T>(f: (x: unknown) => x is T) =>
    (x): x is T[] =>
      Array.isArray(x) && x.every(f),

  object: <R extends Record<string, (x: unknown) => boolean>>(r: R) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    ((x: unknown) => {
      if (x == null) {
        return false;
      }

      for (const k in r) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (!r[k].call(null, (x as any)[k])) {
          return false;
        }
      }

      return true;
    }) as any,

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  anyOf: (...checkers) => ((x: unknown) => checkers.some((f) => f(x))) as any,
};

export default check;
