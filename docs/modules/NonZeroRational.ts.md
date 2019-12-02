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

Added in v0.1.2

# add (constant)

**Signature**

```ts
export const add: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = ...
```

Added in v0.1.2

# div (constant)

**Signature**

```ts
export const div: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = ...
```

Added in v0.1.2

# mul (constant)

**Signature**

```ts
export const mul: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = ...
```

Added in v0.1.2

# one (constant)

**Signature**

```ts
export const one: NonZeroRational = ...
```

Added in v0.1.2

# ord (constant)

**Signature**

```ts
export const ord: Ord<NonZeroRational> = ...
```

Added in v0.1.2

# reduce (constant)

**Signature**

```ts
export const reduce: (n: NonZeroInteger, d: Natural) => NonZeroRational = ...
```

Added in v0.1.2

# show (constant)

**Signature**

```ts
export const show: (x: NonZeroRational) => string = ...
```

Added in v0.1.2

# fromRational (function)

**Signature**

```ts
export function fromRational(r: Rational): Option<NonZeroRational> { ... }
```

Added in v0.1.2

# inverse (function)

**Signature**

```ts
export function inverse(x: NonZeroRational): NonZeroRational { ... }
```

Added in v0.1.2

# sub (function)

**Signature**

```ts
export function sub(x: NonZeroRational, y: NonZeroRational): Option<NonZeroRational> { ... }
```

Added in v0.1.2
