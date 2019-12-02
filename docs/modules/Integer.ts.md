---
title: Integer.ts
nav_order: 6
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Integer (interface)](#integer-interface)
- [add (constant)](#add-constant)
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

Added in v0.1.2

# add (constant)

**Signature**

```ts
export const add: (x: Integer, y: Integer) => Integer = ...
```

Added in v0.1.2

# mul (constant)

**Signature**

```ts
export const mul: (x: Integer, y: Integer) => Integer = ...
```

Added in v0.1.2

# negate (constant)

**Signature**

```ts
export const negate: (x: Integer) => Integer = ...
```

Added in v0.1.2

# one (constant)

**Signature**

```ts
export const one: Integer = ...
```

Added in v0.1.2

# ord (constant)

**Signature**

```ts
export const ord: Ord<Integer> = ...
```

Added in v0.1.2

# ring (constant)

**Signature**

```ts
export const ring: Ring<Integer> = ...
```

Added in v0.1.2

# sub (constant)

**Signature**

```ts
export const sub: (x: Integer, y: Integer) => Integer = ...
```

Added in v0.1.2

# unwrap (constant)

**Signature**

```ts
export const unwrap: (x: Integer) => BigInteger = ...
```

Added in v0.1.2

# wrap (constant)

**Signature**

```ts
export const wrap: (x: BigInteger) => Integer = ...
```

Added in v0.1.2

# zero (constant)

**Signature**

```ts
export const zero: Integer = ...
```

Added in v0.1.2

# div (function)

**Signature**

```ts
export function div(x: Integer, y: NonZeroInteger): Integer { ... }
```

Added in v0.1.2

# isPositive (function)

**Signature**

```ts
export const isPositive = (x: Integer): boolean => ...
```

Added in v0.1.2

# isZero (function)

**Signature**

```ts
export const isZero = (x: Integer): boolean => ...
```

Added in v0.1.2

# show (function)

**Signature**

```ts
export function show(x: Integer): string { ... }
```

Added in v0.1.2

# sign (function)

**Signature**

```ts
export function sign(x: Integer): -1 | 0 | 1 { ... }
```

Added in v0.1.2
