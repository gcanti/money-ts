import { Ord, fromCompare } from 'fp-ts/lib/Ord'
import { Ring } from 'fp-ts/lib/Ring'
import { tryCatch, Option } from 'fp-ts/lib/Option'

/**
 * @since 0.2.0
 */
export function make(s: string): Option<bigint> {
  return tryCatch(() => BigInt(s))
}

/**
 * @since 0.2.0
 */
export function gcd(x: bigint, y: bigint): bigint {
  return y === 0n ? x : gcd(y, x % y)
}

/**
 * @since 0.2.0
 */
export function lcm(x: bigint, y: bigint): bigint {
  return (x * y) / gcd(x, y)
}

/**
 * @since 0.2.0
 */
export const bigInt: Ord<bigint> & Ring<bigint> = {
  ...fromCompare((x, y) => (x < y ? -1 : x > y ? 1 : 0)),
  add: (x, y) => x + y,
  zero: 0n,
  mul: (x, y) => x * y,
  one: 1n,
  sub: (x, y) => x - y
}
