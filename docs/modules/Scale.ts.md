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
export interface Scale {
  /** Australian dollar */
  AUD: {
    AUD: PositiveRational
    dollar: PositiveRational
    cent: PositiveRational
  }
  /** Bitcoin */
  BTC: {
    BTC: PositiveRational
    bitcoin: PositiveRational
    satoshi: PositiveRational
  }
  /** Swiss franc */
  CHF: {
    CHF: PositiveRational
    franc: PositiveRational
    rappen: PositiveRational
  }
  /** Chinese Renminbi */
  CNY: {
    CNY: PositiveRational
    yuan: PositiveRational
    fen: PositiveRational
  }
  /** European euro */
  EUR: {
    EUR: PositiveRational
    euro: PositiveRational
    cent: PositiveRational
  }
  /** Pound sterling */
  GBP: {
    GBP: PositiveRational
    pound: PositiveRational
    penny: PositiveRational
  }
  /** Indian rupee */
  INR: {
    INR: PositiveRational
    rupee: PositiveRational
    paisa: PositiveRational
  }
  /** Japanese yen */
  JPY: {
    JPY: PositiveRational
    yen: PositiveRational
    sen: PositiveRational
  }
  /** South Korean won */
  KRW: {
    KRW: PositiveRational
    won: PositiveRational
    jeon: PositiveRational
  }
  /** Russian ruble */
  RUB: {
    RUB: PositiveRational
    ruble: PositiveRational
    kopek: PositiveRational
  }
  /** United States dollar */
  USD: {
    USD: PositiveRational
    dollar: PositiveRational
    cent: PositiveRational
  }
  /** Silver. No canonical smallest unit */
  XAG: {
    'troy-ounce': PositiveRational
    grain: PositiveRational
    milligrain: PositiveRational
    micrograin: PositiveRational
    kilogram: PositiveRational
    gram: PositiveRational
    milligram: PositiveRational
    microgram: PositiveRational
  }
  /** Gold. No canonical smallest unit */
  XAU: {
    'troy-ounce': PositiveRational
    grain: PositiveRational
    milligrain: PositiveRational
    micrograin: PositiveRational
    kilogram: PositiveRational
    gram: PositiveRational
    milligram: PositiveRational
    microgram: PositiveRational
  }
  /** Palladium. No canonical smallest unit */
  XPD: {
    'troy-ounce': PositiveRational
    grain: PositiveRational
    milligrain: PositiveRational
    micrograin: PositiveRational
    kilogram: PositiveRational
    gram: PositiveRational
    milligram: PositiveRational
    microgram: PositiveRational
  }
  /** Platinum. No canonical smallest unit */
  XPT: {
    'troy-ounce': PositiveRational
    grain: PositiveRational
    milligrain: PositiveRational
    micrograin: PositiveRational
    kilogram: PositiveRational
    gram: PositiveRational
    milligram: PositiveRational
    microgram: PositiveRational
  }
}
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
