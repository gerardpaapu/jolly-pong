# Jolly Pong

An object-algebra-esque approach to typescript schemas, i.e. value-level type-definition.

```typescript
import * as J from 'jolly-pong';

// Step 1. Create a schema describing your type
const schema = <T extends J.URIs>(alg: J.ISchemaAlgebra<T>) =>
  alg.object({
    foo: alg.array(alg.anyOf(alg.number(), alg.string())),
    bar: alg.literal(7),
  });

// Step 2. Derive the type with UnSchema
export type Example = J.TUnSchema<typeof schema>;

// Step 3. Derive other utilities like runtime checkers
export const isExample = schema(J.check);

export const example: Example = {
  foo: ['poop', 4],
  bar: 7,
};
```
