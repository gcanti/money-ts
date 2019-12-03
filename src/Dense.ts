import { fromCompare, Ord } from 'fp-ts/lib/Ord'
import { Discrete, Format } from './Discrete'
import * as I from './Integer'
import { NonZeroRational } from './NonZeroRational'
import { PositiveRational } from './PositiveRational'
import * as R from './Rational'
import { Dimensions, scale, Units } from './Scale'

import Rational = R.Rational
import Integer = I.Integer

/**
 * @since 0.1.2
 */
export class Dense<D extends string> {
  constructor(readonly dimension: D, readonly value: Rational) {}
  /**
   * @since 0.1.2
   */
  isZero(): boolean {
    return R.isZero(this.value)
  }
  /**
   * @since 0.2.0
   */
  modify(f: (r: Rational) => Rational): Dense<D> {
    return new Dense(this.dimension, f(this.value))
  }
  /**
   * @since 0.1.2
   */
  add(y: Dense<D>): Dense<D> {
    return this.modify(value => R.add(value, y.value))
  }
  /**
   * @since 0.1.2
   */
  mul(y: Rational): Dense<D> {
    return this.modify(value => R.mul(value, y))
  }
  /**
   * @since 0.1.2
   */
  negate(): Dense<D> {
    return this.modify(R.negate)
  }
  /**
   * @since 0.1.2
   */
  sub(y: Dense<D>): Dense<D> {
    return this.modify(value => R.sub(value, y.value))
  }
  /**
   * @since 0.1.2
   */
  div(y: NonZeroRational): Dense<D> {
    return this.modify(value => R.div(value, y))
  }
  /**
   * @since 0.1.2
   */
  toString(): string {
    return `${this.dimension} ${R.show(this.value)}`
  }
}

/**
 * @since 0.1.2
 */
export function fromInteger<D extends string>(d: D, i: Integer): Dense<D> {
  return new Dense(d, R.fromInteger(i))
}

/**
 * @since 0.1.2
 */
export function getZero<D extends string>(d: D): Dense<D> {
  return new Dense(d, R.zero)
}

/**
 * @since 0.1.2
 */
export function getOne<D extends string>(d: D): Dense<D> {
  return new Dense(d, R.one)
}

/**
 * @since 0.1.2
 */
export function getOrd<D extends string>(): Ord<Dense<D>> {
  return fromCompare((x, y) => R.ord.compare(x.value, y.value))
}

/**
 * @since 0.1.2
 */
export function getScale<D extends Dimensions, U extends Units<D>>(format: Format<D, U>): PositiveRational {
  return scale[format.dimension][format.unit] as any
}

/**
 * @since 0.1.2
 */
export function fromDiscrete<D extends Dimensions, U extends Units<D>>(d: Discrete<D, U>): Dense<D> {
  const [ns, ds] = getScale(d.format)
  return new Dense(d.format.dimension, [I.mul(d.value, ds), ns])
}

/**
 * Internal. Used to implement `round`, `ceil`, `floor` and `trunc`
 */
function roundf<D extends Dimensions, U extends Units<D>>(
  f: (n: Rational) => Integer,
  unit: U,
  d: Dense<D>
): [Discrete<D, U>, Dense<D>] {
  const format: Format<D, U> = { dimension: d.dimension, unit }
  const input: Rational = d.value
  const scale: PositiveRational = getScale(format)
  const result: Integer = f(R.mul(input, scale))
  const scaledResult: Rational = [I.mul(result, scale[1]), scale[0]]
  return [new Discrete(format, result), new Dense(d.dimension, R.sub(input, scaledResult))]
}

/**
 * @since 0.1.2
 */
export function floor<D extends Dimensions, U extends Units<D>>(unit: U, d: Dense<D>): [Discrete<D, U>, Dense<D>] {
  return roundf(R.floor, unit, d)
}

/**
 * @since 0.1.2
 */
export function round<D extends Dimensions, U extends Units<D>>(unit: U, d: Dense<D>): [Discrete<D, U>, Dense<D>] {
  return roundf(R.round, unit, d)
}

/**
 * @since 0.1.2
 */
export function ceil<D extends Dimensions, U extends Units<D>>(unit: U, d: Dense<D>): [Discrete<D, U>, Dense<D>] {
  return roundf(R.ceil, unit, d)
}

/**
 * @since 0.1.2
 */
export function trunc<D extends Dimensions, U extends Units<D>>(unit: U, d: Dense<D>): [Discrete<D, U>, Dense<D>] {
  return roundf(R.trunc, unit, d)
}
