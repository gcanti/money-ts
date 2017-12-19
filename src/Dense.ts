import { Newtype } from 'newtype-ts'
import { Rational } from './Rational'
import * as rational from './Rational'
import { Integer } from './Integer'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Discrete } from './Discrete'
import { Currencies, Units, scale } from './Scale'
import { NonZeroRational } from './NonZeroRational'

export interface Dense<Currency> extends Newtype<['Dense', Currency], Rational> {}

export function fromInteger<Currency>(n: Integer): Dense<Currency> {
  return [n, 1] as any
}

export function fromRational<Currency>(r: Rational): Dense<Currency> {
  return r as any
}

export function toRational<Currency>(d: Dense<Currency>): Rational {
  return d as any
}

export const simplify: <Currency>(d: Dense<Currency>) => Dense<Currency> = rational.simplify as any

export function getScale<Currency extends Currencies, Unit extends Units<Currency>>(
  format: Format<Currency, Unit>
): NonZeroRational {
  return scale[format.currency][format.unit]
}

export interface Format<Currency extends Currencies, Unit extends Units<Currency>> {
  currency: Currency
  unit: Unit
}

export function fromDiscrete<Currency extends Currencies, Unit extends Units<Currency>>(
  format: Format<Currency, Unit>,
  d: Discrete<Currency, Unit>
): Dense<Currency> {
  const [sn, sd] = getScale(format) as any
  return [(d as any) * (sd as any), sn] as any
}

/** Internal. Used to implement `round`, `ceiling`, `floor` and `truncate` */
function roundf<Currency extends Currencies, Unit extends Units<Currency>>(
  f: (n: number) => number,
  format: Format<Currency, Unit>,
  c0: Dense<Currency>
): [Discrete<Currency, Unit>, Dense<Currency>] {
  const r1: [number, number] = getScale(format) as any
  const r2: [number, number] = rational.mul(c0 as any, r1 as any) as any
  const i2 = f(r2[0] / r2[1])
  const r3 = [i2 * r1[1], r1[0]]
  return [i2, rational.sub(c0 as any, r3 as any)] as any
}

export function floor<Currency extends Currencies, Unit extends Units<Currency>>(
  format: Format<Currency, Unit>,
  d: Dense<Currency>
): [Discrete<Currency, Unit>, Dense<Currency>] {
  return roundf(Math.floor, format, d)
}

export function round<Currency extends Currencies, Unit extends Units<Currency>>(
  format: Format<Currency, Unit>,
  d: Dense<Currency>
): [Discrete<Currency, Unit>, Dense<Currency>] {
  return roundf(Math.round, format, d)
}

export function ceil<Currency extends Currencies, Unit extends Units<Currency>>(
  format: Format<Currency, Unit>,
  d: Dense<Currency>
): [Discrete<Currency, Unit>, Dense<Currency>] {
  return roundf(Math.ceil, format, d)
}

export function trunc<Currency extends Currencies, Unit extends Units<Currency>>(
  format: Format<Currency, Unit>,
  d: Dense<Currency>
): [Discrete<Currency, Unit>, Dense<Currency>] {
  return roundf(Math.trunc, format, d)
}

export const add: <Currency>(x: Dense<Currency>, y: Dense<Currency>) => Dense<Currency> = rational.add as any

export const zero: Dense<never> = rational.zero as any

export const mul: <Currency>(x: Dense<Currency>, y: Rational) => Dense<Currency> = rational.mul as any

export const one: Dense<never> = rational.one as any

export const sub: <Currency>(x: Dense<Currency>, y: Dense<Currency>) => Dense<Currency> = rational.sub as any

export const div: <Currency>(x: Dense<Currency>, y: Rational) => Dense<Currency> = rational.div as any

export const getSetoid = <Currency>(): Setoid<Dense<Currency>> => rational.setoidRational as any

export const getOrd = <Currency>(): Ord<Dense<Currency>> => rational.ordRational as any
