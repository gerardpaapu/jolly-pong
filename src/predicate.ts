export const URI = Symbol('Predicate');
export type URI = typeof URI;

declare module './schema' {
  interface HKT<A> {
    [URI]: (x: unknown) => x is A;
  }
}
