---
title: Scale.ts
nav_order: 13
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

# Dimensions (type alias)

**Signature**

```ts
export type Dimensions = keyof Scale
```

# Units (type alias)

**Signature**

```ts
export type Units<Dimension extends Dimensions> = keyof Scale[Dimension]
```

# scale (constant)

**Signature**

```ts
export const scale: Scale = ...
```
