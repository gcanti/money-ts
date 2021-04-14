---
title: NonZeroRational.ts
nav_order: 19
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [NonZeroRational (type alias)](#nonzerorational-type-alias)
- [add (constant)](#add-constant)
- [div (constant)](#div-constant)
- [eq (constant)](#eq-constant)
- [mul (constant)](#mul-constant)
- [one (constant)](#one-constant)
- [ord (constant)](#ord-constant)
- [reduce (constant)](#reduce-constant)
- [show (constant)](#show-constant)
- [fromRational (function)](#fromrational-function)
- [inverse (function)](#inverse-function)
- [sub (function)](#sub-function)

---

# NonZeroRational (type alias)

**Signature**

```ts
export type NonZeroRational = [NonZeroInteger, Natural]
```

# add (constant)

**Signature**

```ts
export const add: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = ...
```

# div (constant)

**Signature**

```ts
export const div: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = ...
```

# eq (constant)

**Signature**

```ts
export const eq: Eq<NonZeroRational> = ...
```

# mul (constant)

**Signature**

```ts
export const mul: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = ...
```

# one (constant)

**Signature**

```ts
export const one: NonZeroRational = ...
```

# ord (constant)

**Signature**

```ts
export const ord: Ord<NonZeroRational> = ...
```

# reduce (constant)

**Signature**

```ts
export const reduce: (n: NonZeroInteger, d: Natural) => NonZeroRational = ...
```

# show (constant)

**Signature**

```ts
export const show: (x: NonZeroRational) => string = ...
```

# fromRational (function)

**Signature**

```ts
export function fromRational(r: Rational): O.Option<NonZeroRational> { ... }
```

# inverse (function)

**Signature**

```ts
export function inverse(x: NonZeroRational): NonZeroRational { ... }
```

# sub (function)

**Signature**

```ts
export function sub(x: NonZeroRational, y: NonZeroRational): O.Option<NonZeroRational> { ... }
```
