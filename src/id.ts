export const URI = Symbol('Id');
export type URI = typeof URI;

declare module './hkt' {
  interface UriToKind<A> {
    readonly [URI]: A;
  }
}
