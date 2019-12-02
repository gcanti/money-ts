import { BigInteger } from 'big-integer'
import { unsafeCoerce } from 'fp-ts/lib/function'
import { lt, Ord } from 'fp-ts/lib/Ord'
import { Ring } from 'fp-ts/lib/Ring'
import { Newtype } from 'newtype-ts'
import * as bigInteger from './BigInteger'
import { NonZeroInteger } from './NonZeroInteger'

/**
 * @since 0.1.2
 */
export interface Integer extends Newtype<{ Integer: true }, BigInteger> {}

/**
 * @since 0.1.2
 */
export const wrap: (x: BigInteger) => Integer = unsafeCoerce

/**
 * @since 0.1.2
 */
export const unwrap: (x: Integer) => BigInteger = unsafeCoerce

/**
 * @since 0.1.2
 */
export const add: (x: Integer, y: Integer) => Integer = unsafeCoerce(bigInteger.add)

/**
 * @since 0.1.2
 */
export const mul: (x: Integer, y: Integer) => Integer = unsafeCoerce(bigInteger.mul)

/**
 * @since 0.1.2
 */
export const one: Integer = wrap(bigInteger.one)

/**
 * @since 0.1.2
 */
export const negate: (x: Integer) => Integer = unsafeCoerce(bigInteger.negate)

/**
 * @since 0.1.2
 */
export const sub: (x: Integer, y: Integer) => Integer = unsafeCoerce(bigInteger.sub)

/**
 * @since 0.1.2
 */
export const zero: Integer = wrap(bigInteger.zero)

/**
 * @since 0.1.2
 */
export function div(x: Integer, y: NonZeroInteger): Integer {
  return wrap(unwrap(x).divide(unwrap(y)))
}

/**
 * @since 0.1.2
 */
export const isZero = (x: Integer): boolean => ord.equals(zero, x)

/**
 * @since 0.1.2
 */
export function sign(x: Integer): -1 | 0 | 1 {
  return unsafeCoerce(unwrap(x).compare(bigInteger.zero))
}

/**
 * @since 0.1.2
 */
export const ord: Ord<Integer> = unsafeCoerce(bigInteger.ord)

const lessThanO = lt(ord)

/**
 * @since 0.1.2
 */
export const isPositive = (x: Integer): boolean => lessThanO(zero, x)

/**
 * @since 0.1.2
 */
export function show(x: Integer): string {
  return unwrap(x).toString()
}

/**
 * @since 0.1.2
 */
export const ring: Ring<Integer> = unsafeCoerce(bigInteger.ring)
