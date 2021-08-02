import * as J from '.';

const schema = <T>(alg: J.ISchemaAlgebra<T>) =>
  alg.object({
    foo: alg.array(alg.anyOf(alg.number(), alg.string())),
    bar: alg.literal(7),
  });

const example = schema(J.toValue);
export type Example = typeof example;
export const isExample = schema(J.check) as (x: unknown) => x is Example;
