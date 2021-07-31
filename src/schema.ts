import type { TPredicateSymbol, TIdSymbol } from './symbols';

export type TApply<TSymbol, T> = TSymbol extends TPredicateSymbol
  ? (x: unknown) => x is T
  : TSymbol extends TIdSymbol
  ? T
  : never;

export interface ISchemaAlgebra<S> {
  null(): TApply<S, null>;
  undefined(): TApply<S, undefined>;
  boolean(): TApply<S, boolean>;
  string(): TApply<S, string>;
  number(): TApply<S, number>;
  literal<T extends string | number | true | false>(v: T): TApply<S, T>;
  array<TArg>(t: TApply<S, TArg>): TApply<S, TArg[]>;
  object<R extends Record<string, TApply<S, any>>>(
    record: R
  ): TApply<S, TRecordSchema<S, R>>;
  anyOf<T extends TApply<S, any>[]>(...args: T): TApply<S, TAnySchema<S, T>>;
}

type TRecordSchema<S, R extends Record<string, TApply<S, any>>> = {
  [K in keyof R]: R[K] extends TApply<S, infer U> ? U : never;
};

type TAnySchema<S, T extends TApply<S, any>[]> = {
  0: never;
  1: T extends [infer Head, ...infer Tail]
    ? Head extends TApply<S, infer U>
      ? Tail extends TApply<S, any>[]
        ? U | TAnySchema<S, Tail>
        : never
      : never
    : never;
}[T extends [any, ...any[]] ? 1 : 0];

export type TSchema<T> = <S>(alg: ISchemaAlgebra<S>) => TApply<S, T>;

export type TUnSchema<TF> = TF extends (
  alg: ISchemaAlgebra<TPredicateSymbol>
) => TApply<TPredicateSymbol, infer U>
  ? U
  : false;
