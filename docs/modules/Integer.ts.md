---
title: Integer.ts
nav_order: 6
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Integer (interface)](#integer-interface)
- [integer (constant)](#integer-constant)
- [one (constant)](#one-constant)
- [unwrap (constant)](#unwrap-constant)
- [wrap (constant)](#wrap-constant)
- [zero (constant)](#zero-constant)
- [add (function)](#add-function)
- [div (function)](#div-function)
- [isPositive (function)](#ispositive-function)
- [isZero (function)](#iszero-function)
- [mul (function)](#mul-function)
- [negate (function)](#negate-function)
- [show (function)](#show-function)
- [sign (function)](#sign-function)
- [sub (function)](#sub-function)

---

# Integer (interface)

**Signature**

```ts
export interface Integer extends Newtype<{ Integer: true }, bigint> {}
```

Added in v0.1.2

# integer (constant)

**Signature**

```ts
export const integer: Ord<Integer> & Ring<Integer> = ...
```

Added in v0.2.0

# one (constant)

**Signature**

```ts
export const one: Integer = ...
```

Added in v0.1.2

# unwrap (constant)

**Signature**

```ts
export const unwrap: (x: Integer) => bigint = ...
```

Added in v0.2.0

# wrap (constant)

**Signature**

```ts
export const wrap: (x: bigint) => Integer = ...
```

Added in v0.2.0

# zero (constant)

**Signature**

```ts
export const zero: Integer = ...
```

Added in v0.1.2

# add (function)

**Signature**

```ts
export function add(x: Integer, y: Integer): Integer { ... }
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

# mul (function)

**Signature**

```ts
export function mul(x: Integer, y: Integer): Integer { ... }
```

Added in v0.1.2

# negate (function)

**Signature**

```ts
export function negate(x: Integer): Integer { ... }
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
export function sign(x: Integer): Ordering { ... }
```

Added in v0.1.2

# sub (function)

**Signature**

```ts
export function sub(x: Integer, y: Integer): Integer { ... }
```

Added in v0.1.2
