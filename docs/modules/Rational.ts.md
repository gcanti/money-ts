---
title: Rational.ts
nav_order: 21
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Rational (type alias)](#rational-type-alias)
- [one (constant)](#one-constant)
- [ord (constant)](#ord-constant)
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

Added in v0.1.2

# one (constant)

**Signature**

```ts
export const one: Rational = ...
```

Added in v0.1.2

# ord (constant)

**Signature**

```ts
export const ord: Ord<Rational> = ...
```

Added in v0.1.2

# zero (constant)

**Signature**

```ts
export const zero: Rational = ...
```

Added in v0.1.2

# add (function)

**Signature**

```ts
export function add([nx, dx]: Rational, [ny, dy]: Rational): Rational { ... }
```

Added in v0.1.2

# ceil (function)

**Signature**

```ts
export function ceil(x: Rational): Integer { ... }
```

Added in v0.1.2

# div (function)

**Signature**

```ts
export function div(x: Rational, y: NonZeroRational): Rational { ... }
```

Added in v0.1.2

# floor (function)

**Signature**

```ts
export function floor(x: Rational): Integer { ... }
```

Added in v0.1.2

# fromInteger (function)

**Signature**

```ts
export function fromInteger(x: Integer): Rational { ... }
```

Added in v0.1.2

# isZero (function)

**Signature**

```ts
export function isZero(x: Rational): boolean { ... }
```

Added in v0.1.2

# mul (function)

**Signature**

```ts
export function mul(x: Rational, y: Rational): Rational { ... }
```

Added in v0.1.2

# negate (function)

**Signature**

```ts
export function negate(x: Rational): Rational { ... }
```

Added in v0.1.2

# reduce (function)

**Signature**

```ts
export function reduce(n: Integer, d: Natural): Rational { ... }
```

Added in v0.1.2

# round (function)

**Signature**

```ts
export function round(x: Rational): Integer { ... }
```

Added in v0.1.2

# show (function)

**Signature**

```ts
export const show = (x: Rational): string => ...
```

Added in v0.1.2

# sign (function)

**Signature**

```ts
export function sign(x: Rational): -1 | 0 | 1 { ... }
```

Added in v0.1.2

# sub (function)

**Signature**

```ts
export function sub(x: Rational, y: Rational): Rational { ... }
```

Added in v0.1.2

# trunc (function)

**Signature**

```ts
export function trunc(x: Rational): Integer { ... }
```

Added in v0.1.2
