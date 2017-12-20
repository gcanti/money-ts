import { Newtype } from 'newtype-ts'
import { Rational } from './Rational'
import { Integer } from './Integer'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Discrete } from './Discrete'
import { Dimensions, Units, scale } from './Scale'
import { NonZeroRational } from './NonZeroRational'
import * as rational from './Rational'

export interface Dense<Dimension> extends Newtype<['Dense', Dimension], Rational> {}

export function fromRational<Dimension>(r: Rational): Dense<Dimension> {
  return r as any
}

export function toRational<Dimension>(d: Dense<Dimension>): Rational {
  return d as any
}

export function fromInteger<Dimension>(n: Integer): Dense<Dimension> {
  return fromRational(rational.fromInteger(n))
}

export const simplify: <Dimension>(d: Dense<Dimension>) => Dense<Dimension> = rational.simplify as any

export function getScale<Dimension extends Dimensions, Unit extends Units<Dimension>>(
  format: Format<Dimension, Unit>
): NonZeroRational {
  return scale[format.dimension][format.unit]
}

export interface Format<Dimension extends Dimensions, Unit extends Units<Dimension>> {
  dimension: Dimension
  unit: Unit
}

export function fromDiscrete<Dimension extends Dimensions, Unit extends Units<Dimension>>(
  format: Format<Dimension, Unit>,
  d: Discrete<Dimension, Unit>
): Dense<Dimension> {
  const [sn, sd] = getScale(format) as any
  return [(d as any) * (sd as any), sn] as any
}

/** Internal. Used to implement `round`, `ceiling`, `floor` and `truncate` */
function roundf<Dimension extends Dimensions, Unit extends Units<Dimension>>(
  f: (n: number) => number,
  format: Format<Dimension, Unit>,
  c0: Dense<Dimension>
): [Discrete<Dimension, Unit>, Dense<Dimension>] {
  const r1: [number, number] = getScale(format) as any
  const r2: [number, number] = rational.mul(c0 as any, r1 as any) as any
  const i2 = f(r2[0] / r2[1])
  const r3 = [i2 * r1[1], r1[0]]
  return [i2, rational.sub(c0 as any, r3 as any)] as any
}

export function floor<Dimension extends Dimensions, Unit extends Units<Dimension>>(
  format: Format<Dimension, Unit>,
  d: Dense<Dimension>
): [Discrete<Dimension, Unit>, Dense<Dimension>] {
  return roundf(Math.floor, format, d)
}

export function round<Dimension extends Dimensions, Unit extends Units<Dimension>>(
  format: Format<Dimension, Unit>,
  d: Dense<Dimension>
): [Discrete<Dimension, Unit>, Dense<Dimension>] {
  return roundf(Math.round, format, d)
}

export function ceil<Dimension extends Dimensions, Unit extends Units<Dimension>>(
  format: Format<Dimension, Unit>,
  d: Dense<Dimension>
): [Discrete<Dimension, Unit>, Dense<Dimension>] {
  return roundf(Math.ceil, format, d)
}

export function trunc<Dimension extends Dimensions, Unit extends Units<Dimension>>(
  format: Format<Dimension, Unit>,
  d: Dense<Dimension>
): [Discrete<Dimension, Unit>, Dense<Dimension>] {
  return roundf(Math.trunc, format, d)
}

export const add: <Dimension>(x: Dense<Dimension>, y: Dense<Dimension>) => Dense<Dimension> = rational.add as any

export const zero: Dense<never> = rational.zero as any

export const mul: <Dimension>(x: Dense<Dimension>, y: Rational) => Dense<Dimension> = rational.mul as any

export const one: Dense<never> = rational.one as any

export const sub: <Dimension>(x: Dense<Dimension>, y: Dense<Dimension>) => Dense<Dimension> = rational.sub as any

export const div: <Dimension>(x: Dense<Dimension>, y: NonZeroRational) => Dense<Dimension> = rational.div as any

export const getSetoid = <Dimension>(): Setoid<Dense<Dimension>> => rational.setoidRational as any

export const getOrd = <Dimension>(): Ord<Dense<Dimension>> => rational.ordRational as any
