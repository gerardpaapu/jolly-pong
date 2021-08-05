/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { URIs, TApp } from './hkt';
import * as Id from './id';

export interface ISchemaAlgebra<S extends URIs> {
  null(): TApp<S, null>;
  undefined(): TApp<S, undefined>;
  boolean(): TApp<S, boolean>;
  string(): TApp<S, string>;
  number(): TApp<S, number>;
  literal<T extends string | number | true | false>(v: T): TApp<S, T>;
  array<TArg>(t: TApp<S, TArg>): TApp<S, TArg[]>;
  object<R extends Record<string, TApp<S, any>>>(
    record: R
  ): TApp<S, TRecordSchema<S, R>>;
  anyOf<T extends TApp<S, any>[]>(...args: T): TApp<S, TAnySchema<S, T>>;
}

type TRecordSchema<S extends URIs, R extends Record<string, TApp<S, any>>> = {
  [K in keyof R]: R[K] extends TApp<S, infer U> ? U : never;
};

type TAnySchema<S extends URIs, T extends TApp<S, any>[]> = {
  0: never;
  1: T extends [infer Head, ...infer Tail]
    ? Head extends TApp<S, infer U>
      ? Tail extends TApp<S, any>[]
        ? U | TAnySchema<S, Tail>
        : never
      : never
    : never;
}[T extends [any, ...any[]] ? 1 : 0];

export type TSchema<T> = <S extends URIs>(alg: ISchemaAlgebra<S>) => TApp<S, T>;

export type TUnSchema<TF> = TF extends (
  alg: ISchemaAlgebra<Id.URI>
) => TApp<Id.URI, infer U>
  ? U
  : false;
