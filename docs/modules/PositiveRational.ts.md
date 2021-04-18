---
title: PositiveRational.ts
nav_order: 11
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [PositiveRational (type alias)](#positiverational-type-alias)
- [Eq (constant)](#eq-constant)
- [Ord (constant)](#ord-constant)
- [add (constant)](#add-constant)
- [div (constant)](#div-constant)
- [inverse (constant)](#inverse-constant)
- [mul (constant)](#mul-constant)
- [one (constant)](#one-constant)
- [reduce (constant)](#reduce-constant)
- [show (constant)](#show-constant)
- [fromRational (function)](#fromrational-function)
- [sub (function)](#sub-function)

---

# PositiveRational (type alias)

**Signature**

```ts
export type PositiveRational = [Natural, Natural]
```

# Eq (constant)

**Signature**

```ts
export const Eq: EQ.Eq<PositiveRational> = ...
```

# Ord (constant)

**Signature**

```ts
export const Ord: ORD.Ord<PositiveRational> = ...
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

# reduce (constant)

**Signature**

```ts
export const reduce: (n: Natural, d: Natural) => PositiveRational = ...
```

# show (constant)

**Signature**

```ts
export const show: (x: PositiveRational) => string = ...
```

# fromRational (function)

**Signature**

```ts
export function fromRational(r: Rational): O.Option<PositiveRational> { ... }
```

# sub (function)

**Signature**

```ts
export function sub(x: PositiveRational, y: PositiveRational): O.Option<PositiveRational> { ... }
```
