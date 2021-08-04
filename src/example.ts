import * as J from '.';

const schema = <T extends J.Kinds>(alg: J.ISchemaAlgebra<T>) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  alg.object({
    foo: alg.array(alg.anyOf(alg.number(), alg.string())),
    bar: alg.literal(7),
  });

const example = schema(J.toValue);
export type Example = typeof example;
export const isExample = schema(J.check);
