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

**Signature**

```ts
export interface Natural
  extends Newtype<
    {
      Integer: true
      NonZero: true
      Positive: true
    },
    bigint
  > {}
```

Added in v0.1.2

# add (constant)

**Signature**

```ts
export const add: (x: Natural, y: Natural) => Natural = ...
```

Added in v0.1.2

# div (constant)

**Signature**

```ts
export const div: (x: Natural, y: Natural) => Natural = ...
```

Added in v0.1.2

# gcd (constant)

**Signature**

```ts
export const gcd: (x: Natural, y: Natural) => Natural = ...
```

Added in v0.1.2

# lcm (constant)

**Signature**

```ts
export const lcm: (x: Natural, y: Natural) => Natural = ...
```

Added in v0.1.2

# mul (constant)

**Signature**

```ts
export const mul: (x: Natural, y: Natural) => Natural = ...
```

Added in v0.1.2

# negate (constant)

**Signature**

```ts
export const negate: (x: Natural) => NonZeroInteger = ...
```

Added in v0.1.2

# one (constant)

**Signature**

```ts
export const one: Natural = ...
```

Added in v0.1.2

# ord (constant)

**Signature**

```ts
export const ord: Ord<Natural> = ...
```

Added in v0.1.2

# show (constant)

**Signature**

```ts
export const show: (x: Natural) => string = ...
```

Added in v0.1.2

# unwrap (constant)

**Signature**

```ts
export const unwrap: (x: Natural) => bigint = ...
```

Added in v0.1.2

# fromInteger (function)

**Signature**

```ts
export function fromInteger(i: Integer): Option<Natural> { ... }
```

Added in v0.1.2

# sub (function)

**Signature**

```ts
export function sub(x: Natural, y: Natural): Option<Natural> { ... }
```

Added in v0.1.2

# wrap (function)

**Signature**

```ts
export function wrap(x: bigint): Option<Natural> { ... }
```

Added in v0.1.2
