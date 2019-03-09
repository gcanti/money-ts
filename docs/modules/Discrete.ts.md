---
title: Discrete.ts
nav_order: 3
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Format (interface)](#format-interface)
- [Discrete (class)](#discrete-class)
  - [add (method)](#add-method)
  - [mul (method)](#mul-method)
  - [negate (method)](#negate-method)
  - [sub (method)](#sub-method)
  - [div (method)](#div-method)
  - [isZero (method)](#iszero-method)
  - [inspect (method)](#inspect-method)
  - [toString (method)](#tostring-method)
- [getOne (function)](#getone-function)
- [getOrd (function)](#getord-function)
- [getSetoid (function)](#getsetoid-function)
- [getZero (function)](#getzero-function)

---

# Format (interface)

**Signature**

```ts
export interface Format<D extends string, U extends string | number | symbol> {
  dimension: D
  unit: U
}
```

# Discrete (class)

**Signature**

```ts
export class Discrete<D, U> {
  constructor(readonly format: Format<D, U>, readonly value: Integer) { ... }
  ...
}
```

## add (method)

**Signature**

```ts
add(y: Discrete<D, U>): Discrete<D, U> { ... }
```

## mul (method)

**Signature**

```ts
mul(y: Integer): Discrete<D, U> { ... }
```

## negate (method)

**Signature**

```ts
negate(): Discrete<D, U> { ... }
```

## sub (method)

**Signature**

```ts
sub(y: Discrete<D, U>): Discrete<D, U> { ... }
```

## div (method)

**Signature**

```ts
div(y: NonZeroInteger): Discrete<D, U> { ... }
```

## isZero (method)

**Signature**

```ts
isZero(): boolean { ... }
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

# getOne (function)

**Signature**

```ts
export function getOne<D extends string, U extends string>(format: Format<D, U>): Discrete<D, U> { ... }
```

# getOrd (function)

**Signature**

```ts
export function getOrd<D extends string, U extends string>(): Ord<Discrete<D, U>> { ... }
```

# getSetoid (function)

**Signature**

```ts
export function getSetoid<D extends string, U extends string>(): Setoid<Discrete<D, U>> { ... }
```

# getZero (function)

**Signature**

```ts
export function getZero<D extends string, U extends string>(format: Format<D, U>): Discrete<D, U> { ... }
```
