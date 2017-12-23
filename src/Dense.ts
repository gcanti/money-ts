import { Newtype } from 'newtype-ts'
import { Rational } from './Rational'
import { Integer } from './Integer'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Discrete } from './Discrete'
import { Dimensions, Units, scale } from './Scale'
import { NonZeroRational } from './NonZeroRational'
import * as rational from './Rational'
import * as integer from './Integer'
import * as discrete from './Discrete'

export interface Dense<D> extends Newtype<['Dense', D], Rational> {}

export function wrap<D>(r: Rational): Dense<D> {
  return r as any
}

export function unwrap<D>(d: Dense<D>): Rational {
  return d as any
}

export const fromInteger: <D>(n: Integer) => Dense<D> = rational.fromInteger as any

export const isZero: <D>(n: Dense<D>) => boolean = rational.isZero as any

export const add: <D>(x: Dense<D>, y: Dense<D>) => Dense<D> = rational.add as any

export const zero: Dense<never> = rational.zero as any

export const mul: <D>(x: Dense<D>, y: Rational) => Dense<D> = rational.mul as any

export const one: Dense<never> = rational.one as any

export const negate: <D>(x: Dense<D>) => Dense<D> = rational.negate as any

export const sub: <D>(x: Dense<D>, y: Dense<D>) => Dense<D> = rational.sub as any

export const div: <D>(x: Dense<D>, y: NonZeroRational) => Dense<D> = rational.div as any

export const getSetoid = <D>(): Setoid<Dense<D>> => rational.setoid as any

export const getOrd = <D>(): Ord<Dense<D>> => rational.ord as any

export interface Format<D extends Dimensions, U extends Units<D>> {
  dimension: D
  unit: U
}

export function getScale<D extends Dimensions, Unit extends Units<D>>(format: Format<D, Unit>): NonZeroRational {
  return scale[format.dimension][format.unit]
}

export function fromDiscrete<D extends Dimensions, Unit extends Units<D>>(
  format: Format<D, Unit>
): (d: Discrete<D, Unit>) => Dense<D> {
  return d => {
    const [ns, ds] = getScale(format)
    return wrap([integer.mul(discrete.unwrap(d), ds), ns])
  }
}

/** Internal. Used to implement `round`, `ceiling`, `floor` and `truncate` */
export function roundf<D extends Dimensions, Unit extends Units<D>>(
  f: (n: Rational) => Integer,
  format: Format<D, Unit>,
  d: Dense<D>
): [Discrete<D, Unit>, Dense<D>] {
  const r0 = unwrap(d)
  const scale = getScale(format)
  const r2 = rational.mul(r0, scale)
  const i2 = f(r2)
  const r3: Rational = [integer.mul(i2, scale[1]), scale[0]]
  return [discrete.wrap(i2), wrap(rational.sub(r0, r3))]
}

export function floor<D extends Dimensions, Unit extends Units<D>>(
  format: Format<D, Unit>
): (d: Dense<D>) => [Discrete<D, Unit>, Dense<D>] {
  return d => roundf(rational.floor, format, d)
}

export function round<D extends Dimensions, Unit extends Units<D>>(
  format: Format<D, Unit>
): (d: Dense<D>) => [Discrete<D, Unit>, Dense<D>] {
  return d => roundf(rational.round, format, d)
}

export function ceil<D extends Dimensions, Unit extends Units<D>>(
  format: Format<D, Unit>
): (d: Dense<D>) => [Discrete<D, Unit>, Dense<D>] {
  return d => roundf(rational.ceil, format, d)
}

export function trunc<D extends Dimensions, Unit extends Units<D>>(
  format: Format<D, Unit>
): (d: Dense<D>) => [Discrete<D, Unit>, Dense<D>] {
  return d => roundf(rational.trunc, format, d)
}

export const show: <D>(x: Dense<D>) => string = rational.show as any
