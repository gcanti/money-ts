---
title: Rational.ts
nav_order: 12
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Rational (type alias)](#rational-type-alias)
- [Eq (constant)](#eq-constant)
- [Ord (constant)](#ord-constant)
- [one (constant)](#one-constant)
- [zero (constant)](#zero-constant)
- [add (function)](#add-function)
- [ceil (function)](#ceil-function)
- [div (function)](#div-function)
- [floor (function)](#floor-function)
- [fromInteger (function)](#frominteger-function)
- [isZero (function)](#iszero-function)
- [mul (function)](#mul-function)
- [negate (function)](#negate-function)
- [reduce (function)](#reduce-function)
- [round (function)](#round-function)
- [show (function)](#show-function)
- [sign (function)](#sign-function)
- [sub (function)](#sub-function)
- [trunc (function)](#trunc-function)

---

# Rational (type alias)

**Signature**

```ts
export type Rational = [Integer, Natural]
```

# Eq (constant)

**Signature**

```ts
export const Eq: EQ.Eq<Rational> = ...
```

# Ord (constant)

**Signature**

```ts
export const Ord: ORD.Ord<Rational> = ...
```

# one (constant)

**Signature**

```ts
export const one: Rational = ...
```

# zero (constant)

**Signature**

```ts
export const zero: Rational = ...
```

# add (function)

**Signature**

```ts
export function add([nx, dx]: Rational, [ny, dy]: Rational): Rational { ... }
```

# ceil (function)

**Signature**

```ts
export function ceil(x: Rational): Integer { ... }
```

# div (function)

**Signature**

```ts
export function div(x: Rational, y: NonZeroRational): Rational { ... }
```

# floor (function)

**Signature**

```ts
export function floor(x: Rational): Integer { ... }
```

# fromInteger (function)

**Signature**

```ts
export function fromInteger(x: Integer): Rational { ... }
```

# isZero (function)

**Signature**

```ts
export function isZero(x: Rational): boolean { ... }
```

# mul (function)

**Signature**

```ts
export function mul(x: Rational, y: Rational): Rational { ... }
```

# negate (function)

**Signature**

```ts
export function negate(x: Rational): Rational { ... }
```

# reduce (function)

**Signature**

```ts
export function reduce(n: Integer, d: Natural): Rational { ... }
```

# round (function)

**Signature**

```ts
export function round(x: Rational): Integer { ... }
```

# show (function)

**Signature**

```ts
export const show = (x: Rational): string => ...
```

# sign (function)

**Signature**

```ts
export function sign(x: Rational): -1 | 0 | 1 { ... }
```

# sub (function)

**Signature**

```ts
export function sub(x: Rational, y: Rational): Rational { ... }
```

# trunc (function)

**Signature**

```ts
export function trunc(x: Rational): Integer { ... }
```
