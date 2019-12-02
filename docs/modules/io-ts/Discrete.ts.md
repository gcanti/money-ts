---
title: io-ts/Discrete.ts
nav_order: 9
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [getDiscrete (function)](#getdiscrete-function)

---

# getDiscrete (function)

**Signature**

```ts
export const getDiscrete = <D extends string, U extends string>(
  dimension: D,
  unit: U
): Type<Discrete<D, U>, string, unknown> => ...
```

Added in v0.1.2
