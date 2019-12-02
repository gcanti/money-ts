---
title: Scale.ts
nav_order: 22
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Scale (interface)](#scale-interface)
- [Dimensions (type alias)](#dimensions-type-alias)
- [Units (type alias)](#units-type-alias)
- [scale (constant)](#scale-constant)

---

# Scale (interface)

**Signature**

```ts
export interface Scale {}
```

Added in v0.1.2

# Dimensions (type alias)

**Signature**

```ts
export type Dimensions = keyof Scale
```

Added in v0.1.2

# Units (type alias)

**Signature**

```ts
export type Units<Dimension extends Dimensions> = keyof Scale[Dimension]
```

Added in v0.1.2

# scale (constant)

**Signature**

```ts
export const scale: Scale = ...
```

Added in v0.1.2
