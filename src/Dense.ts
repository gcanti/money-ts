import { Newtype } from 'newtype-ts'
import { Rational } from './Rational'
import * as rational from './Rational'
import { Integer } from './Integer'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Discrete } from './Discrete'
import { Currencies, Units, scale } from './Scale'

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

export function fromDiscrete<Currency extends Currencies, Unit extends Units<Currency>>(
  d: Discrete<Currency, Unit>,
  currency: Currency,
  unit: Unit
): Dense<Currency> {
  const [sn, sd] = scale[currency][unit]
  return [(d as any) * sd, sn] as any
}

export const add: <Currency>(x: Dense<Currency>, y: Dense<Currency>) => Dense<Currency> = rational.add as any

export const zero: Dense<never> = rational.zero as any

export const mul: <Currency>(x: Dense<Currency>, y: Rational) => Dense<Currency> = rational.mul as any

export const one: Dense<never> = rational.one as any

export const sub: <Currency>(x: Dense<Currency>, y: Dense<Currency>) => Dense<Currency> = rational.sub as any

export const div: <Currency>(x: Dense<Currency>, y: Rational) => Dense<Currency> = rational.div as any

export const getSetoid = <Currency>(): Setoid<Dense<Currency>> => rational.setoidRational as any

export const getOrd = <Currency>(): Ord<Dense<Currency>> => rational.ordRational as any
