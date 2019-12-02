import * as BI from 'big-integer'
import { Option, tryCatch } from 'fp-ts/lib/Option'
import { fromCompare, Ord } from 'fp-ts/lib/Ord'
import { Ring } from 'fp-ts/lib/Ring'

import BigInteger = BI.BigInteger

/**
 * @since 0.1.2
 */
export function wrap(x: number | string): Option<BigInteger> {
  return tryCatch(() => BI(x as any))
}

/**
 * @since 0.1.2
 */
export const zero: BigInteger = BI.zero

/**
 * @since 0.1.2
 */
export const one: BigInteger = BI.one

/**
 * @since 0.1.2
 */
export const two: BigInteger = BI['2']

/**
 * @since 0.1.2
 */
export function add(x: BigInteger, y: BigInteger): BigInteger {
  return x.add(y)
}

/**
 * @since 0.1.2
 */
export function mul(x: BigInteger, y: BigInteger): BigInteger {
  return x.multiply(y)
}

/**
 * @since 0.1.2
 */
export function negate(x: BigInteger): BigInteger {
  return x.negate()
}

/**
 * @since 0.1.2
 */
export function sub(x: BigInteger, y: BigInteger): BigInteger {
  return x.subtract(y)
}

/**
 * @since 0.1.2
 */
export function gcd(x: BigInteger, y: BigInteger): BigInteger {
  return BI.gcd(x, y)
}

/**
 * @since 0.1.2
 */
export function lcm(x: BigInteger, y: BigInteger): BigInteger {
  return BI.lcm(x, y)
}

/**
 * @since 0.1.2
 */
export const ord: Ord<BigInteger> = fromCompare((x, y) => x.compare(y) as any)

/**
 * @since 0.1.2
 */
export const ring: Ring<BigInteger> = {
  add: (x, y) => add(x, y),
  zero: zero,
  mul: (x, y) => mul(x, y),
  one: one,
  sub: (x, y) => sub(x, y)
}
