---
title: Dense.ts
nav_order: 2
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Dense (class)](#dense-class)
  - [isZero (method)](#iszero-method)
  - [modify (method)](#modify-method)
  - [add (method)](#add-method)
  - [mul (method)](#mul-method)
  - [negate (method)](#negate-method)
  - [sub (method)](#sub-method)
  - [div (method)](#div-method)
  - [toString (method)](#tostring-method)
- [ceil (function)](#ceil-function)
- [floor (function)](#floor-function)
- [fromDiscrete (function)](#fromdiscrete-function)
- [fromInteger (function)](#frominteger-function)
- [getOne (function)](#getone-function)
- [getOrd (function)](#getord-function)
- [getScale (function)](#getscale-function)
- [getZero (function)](#getzero-function)
- [round (function)](#round-function)
- [trunc (function)](#trunc-function)

---

# Dense (class)

**Signature**

```ts
export class Dense<D> {
  constructor(readonly dimension: D, readonly value: Rational) { ... }
  ...
}
```

Added in v0.1.2

## isZero (method)

**Signature**

```ts
isZero(): boolean { ... }
```

Added in v0.1.2

## modify (method)

**Signature**

```ts
modify(f: (r: Rational) => Rational): Dense<D> { ... }
```

Added in v0.2.0

## add (method)

**Signature**

```ts
add(y: Dense<D>): Dense<D> { ... }
```

Added in v0.1.2

## mul (method)

**Signature**

```ts
mul(y: Rational): Dense<D> { ... }
```

Added in v0.1.2

## negate (method)

**Signature**

```ts
negate(): Dense<D> { ... }
```

Added in v0.1.2

## sub (method)

**Signature**

```ts
sub(y: Dense<D>): Dense<D> { ... }
```

Added in v0.1.2

## div (method)

**Signature**

```ts
div(y: NonZeroRational): Dense<D> { ... }
```

Added in v0.1.2

## toString (method)

**Signature**

```ts
toString(): string { ... }
```

Added in v0.1.2

# ceil (function)

**Signature**

```ts
export function ceil<D extends Dimensions, U extends Units<D>>(unit: U, d: Dense<D>): [Discrete<D, U>, Dense<D>] { ... }
```

Added in v0.1.2

# floor (function)

**Signature**

```ts
export function floor<D extends Dimensions, U extends Units<D>>(unit: U, d: Dense<D>): [Discrete<D, U>, Dense<D>] { ... }
```

Added in v0.1.2

# fromDiscrete (function)

**Signature**

```ts
export function fromDiscrete<D extends Dimensions, U extends Units<D>>(d: Discrete<D, U>): Dense<D> { ... }
```

Added in v0.1.2

# fromInteger (function)

**Signature**

```ts
export function fromInteger<D extends string>(d: D, i: Integer): Dense<D> { ... }
```

Added in v0.1.2

# getOne (function)

**Signature**

```ts
export function getOne<D extends string>(d: D): Dense<D> { ... }
```

Added in v0.1.2

# getOrd (function)

**Signature**

```ts
export function getOrd<D extends string>(): Ord<Dense<D>> { ... }
```

Added in v0.1.2

# getScale (function)

**Signature**

```ts
export function getScale<D extends Dimensions, U extends Units<D>>(format: Format<D, U>): PositiveRational { ... }
```

Added in v0.1.2

# getZero (function)

**Signature**

```ts
export function getZero<D extends string>(d: D): Dense<D> { ... }
```

Added in v0.1.2

# round (function)

**Signature**

```ts
export function round<D extends Dimensions, U extends Units<D>>(unit: U, d: Dense<D>): [Discrete<D, U>, Dense<D>] { ... }
```

Added in v0.1.2

# trunc (function)

**Signature**

```ts
export function trunc<D extends Dimensions, U extends Units<D>>(unit: U, d: Dense<D>): [Discrete<D, U>, Dense<D>] { ... }
```

Added in v0.1.2
