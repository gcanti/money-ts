import { Integer } from './Integer'
import { Eq } from 'fp-ts/Eq'
import { Ord } from 'fp-ts/Ord'
import { Discrete, Format } from './Discrete'
import { Dimensions, Units, scale } from './Scale'
import { NonZeroRational } from './NonZeroRational'
import { PositiveRational } from './PositiveRational'
import * as R from './Rational'
import * as I from './Integer'

export class Dense<D extends string> {
  constructor(readonly dimension: D, readonly value: R.Rational) {}
  isZero(): boolean {
    return R.isZero(this.value)
  }
  add(y: Dense<D>): Dense<D> {
    return new Dense(this.dimension, R.add(this.value, y.value))
  }
  mul(y: R.Rational): Dense<D> {
    return new Dense(this.dimension, R.mul(this.value, y))
  }
  negate(): Dense<D> {
    return new Dense(this.dimension, R.negate(this.value))
  }
  sub(y: Dense<D>): Dense<D> {
    return new Dense(this.dimension, R.sub(this.value, y.value))
  }
  div(y: NonZeroRational): Dense<D> {
    return new Dense(this.dimension, R.div(this.value, y))
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `${this.dimension} ${R.show(this.value)}`
  }
}

export function fromInteger<D extends string>(d: D, i: Integer): Dense<D> {
  return new Dense(d, R.fromInteger(i))
}

export function getZero<D extends string>(d: D): Dense<D> {
  return new Dense(d, R.zero)
}

export function getOne<D extends string>(d: D): Dense<D> {
  return new Dense(d, R.one)
}

export function getEq<D extends string>(): Eq<Dense<D>> {
  return {
    equals: (x, y) => R.eq.equals(x.value, y.value)
  }
}

export function getOrd<D extends string>(): Ord<Dense<D>> {
  return {
    ...getEq(),
    compare: (x, y) => R.ord.compare(x.value, y.value)
  }
}

export function getScale<D extends Dimensions, U extends Units<D>>(format: Format<D, U>): PositiveRational {
  return scale[format.dimension][format.unit] as any
}

export function fromDiscrete<D extends Dimensions, U extends Units<D>>(d: Discrete<D, U>): Dense<D> {
  const [ns, ds] = getScale(d.format)
  return new Dense(d.format.dimension, [I.mul(d.value, ds), ns])
}

/** Internal. Used to implement `round`, `ceil`, `floor` and `trunc` */
function roundf<D extends Dimensions, U extends Units<D>>(
  f: (n: R.Rational) => Integer,
  unit: U,
  d: Dense<D>
): [Discrete<D, U>, Dense<D>] {
  const format: Format<D, U> = { dimension: d.dimension, unit }
  const input: R.Rational = d.value
  const scale: PositiveRational = getScale(format)
  const result: Integer = f(R.mul(input, scale))
  const scaledResult: R.Rational = [I.mul(result, scale[1]), scale[0]]
  return [new Discrete(format, result), new Dense(d.dimension, R.sub(input, scaledResult))]
}

export function floor<D extends Dimensions, U extends Units<D>>(unit: U, d: Dense<D>): [Discrete<D, U>, Dense<D>] {
  return roundf(R.floor, unit, d)
}

export function round<D extends Dimensions, U extends Units<D>>(unit: U, d: Dense<D>): [Discrete<D, U>, Dense<D>] {
  return roundf(R.round, unit, d)
}

export function ceil<D extends Dimensions, U extends Units<D>>(unit: U, d: Dense<D>): [Discrete<D, U>, Dense<D>] {
  return roundf(R.ceil, unit, d)
}

export function trunc<D extends Dimensions, U extends Units<D>>(unit: U, d: Dense<D>): [Discrete<D, U>, Dense<D>] {
  return roundf(R.trunc, unit, d)
}
