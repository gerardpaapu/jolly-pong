import * as J from '.';

const schema = <T extends J.URIs>(alg: J.ISchemaAlgebra<T>) =>
  alg.object({
    foo: alg.array(alg.anyOf(alg.number(), alg.string())),
    bar: alg.literal(7),
  });

export type Example = J.TUnSchema<typeof schema>;
export const isExample = schema(J.check);

export const example: Example = {
  foo: ['poop', 4],
  bar: 7,
};
