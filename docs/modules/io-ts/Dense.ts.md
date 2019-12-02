---
title: io-ts/Dense.ts
nav_order: 8
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [getDense (function)](#getdense-function)

---

# getDense (function)

**Signature**

```ts
export const getDense = <D extends string>(dimension: D): Type<Dense<D>, [string, string], unknown> =>
  new Type(
    'Dense',
    (m): m is Dense<D> => m instanceof Dense && m.dimension === dimension,
    (m, c) =>
      pipe(
        Rational.validate(m, c),
        E.map(r => new Dense(dimension, r))
      ),
    a => ...
```

Added in v0.1.2
