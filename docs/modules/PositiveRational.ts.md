---
title: PositiveRational.ts
nav_order: 20
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [PositiveRational (type alias)](#positiverational-type-alias)
- [add (constant)](#add-constant)
- [div (constant)](#div-constant)
- [inverse (constant)](#inverse-constant)
- [mul (constant)](#mul-constant)
- [one (constant)](#one-constant)
- [ord (constant)](#ord-constant)
- [reduce (constant)](#reduce-constant)
- [setoid (constant)](#setoid-constant)
- [show (constant)](#show-constant)
- [fromRational (function)](#fromrational-function)
- [sub (function)](#sub-function)

---

# PositiveRational (type alias)

**Signature**

```ts
export type PositiveRational = [Natural, Natural]
```

# add (constant)

**Signature**

```ts
export const add: (x: PositiveRational, y: PositiveRational) => PositiveRational = ...
```

# div (constant)

**Signature**

```ts
export const div: (x: PositiveRational, y: PositiveRational) => PositiveRational = ...
```

# inverse (constant)

**Signature**

```ts
export const inverse: (x: PositiveRational) => PositiveRational = ...
```

# mul (constant)

**Signature**

```ts
export const mul: (x: PositiveRational, y: PositiveRational) => PositiveRational = ...
```

# one (constant)

**Signature**

```ts
export const one: PositiveRational = ...
```

# ord (constant)

**Signature**

```ts
export const ord: Ord<PositiveRational> = ...
```

# reduce (constant)

**Signature**

```ts
export const reduce: (n: Natural, d: Natural) => PositiveRational = ...
```

# setoid (constant)

**Signature**

```ts
export const setoid: Setoid<PositiveRational> = ...
```

# show (constant)

**Signature**

```ts
export const show: (x: PositiveRational) => string = ...
```

# fromRational (function)

**Signature**

```ts
export function fromRational(r: Rational): Option<PositiveRational> { ... }
```

# sub (function)

**Signature**

```ts
export function sub(x: PositiveRational, y: PositiveRational): Option<PositiveRational> { ... }
```
