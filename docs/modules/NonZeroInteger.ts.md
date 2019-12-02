---
title: NonZeroInteger.ts
nav_order: 18
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [NonZeroInteger (interface)](#nonzerointeger-interface)
- [add (constant)](#add-constant)
- [div (constant)](#div-constant)
- [isPositive (constant)](#ispositive-constant)
- [mul (constant)](#mul-constant)
- [negate (constant)](#negate-constant)
- [one (constant)](#one-constant)
- [ord (constant)](#ord-constant)
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

Added in v0.1.2

# add (constant)

**Signature**

```ts
export const add: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = ...
```

Added in v0.1.2

# div (constant)

**Signature**

```ts
export const div: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = ...
```

Added in v0.1.2

# isPositive (constant)

**Signature**

```ts
export const isPositive: (x: NonZeroInteger) => boolean = ...
```

Added in v0.1.2

# mul (constant)

**Signature**

```ts
export const mul: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = ...
```

Added in v0.1.2

# negate (constant)

**Signature**

```ts
export const negate: (x: NonZeroInteger) => NonZeroInteger = ...
```

Added in v0.1.2

# one (constant)

**Signature**

```ts
export const one: NonZeroInteger = ...
```

Added in v0.1.2

# ord (constant)

**Signature**

```ts
export const ord: Ord<NonZeroInteger> = ...
```

Added in v0.1.2

# show (constant)

**Signature**

```ts
export const show: (x: NonZeroInteger) => string = ...
```

Added in v0.1.2

# sign (constant)

**Signature**

```ts
export const sign: (x: NonZeroInteger) => -1 | 1 = ...
```

Added in v0.1.2

# unwrap (constant)

**Signature**

```ts
export const unwrap: (x: NonZeroInteger) => BigInteger = ...
```

Added in v0.1.2

# abs (function)

**Signature**

```ts
export function abs(x: NonZeroInteger): Natural { ... }
```

Added in v0.1.2

# fromInteger (function)

**Signature**

```ts
export function fromInteger(i: Integer): Option<NonZeroInteger> { ... }
```

Added in v0.1.2

# gcd (function)

**Signature**

```ts
export function gcd(x: Integer, y: NonZeroInteger): Natural { ... }
```

Added in v0.1.2

# lcm (function)

**Signature**

```ts
export function lcm(x: NonZeroInteger, y: NonZeroInteger): Natural { ... }
```

Added in v0.1.2

# sub (function)

**Signature**

```ts
export function sub(x: NonZeroInteger, y: NonZeroInteger): Option<NonZeroInteger> { ... }
```

Added in v0.1.2

# wrap (function)

**Signature**

```ts
export function wrap(x: BigInteger): Option<NonZeroInteger> { ... }
```

Added in v0.1.2
