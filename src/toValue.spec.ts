import { ISchemaAlgebra } from './schema';
import toValue from './toValue';

type T = {
  foo: number;
  bar: string[];
  baz: { quux: null } | undefined | boolean;
  random: 4;
};

describe('toValue', () => {
  it('produces a value of the type', () => {
    const schema = <S>(s: ISchemaAlgebra<S>) =>
      s.object({
        foo: s.number(),
        bar: s.array(s.string()),
        baz: s.anyOf(s.undefined(), s.object({ quux: s.null() }), s.boolean()),
        random: s.literal(4),
      });

    const witness: T = schema(toValue);
    expect(witness).toBe(null);
  });
});
