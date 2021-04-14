---
title: Natural.ts
nav_order: 17
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Natural (interface)](#natural-interface)
- [add (constant)](#add-constant)
- [div (constant)](#div-constant)
- [eq (constant)](#eq-constant)
- [gcd (constant)](#gcd-constant)
- [lcm (constant)](#lcm-constant)
- [mul (constant)](#mul-constant)
- [negate (constant)](#negate-constant)
- [one (constant)](#one-constant)
- [ord (constant)](#ord-constant)
- [show (constant)](#show-constant)
- [unwrap (constant)](#unwrap-constant)
- [fromInteger (function)](#frominteger-function)
- [sub (function)](#sub-function)
- [wrap (function)](#wrap-function)

---

# Natural (interface)

A PositiveInteger is also an Integer

**Signature**

```ts
export interface Natural
  extends Newtype<
    {
      Integer: true
      NonZero: true
      Positive: true
    },
    BigInteger
  > {}
```

# add (constant)

**Signature**

```ts
export const add: (x: Natural, y: Natural) => Natural = ...
```

# div (constant)

**Signature**

```ts
export const div: (x: Natural, y: Natural) => Natural = ...
```

# eq (constant)

**Signature**

```ts
export const eq: Eq<Natural> = ...
```

# gcd (constant)

**Signature**

```ts
export const gcd: (x: Natural, y: Natural) => Natural = ...
```

# lcm (constant)

**Signature**

```ts
export const lcm: (x: Natural, y: Natural) => Natural = ...
```

# mul (constant)

**Signature**

```ts
export const mul: (x: Natural, y: Natural) => Natural = ...
```

# negate (constant)

**Signature**

```ts
export const negate: (x: Natural) => NonZeroInteger = ...
```

# one (constant)

**Signature**

```ts
export const one: Natural = ...
```

# ord (constant)

**Signature**

```ts
export const ord: Ord<Natural> = ...
```

# show (constant)

**Signature**

```ts
export const show: (x: Natural) => string = ...
```

# unwrap (constant)

**Signature**

```ts
export const unwrap: (x: Natural) => BigInteger = ...
```

# fromInteger (function)

**Signature**

```ts
export function fromInteger(i: Integer): Option<Natural> { ... }
```

# sub (function)

**Signature**

```ts
export function sub(x: Natural, y: Natural): Option<Natural> { ... }
```

# wrap (function)

**Signature**

```ts
export function wrap(x: BigInteger): Option<Natural> { ... }
```
