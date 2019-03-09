---
title: Home
nav_order: 1
---

A porting of [safe-money](https://github.com/k0001/safe-money) (Haskell)

Blog post: https://ren.zone/articles/safe-money

# Features

## Newtypes

Via [newtype-ts](https://github.com/gcanti/newtype-ts)

- `BigInteger`
- `ExchangeRate`
- `Integer`
- `Natural`
- `NonZeroInteger`

## Type aliases

- `NonZeroRational`
- `PositiveRational`
- `Rational`

## Discrete

```ts
import { Integer } from 'money-ts/lib/Integer'
import { Discrete } from 'money-ts/lib/Discrete'

declare const ix: Integer // 2
declare const iy: Integer // 3

const x = new Discrete({ dimension: 'EUR', unit: 'cent' }, ix)
const y = new Discrete({ dimension: 'EUR', unit: 'cent' }, iy)
// z: Discrete<"EUR", "cent">
const z = x.add(y)
console.log(z)
// => EUR cent 5
```

## Dense

```ts
import * as dense from 'money-ts/lib/Dense'
import 'money-ts/lib/scale/EUR' // <= required in order to convert a discrete to a dense

const d = dense.fromDiscrete(z)
console.log(d)
// => EUR 5 / 100
```

## Runtime types for IO validation

Via [io-ts](https://github.com/gcanti/io-ts)

- `BigInteger`
- `Dense`
- `Discrete`
- `ExchangeRate`
- `Integer`
- `Natural`
- `NonZeroInteger`
- `NonZeroRational`
- `PositiveRational`
- `Rational`
