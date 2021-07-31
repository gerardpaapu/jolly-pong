import { TSchema, ISchemaAlgebra } from './schema';
import check from './check';

const run = <TArg, TReturn>(arg: TArg, f: (_: TArg) => TReturn): TReturn =>
  f(arg);

describe('Checking null', () => {
  const nullS: TSchema<null> = (s) => s.null();

  it('accepts nulls', () => {
    expect(run(check, nullS)(null)).toBe(true);
  });

  it('rejects numbers', () => {
    expect(run(check, nullS)(69)).toBe(false);
  });
});

describe('Checking undefined', () => {
  const undefinedS: TSchema<undefined> = (s) => s.undefined();

  it('accepts undefineds', () => {
    expect(run(check, undefinedS)(undefined)).toBe(true);
  });

  it('rejects numbers', () => {
    expect(run(check, undefinedS)(69)).toBe(false);
  });
});

describe('Checking boolean', () => {
  const booleanS: TSchema<boolean> = (s) => s.boolean();

  it('accepts booleans', () => {
    expect(run(check, booleanS)(true)).toBe(true);
    expect(run(check, booleanS)(false)).toBe(true);
  });

  it('rejects numbers', () => {
    expect(run(check, booleanS)(69)).toBe(false);
  });
});

describe('Checking strings', () => {
  const stringS: TSchema<string> = (s) => s.string();

  it('accepts strings', () => {
    expect(run(check, stringS)('poop')).toBe(true);
  });

  it('rejects numbers', () => {
    expect(run(check, stringS)(69)).toBe(false);
  });
});

describe('Checking numbers', () => {
  const numberS: TSchema<number> = (s) => s.number();

  it('accepts numbers', () => {
    expect(numberS(check)(69)).toBe(true);
  });

  it('rejects strings', () => {
    expect(numberS(check)('poop')).toBe(false);
  });
});

describe('Checking arrays', () => {
  const arrayS: TSchema<string[]> = (s) => s.array(s.string());

  it('accept arrays of strings', () => {
    expect(arrayS(check)([])).toBe(true);
    expect(arrayS(check)(['fart', 'butts'])).toBe(true);
  });

  it('rejects non-arrays', () => {
    expect(arrayS(check)({})).toBe(false);
    expect(arrayS(check)('')).toBe(false);
    expect(arrayS(check)(3)).toBe(false);
  });

  it('rejects arrays of non-strings', () => {
    expect(arrayS(check)([1, 2])).toBe(false);
    expect(arrayS(check)(['1', 2])).toBe(false);
  });
});

describe('checking objects', () => {
  const objectS = <S>(s: ISchemaAlgebra<S>) =>
    s.object({
      foo: s.number(),
      bar: s.string(),
    });

  it('accepts objects with the correct keys', () => {
    expect(
      objectS(check)({
        foo: 2,
        bar: '',
      })
    ).toBe(true);
  });

  it('rejects objects with missing keys', () => {
    expect(
      objectS(check)({
        foz: 2,
        bar: '',
      })
    ).toBe(false);
  });

  it('rejects values that are not objects', () => {
    expect(objectS(check)(null)).toBe(false);
    expect(objectS(check)(2)).toBe(false);
    expect(objectS(check)('null')).toBe(false);
    expect(objectS(check)(true)).toBe(false);
  });
});

describe('anyOf', () => {
  const schema: TSchema<number | string | null> = (s) =>
    s.anyOf(s.number(), s.string(), s.null());

  it('accepts any members of the union', () => {
    expect(schema(check)(420)).toBe(true);
    expect(schema(check)('blaze')).toBe(true);
    expect(schema(check)(null)).toBe(true);
  });

  it('accepts any members of the union', () => {
    expect(schema(check)(undefined)).toBe(false);
    expect(schema(check)([])).toBe(false);
    expect(schema(check)({})).toBe(false);
  });
});

describe('literal', () => {
  const schema: TSchema<4> = (s) => s.literal(4);

  it('accepts literally 4', () => {
    expect(schema(check)(4)).toBe(true);
  });

  it('rejects other values', () => {
    expect(schema(check)(5)).toBe(false);
  });
});
