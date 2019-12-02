import { unsafeCoerce } from 'fp-ts/lib/function'
import { lt, Ord } from 'fp-ts/lib/Ord'
import { Ordering } from 'fp-ts/lib/Ordering'
import { Ring } from 'fp-ts/lib/Ring'
import { Newtype } from 'newtype-ts'
import * as BI from './bigint'
import { NonZeroInteger } from './NonZeroInteger'

/**
 * @since 0.1.2
 */
export interface Integer extends Newtype<{ Integer: true }, bigint> {}

/**
 * @since 0.2.0
 */
export const wrap: (x: bigint) => Integer = unsafeCoerce

/**
 * @since 0.2.0
 */
export const unwrap: (x: Integer) => bigint = unsafeCoerce

/**
 * @since 0.1.2
 */
export function add(x: Integer, y: Integer): Integer {
  return wrap(unwrap(x) + unwrap(y))
}

/**
 * @since 0.1.2
 */
export function mul(x: Integer, y: Integer): Integer {
  return wrap(unwrap(x) * unwrap(y))
}

/**
 * @since 0.1.2
 */
export const one: Integer = wrap(1n)

/**
 * @since 0.1.2
 */
export function negate(x: Integer): Integer {
  return wrap(unwrap(x) * -1n)
}

/**
 * @since 0.1.2
 */
export function sub(x: Integer, y: Integer): Integer {
  return wrap(unwrap(x) - unwrap(y))
}

/**
 * @since 0.1.2
 */
export const zero: Integer = wrap(0n)

/**
 * @since 0.1.2
 */
export function div(x: Integer, y: NonZeroInteger): Integer {
  return ((x as any) / (y as any)) as any
  // return wrap(unwrap(x) / unwrap(y))
}

/**
 * @since 0.1.2
 */
export const isZero = (x: Integer): boolean => integer.equals(zero, x)

/**
 * @since 0.1.2
 */
export function sign(x: Integer): Ordering {
  return BI.bigInt.compare(unwrap(x), 0n)
}

/**
 * @since 0.2.0
 */
export const integer: Ord<Integer> & Ring<Integer> = unsafeCoerce(BI.bigInt)

const lessThanO = lt(integer)

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
