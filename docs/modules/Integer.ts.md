---
title: Integer.ts
nav_order: 6
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Integer (interface)](#integer-interface)
- [add (constant)](#add-constant)
- [eq (constant)](#eq-constant)
- [mul (constant)](#mul-constant)
- [negate (constant)](#negate-constant)
- [one (constant)](#one-constant)
- [ord (constant)](#ord-constant)
- [ring (constant)](#ring-constant)
- [sub (constant)](#sub-constant)
- [unwrap (constant)](#unwrap-constant)
- [wrap (constant)](#wrap-constant)
- [zero (constant)](#zero-constant)
- [div (function)](#div-function)
- [isPositive (function)](#ispositive-function)
- [isZero (function)](#iszero-function)
- [show (function)](#show-function)
- [sign (function)](#sign-function)

---

# Integer (interface)

**Signature**

```ts
export interface Integer extends Newtype<{ Integer: true }, BigInteger> {}
```

# add (constant)

**Signature**

```ts
export const add: (x: Integer, y: Integer) => Integer = ...
```

# eq (constant)

**Signature**

```ts
export const eq: Eq<Integer> = ...
```

# mul (constant)

**Signature**

```ts
export const mul: (x: Integer, y: Integer) => Integer = ...
```

# negate (constant)

**Signature**

```ts
export const negate: (x: Integer) => Integer = ...
```

# one (constant)

**Signature**

```ts
export const one: Integer = ...
```

# ord (constant)

**Signature**

```ts
export const ord: Ord.Ord<Integer> = ...
```

# ring (constant)

**Signature**

```ts
export const ring: Ring<Integer> = ...
```

# sub (constant)

**Signature**

```ts
export const sub: (x: Integer, y: Integer) => Integer = ...
```

# unwrap (constant)

**Signature**

```ts
export const unwrap: (x: Integer) => BigInteger = ...
```

# wrap (constant)

**Signature**

```ts
export const wrap: (x: BigInteger) => Integer = ...
```

# zero (constant)

**Signature**

```ts
export const zero: Integer = ...
```

# div (function)

**Signature**

```ts
export function div(x: Integer, y: NonZeroInteger): Integer { ... }
```

# isPositive (function)

**Signature**

```ts
export const isPositive = (x: Integer): boolean => ...
```

# isZero (function)

**Signature**

```ts
export const isZero = (x: Integer): boolean => ...
```

# show (function)

**Signature**

```ts
export function show(x: Integer): string { ... }
```

# sign (function)

**Signature**

```ts
export function sign(x: Integer): -1 | 0 | 1 { ... }
```
