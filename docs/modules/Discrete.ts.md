---
title: Discrete.ts
nav_order: 3
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Format (interface)](#format-interface)
- [Discrete (class)](#discrete-class)
  - [isZero (method)](#iszero-method)
  - [modify (method)](#modify-method)
  - [add (method)](#add-method)
  - [mul (method)](#mul-method)
  - [negate (method)](#negate-method)
  - [sub (method)](#sub-method)
  - [div (method)](#div-method)
  - [toString (method)](#tostring-method)
- [getOne (function)](#getone-function)
- [getOrd (function)](#getord-function)
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

Added in v0.1.2

# Discrete (class)

**Signature**

```ts
export class Discrete<D, U> {
  constructor(readonly format: Format<D, U>, readonly value: Integer) { ... }
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
modify(f: (r: Integer) => Integer): Discrete<D, U> { ... }
```

Added in v0.2.0

## add (method)

**Signature**

```ts
add(y: Discrete<D, U>): Discrete<D, U> { ... }
```

Added in v0.1.2

## mul (method)

**Signature**

```ts
mul(y: Integer): Discrete<D, U> { ... }
```

Added in v0.1.2

## negate (method)

**Signature**

```ts
negate(): Discrete<D, U> { ... }
```

Added in v0.1.2

## sub (method)

**Signature**

```ts
sub(y: Discrete<D, U>): Discrete<D, U> { ... }
```

Added in v0.1.2

## div (method)

**Signature**

```ts
div(y: NonZeroInteger): Discrete<D, U> { ... }
```

Added in v0.1.2

## toString (method)

**Signature**

```ts
toString(): string { ... }
```

Added in v0.1.2

# getOne (function)

**Signature**

```ts
export function getOne<D extends string, U extends string>(format: Format<D, U>): Discrete<D, U> { ... }
```

Added in v0.1.2

# getOrd (function)

**Signature**

```ts
export function getOrd<D extends string, U extends string>(): Ord<Discrete<D, U>> { ... }
```

Added in v0.1.2

# getZero (function)

**Signature**

```ts
export function getZero<D extends string, U extends string>(format: Format<D, U>): Discrete<D, U> { ... }
```

Added in v0.1.2
