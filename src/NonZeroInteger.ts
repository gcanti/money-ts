import { BigInteger } from 'big-integer'
import { unsafeCoerce } from 'fp-ts/lib/function'
import { none, Option, some } from 'fp-ts/lib/Option'
import { Ord } from 'fp-ts/lib/Ord'
import { Newtype } from 'newtype-ts'
import * as BI from './BigInteger'
import * as I from './Integer'
import { Natural } from './Natural'

import Integer = I.Integer

/**
 * @since 0.1.2
 */
export interface NonZeroInteger
  extends Newtype<
    {
      Integer: true
      NonZero: true
    },
    BigInteger
  > {}

/**
 * @since 0.1.2
 */
export function wrap(x: BigInteger): Option<NonZeroInteger> {
  return fromInteger(I.wrap(x))
}

/**
 * @since 0.1.2
 */
export const unwrap: (x: NonZeroInteger) => BigInteger = unsafeCoerce

/**
 * @since 0.1.2
 */
export function fromInteger(i: Integer): Option<NonZeroInteger> {
  return I.isZero(i) ? none : some(unsafeCoerce(i))
}

/**
 * @since 0.1.2
 */
export const add: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = unsafeCoerce(I.add)

/**
 * @since 0.1.2
 */
export const mul: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = unsafeCoerce(I.mul)

/**
 * @since 0.1.2
 */
export const one: NonZeroInteger = unsafeCoerce(I.one)

/**
 * @since 0.1.2
 */
export const negate: (x: NonZeroInteger) => NonZeroInteger = unsafeCoerce(I.negate)

/**
 * @since 0.1.2
 */
export function sub(x: NonZeroInteger, y: NonZeroInteger): Option<NonZeroInteger> {
  return fromInteger(I.sub(x, y))
}

/**
 * @since 0.1.2
 */
export const div: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = unsafeCoerce(I.div)

/**
 * @since 0.1.2
 */
export const sign: (x: NonZeroInteger) => -1 | 1 = unsafeCoerce(I.sign)

/**
 * @since 0.1.2
 */
export function gcd(x: Integer, y: NonZeroInteger): Natural {
  return unsafeCoerce(BI.gcd(I.unwrap(x), unwrap(y)))
}

/**
 * @since 0.1.2
 */
export function lcm(x: NonZeroInteger, y: NonZeroInteger): Natural {
  return unsafeCoerce(BI.lcm(unwrap(x), unwrap(y)))
}

/**
 * @since 0.1.2
 */
export const isPositive: (x: NonZeroInteger) => boolean = I.isPositive

/**
 * @since 0.1.2
 */
export function abs(x: NonZeroInteger): Natural {
  return unsafeCoerce(!isPositive(x) ? negate(x) : x)
}

/**
 * @since 0.1.2
 */
export const ord: Ord<NonZeroInteger> = I.ord

/**
 * @since 0.1.2
 */
export const show: (x: NonZeroInteger) => string = I.show
