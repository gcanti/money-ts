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
- [show (constant)](#show-constant)
- [fromRational (function)](#fromrational-function)
- [sub (function)](#sub-function)

---

# PositiveRational (type alias)

**Signature**

```ts
export type PositiveRational = [Natural, Natural]
```

Added in v0.1.2

# add (constant)

**Signature**

```ts
export const add: (x: PositiveRational, y: PositiveRational) => PositiveRational = ...
```

Added in v0.1.2

# div (constant)

**Signature**

```ts
export const div: (x: PositiveRational, y: PositiveRational) => PositiveRational = ...
```

Added in v0.1.2

# inverse (constant)

**Signature**

```ts
export const inverse: (x: PositiveRational) => PositiveRational = ...
```

Added in v0.1.2

# mul (constant)

**Signature**

```ts
export const mul: (x: PositiveRational, y: PositiveRational) => PositiveRational = ...
```

Added in v0.1.2

# one (constant)

**Signature**

```ts
export const one: PositiveRational = ...
```

Added in v0.1.2

# ord (constant)

**Signature**

```ts
export const ord: Ord<PositiveRational> = ...
```

Added in v0.1.2

# reduce (constant)

**Signature**

```ts
export const reduce: (n: Natural, d: Natural) => PositiveRational = ...
```

Added in v0.1.2

# show (constant)

**Signature**

```ts
export const show: (x: PositiveRational) => string = ...
```

Added in v0.1.2

# fromRational (function)

**Signature**

```ts
export function fromRational(r: Rational): Option<PositiveRational> { ... }
```

Added in v0.1.2

# sub (function)

**Signature**

```ts
export function sub(x: PositiveRational, y: PositiveRational): Option<PositiveRational> { ... }
```

Added in v0.1.2
