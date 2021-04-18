---
title: io-ts.ts
nav_order: 7
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [BigInteger (constant)](#biginteger-constant)
- [Integer (constant)](#integer-constant)
- [Natural (constant)](#natural-constant)
- [NonZeroInteger (constant)](#nonzerointeger-constant)
- [NonZeroRational (constant)](#nonzerorational-constant)
- [PositiveRational (constant)](#positiverational-constant)
- [Rational (constant)](#rational-constant)
- [ExchangeRate (function)](#exchangerate-function)
- [getDense (function)](#getdense-function)
- [getDiscrete (function)](#getdiscrete-function)

---

# BigInteger (constant)

**Signature**

```ts
export const BigInteger = ...
```

# Integer (constant)

**Signature**

```ts
export const Integer: t.Type<I.Integer, string, t.mixed> = ...
```

# Natural (constant)

**Signature**

```ts
export const Natural: t.Type<N.Natural, string, t.mixed> = ...
```

# NonZeroInteger (constant)

**Signature**

```ts
export const NonZeroInteger: t.Type<NZI.NonZeroInteger, string, t.mixed> = ...
```

# NonZeroRational (constant)

**Signature**

```ts
export const NonZeroRational: t.Type<NZR.NonZeroRational, [string, string], t.mixed> = ...
```

# PositiveRational (constant)

**Signature**

```ts
export const PositiveRational: t.Type<PR.PositiveRational, [string, string], t.mixed> = ...
```

# Rational (constant)

**Signature**

```ts
export const Rational: t.Type<RTN.Rational, [string, string], t.mixed> = ...
```

# ExchangeRate (function)

**Signature**

```ts
export const ExchangeRate = <S, D>(): t.Type<ER.ExchangeRate<S, D>, [string, string], t.mixed> => ...
```

# getDense (function)

**Signature**

```ts
export const getDense = <D extends string>(dimension: D): t.Type<Dense<D>, [string, string], t.mixed> =>
  new t.Type(
    'Dense',
    (m): m is Dense<D> => m instanceof Dense && m.dimension === dimension,
    (m, c) =>
      pipe(
        Rational.validate(m, c),
        E.map((r) => new Dense(dimension, r))
      ),
    (a) => ...
```

# getDiscrete (function)

**Signature**

```ts
export const getDiscrete = <D extends string, U extends string>(
  dimension: D,
  unit: U
): t.Type<D.Discrete<D, U>, string, t.mixed> => ...
```
