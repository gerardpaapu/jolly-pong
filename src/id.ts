export const URI = Symbol('Id');
export type URI = typeof URI;

declare module './schema' {
  interface HKT<A> {
    readonly [URI]: A;
  }
}
