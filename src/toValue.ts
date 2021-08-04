/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { ISchemaAlgebra } from './schema';
import type * as Id from './id';

const wizardMagic = null as any;

const toValue: ISchemaAlgebra<Id.URI> = {
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
