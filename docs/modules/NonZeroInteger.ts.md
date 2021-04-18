---
title: NonZeroInteger.ts
nav_order: 9
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [NonZeroInteger (interface)](#nonzerointeger-interface)
- [Eq (constant)](#eq-constant)
- [Ord (constant)](#ord-constant)
- [add (constant)](#add-constant)
- [div (constant)](#div-constant)
- [isPositive (constant)](#ispositive-constant)
- [mul (constant)](#mul-constant)
- [negate (constant)](#negate-constant)
- [one (constant)](#one-constant)
- [show (constant)](#show-constant)
- [sign (constant)](#sign-constant)
- [unwrap (constant)](#unwrap-constant)
- [abs (function)](#abs-function)
- [fromInteger (function)](#frominteger-function)
- [gcd (function)](#gcd-function)
- [lcm (function)](#lcm-function)
- [sub (function)](#sub-function)
- [wrap (function)](#wrap-function)

---

# NonZeroInteger (interface)

A NonZeroInteger is also an Integer

**Signature**

```ts
export interface NonZeroInteger
  extends Newtype<
    {
      Integer: true
      NonZero: true
    },
    BigInteger
  > {}
```

# Eq (constant)

**Signature**

```ts
export const Eq: EQ.Eq<NonZeroInteger> = ...
```

# Ord (constant)

**Signature**

```ts
export const Ord: ORD.Ord<NonZeroInteger> = ...
```

# add (constant)

**Signature**

```ts
export const add: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = ...
```

# div (constant)

**Signature**

```ts
export const div: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = ...
```

# isPositive (constant)

**Signature**

```ts
export const isPositive: (x: NonZeroInteger) => boolean = ...
```

# mul (constant)

**Signature**

```ts
export const mul: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = ...
```

# negate (constant)

**Signature**

```ts
export const negate: (x: NonZeroInteger) => NonZeroInteger = ...
```

# one (constant)

**Signature**

```ts
export const one: NonZeroInteger = ...
```

# show (constant)

**Signature**

```ts
export const show: (x: NonZeroInteger) => string = ...
```

# sign (constant)

**Signature**

```ts
export const sign: (x: NonZeroInteger) => -1 | 1 = ...
```

# unwrap (constant)

**Signature**

```ts
export const unwrap: (x: NonZeroInteger) => BigInteger = ...
```

# abs (function)

**Signature**

```ts
export function abs(x: NonZeroInteger): Natural { ... }
```

# fromInteger (function)

**Signature**

```ts
export function fromInteger(i: I.Integer): Option<NonZeroInteger> { ... }
```

# gcd (function)

**Signature**

```ts
export function gcd(x: I.Integer, y: NonZeroInteger): Natural { ... }
```

# lcm (function)

**Signature**

```ts
export function lcm(x: NonZeroInteger, y: NonZeroInteger): Natural { ... }
```

# sub (function)

**Signature**

```ts
export function sub(x: NonZeroInteger, y: NonZeroInteger): Option<NonZeroInteger> { ... }
```

# wrap (function)

**Signature**

```ts
export function wrap(x: BigInteger): Option<NonZeroInteger> { ... }
```
