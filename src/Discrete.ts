import { fromCompare, Ord } from 'fp-ts/lib/Ord'
import * as I from './Integer'
import { NonZeroInteger } from './NonZeroInteger'

import Integer = I.Integer

/**
 * @since 0.1.2
 */
export interface Format<D extends string, U extends string | number | symbol> {
  dimension: D
  unit: U
}

/**
 * @since 0.1.2
 */
export class Discrete<D extends string, U extends string | number | symbol> {
  constructor(readonly format: Format<D, U>, readonly value: Integer) {}
  /**
   * @since 0.1.2
   */
  add(y: Discrete<D, U>): Discrete<D, U> {
    return new Discrete(this.format, I.add(this.value, y.value))
  }
  /**
   * @since 0.1.2
   */
  mul(y: Integer): Discrete<D, U> {
    return new Discrete(this.format, I.mul(this.value, y))
  }
  /**
   * @since 0.1.2
   */
  negate(): Discrete<D, U> {
    return new Discrete(this.format, I.negate(this.value))
  }
  /**
   * @since 0.1.2
   */
  sub(y: Discrete<D, U>): Discrete<D, U> {
    return new Discrete(this.format, I.sub(this.value, y.value))
  }
  /**
   * @since 0.1.2
   */
  div(y: NonZeroInteger): Discrete<D, U> {
    return new Discrete(this.format, I.div(this.value, y))
  }
  /**
   * @since 0.1.2
   */
  isZero(): boolean {
    return I.isZero(this.value)
  }
  /**
   * @since 0.1.2
   */
  toString(): string {
    return `${this.format.dimension} ${this.format.unit} ${I.show(this.value)}`
  }
}

/**
 * @since 0.1.2
 */
export function getOne<D extends string, U extends string>(format: Format<D, U>): Discrete<D, U> {
  return new Discrete(format, I.one)
}

/**
 * @since 0.1.2
 */
export function getZero<D extends string, U extends string>(format: Format<D, U>): Discrete<D, U> {
  return new Discrete(format, I.zero)
}

/**
 * @since 0.1.2
 */
export function getOrd<D extends string, U extends string>(): Ord<Discrete<D, U>> {
  return fromCompare((x, y) => I.ord.compare(x.value, y.value))
}
