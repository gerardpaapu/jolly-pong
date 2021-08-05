export const URI = Symbol('Predicate');
export type URI = typeof URI;

declare module './hkt' {
  interface UriToKind<A> {
    readonly [URI]: (x: unknown) => x is A;
  }
}
