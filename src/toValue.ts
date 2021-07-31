/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { TIdSymbol } from './symbols';
import type { ISchemaAlgebra } from './schema';

const wizardMagic = null as any;

const toValue: ISchemaAlgebra<TIdSymbol> = {
  literal: () => wizardMagic,
  null: () => wizardMagic,
  undefined: () => wizardMagic,
  boolean: () => wizardMagic,
  string: () => wizardMagic,
  number: () => wizardMagic,
  array: () => wizardMagic,
  object: () => wizardMagic,
  anyOf: () => wizardMagic,
};

export default toValue;
