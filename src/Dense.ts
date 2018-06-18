import { Rational } from './Rational'
import { Integer } from './Integer'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Discrete, Format } from './Discrete'
import { Dimensions, Units, scale } from './Scale'
import { NonZeroRational } from './NonZeroRational'
import { PositiveRational } from './PositiveRational'
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
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `${this.dimension} ${rational.show(this.value)}`
  }
}

export function fromInteger<D extends string>(d: D, i: Integer): Dense<D> {
  return new Dense(d, rational.fromInteger(i))
}

export function getZero<D extends string>(d: D): Dense<D> {
  return new Dense(d, rational.zero)
}

export function getOne<D extends string>(d: D): Dense<D> {
  return new Dense(d, rational.one)
}

export function getSetoid<D extends string>(): Setoid<Dense<D>> {
  return {
    equals: (x, y) => rational.setoid.equals(x.value, y.value)
  }
}

export function getOrd<D extends string>(): Ord<Dense<D>> {
  return {
    ...getSetoid(),
    compare: (x, y) => rational.ord.compare(x.value, y.value)
  }
}

export function getScale<D extends Dimensions, U extends Units<D>>(format: Format<D, U>): PositiveRational {
  return scale[format.dimension][format.unit] as any
}

export function fromDiscrete<D extends Dimensions, U extends Units<D>>(d: Discrete<D, U>): Dense<D> {
  const [ns, ds] = getScale(d.format)
  return new Dense(d.format.dimension, [integer.mul(d.value, ds), ns])
}

/** Internal. Used to implement `round`, `ceil`, `floor` and `trunc` */
function roundf<D extends Dimensions, U extends Units<D>>(
  f: (n: Rational) => Integer,
  unit: U,
  d: Dense<D>
): [Discrete<D, U>, Dense<D>] {
  const format: Format<D, U> = { dimension: d.dimension, unit }
  const input: Rational = d.value
  const scale: PositiveRational = getScale(format)
  const result: Integer = f(rational.mul(input, scale))
  const scaledResult: Rational = [integer.mul(result, scale[1]), scale[0]]
  return [new Discrete(format, result), new Dense(d.dimension, rational.sub(input, scaledResult))]
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
