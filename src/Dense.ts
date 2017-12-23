import { Rational } from './Rational'
import { Integer } from './Integer'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Discrete, Format } from './Discrete'
import { Dimensions, Units, scale } from './Scale'
import { NonZeroRational } from './NonZeroRational'
import * as rational from './Rational'
import * as integer from './Integer'

export class Dense<D extends string> {
  constructor(readonly dimension: D, readonly value: Rational) {}
  isZero(): boolean {
    return rational.isZero(this.value)
  }
  add(y: Dense<D>): Dense<D> {
    return new Dense(this.dimension, rational.add(this.value, y.value))
  }
  mul(y: Rational): Dense<D> {
    return new Dense(this.dimension, rational.mul(this.value, y))
  }
  negate(): Dense<D> {
    return new Dense(this.dimension, rational.negate(this.value))
  }
  sub(y: Dense<D>): Dense<D> {
    return new Dense(this.dimension, rational.sub(this.value, y.value))
  }
  div(y: NonZeroRational): Dense<D> {
    return new Dense(this.dimension, rational.div(this.value, y))
  }
}

export const fromInteger = <D extends string>(d: D, i: Integer): Dense<D> => new Dense(d, rational.fromInteger(i))

export const getZero = <D extends string>(d: D): Dense<D> => new Dense(d, rational.zero)

export const getOne = <D extends string>(d: D): Dense<D> => new Dense(d, rational.one)

export const getSetoid = <D extends string>(): Setoid<Dense<D>> => ({
  equals: x => y => rational.setoid.equals(x.value)(y.value)
})

export const getOrd = <D extends string>(): Ord<Dense<D>> => ({
  ...getSetoid(),
  compare: x => y => rational.ord.compare(x.value)(y.value)
})

export function getScale<D extends Dimensions, U extends Units<D>>(format: Format<D, U>): NonZeroRational {
  return scale[format.dimension][format.unit]
}

export function fromDiscrete<D extends Dimensions, Unit extends Units<D>>(d: Discrete<D, Unit>): Dense<D> {
  const [ns, ds] = getScale(d.format)
  return new Dense(d.format.dimension, [integer.mul(d.value, ds), ns])
}

/** Internal. Used to implement `round`, `ceiling`, `floor` and `trunc` */
function roundf<D extends Dimensions, U extends Units<D>>(
  f: (n: Rational) => Integer,
  unit: U,
  d: Dense<D>
): [Discrete<D, U>, Dense<D>] {
  const format: Format<D, U> = { dimension: d.dimension, unit }
  const r0 = d.value
  const scale = getScale(format)
  const r2 = rational.mul(r0, scale)
  const i2 = f(r2)
  const r3: Rational = [integer.mul(i2, scale[1]), scale[0]]
  return [new Discrete(format, i2), new Dense(d.dimension, rational.sub(r0, r3))]
}

export function floor<D extends Dimensions, U extends Units<D>>(unit: U, d: Dense<D>): [Discrete<D, U>, Dense<D>] {
  return roundf(rational.floor, unit, d)
}

export function round<D extends Dimensions, U extends Units<D>>(unit: U, d: Dense<D>): [Discrete<D, U>, Dense<D>] {
  return roundf(rational.round, unit, d)
}

export function ceil<D extends Dimensions, U extends Units<D>>(unit: U, d: Dense<D>): [Discrete<D, U>, Dense<D>] {
  return roundf(rational.ceil, unit, d)
}

export function trunc<D extends Dimensions, U extends Units<D>>(unit: U, d: Dense<D>): [Discrete<D, U>, Dense<D>] {
  return roundf(rational.trunc, unit, d)
}

export const show = <D extends string>(x: Dense<D>): string => `${x.dimension} ${rational.show(x.value)}`
