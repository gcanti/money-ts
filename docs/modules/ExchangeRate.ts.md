---
title: ExchangeRate.ts
nav_order: 4
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ExchangeRate (interface)](#exchangerate-interface)
- [unwrap (constant)](#unwrap-constant)
- [wrap (constant)](#wrap-constant)
- [compose (function)](#compose-function)
- [exchange (function)](#exchange-function)
- [getOrd (function)](#getord-function)

---

# ExchangeRate (interface)

**Signature**

```ts
export interface ExchangeRate<S, D> extends Newtype<['ExchangeRate', S, D], PositiveRational> {}
```

Added in v0.1.2

# unwrap (constant)

**Signature**

```ts
export const unwrap: <S, D>(er: ExchangeRate<S, D>) => PositiveRational = ...
```

Added in v0.1.2

# wrap (constant)

**Signature**

```ts
export const wrap: <S, D>(r: PositiveRational) => ExchangeRate<S, D> = ...
```

Added in v0.1.2

# compose (function)

**Signature**

```ts
export function compose<A, B, C>(bc: ExchangeRate<B, C>, ab: ExchangeRate<A, B>): ExchangeRate<A, C> { ... }
```

Added in v0.1.2

# exchange (function)

**Signature**

```ts
export const exchange = <S extends string, D extends string>(er: ExchangeRate<S, D>) => (d: Dense<S>): Dense<D> => ...
```

Added in v0.1.2

# getOrd (function)

**Signature**

```ts
export const getOrd = <S, D>(): Ord<ExchangeRate<S, D>> => ...
```

Added in v0.1.2
