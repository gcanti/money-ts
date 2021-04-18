---
title: Dense.ts
nav_order: 2
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Dense (class)](#dense-class)
  - [isZero (method)](#iszero-method)
  - [add (method)](#add-method)
  - [mul (method)](#mul-method)
  - [negate (method)](#negate-method)
  - [sub (method)](#sub-method)
  - [div (method)](#div-method)
  - [inspect (method)](#inspect-method)
  - [toString (method)](#tostring-method)
- [ceil (function)](#ceil-function)
- [floor (function)](#floor-function)
- [fromDiscrete (function)](#fromdiscrete-function)
- [fromInteger (function)](#frominteger-function)
- [getEq (function)](#geteq-function)
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
  constructor(readonly dimension: D, readonly value: R.Rational) { ... }
  ...
}
```

## isZero (method)

**Signature**

```ts
isZero(): boolean { ... }
```

## add (method)

**Signature**

```ts
add(y: Dense<D>): Dense<D> { ... }
```

## mul (method)

**Signature**

```ts
mul(y: R.Rational): Dense<D> { ... }
```

## negate (method)

**Signature**

```ts
negate(): Dense<D> { ... }
```

## sub (method)

**Signature**

```ts
sub(y: Dense<D>): Dense<D> { ... }
```

## div (method)

**Signature**

```ts
div(y: NonZeroRational): Dense<D> { ... }
```

## inspect (method)

**Signature**

```ts
inspect(): string { ... }
```

## toString (method)

**Signature**

```ts
toString(): string { ... }
```

# ceil (function)

**Signature**

```ts
export function ceil<D extends Dimensions, U extends Units<D>>(unit: U, d: Dense<D>): [Discrete<D, U>, Dense<D>] { ... }
```

# floor (function)

**Signature**

```ts
export function floor<D extends Dimensions, U extends Units<D>>(unit: U, d: Dense<D>): [Discrete<D, U>, Dense<D>] { ... }
```

# fromDiscrete (function)

**Signature**

```ts
export function fromDiscrete<D extends Dimensions, U extends Units<D>>(d: Discrete<D, U>): Dense<D> { ... }
```

# fromInteger (function)

**Signature**

```ts
export function fromInteger<D extends string>(d: D, i: Integer): Dense<D> { ... }
```

# getEq (function)

**Signature**

```ts
export function getEq<D extends string>(): Eq<Dense<D>> { ... }
```

# getOne (function)

**Signature**

```ts
export function getOne<D extends string>(d: D): Dense<D> { ... }
```

# getOrd (function)

**Signature**

```ts
export function getOrd<D extends string>(): Ord<Dense<D>> { ... }
```

# getScale (function)

**Signature**

```ts
export function getScale<D extends Dimensions, U extends Units<D>>(format: Format<D, U>): PositiveRational { ... }
```

# getZero (function)

**Signature**

```ts
export function getZero<D extends string>(d: D): Dense<D> { ... }
```

# round (function)

**Signature**

```ts
export function round<D extends Dimensions, U extends Units<D>>(unit: U, d: Dense<D>): [Discrete<D, U>, Dense<D>] { ... }
```

# trunc (function)

**Signature**

```ts
export function trunc<D extends Dimensions, U extends Units<D>>(unit: U, d: Dense<D>): [Discrete<D, U>, Dense<D>] { ... }
```
