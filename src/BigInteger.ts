import { unsafeCoerce } from 'newtype-ts'
import { Option, some, none } from 'fp-ts/lib/Option'
import { BigInteger } from 'big-integer'
import * as bigInteger from 'big-integer'
import { Ring } from 'fp-ts/lib/Ring'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'

export function wrap(x: number | string): Option<BigInteger> {
  try {
    return some(bigInteger(unsafeCoerce(x)))
  } catch (e) {
    return none
  }
}

export const zero = bigInteger.zero

export const one = bigInteger.one

export const two = bigInteger['2']

export function add(x: BigInteger, y: BigInteger): BigInteger {
  return x.add(y)
}

export function mul(x: BigInteger, y: BigInteger): BigInteger {
  return x.multiply(y)
}

export function negate(x: BigInteger): BigInteger {
  return x.negate()
}

export function sub(x: BigInteger, y: BigInteger): BigInteger {
  return x.subtract(y)
}

export function gcd(x: BigInteger, y: BigInteger): BigInteger {
  return bigInteger.gcd(x, y)
}

export function lcm(x: BigInteger, y: BigInteger): BigInteger {
  return bigInteger.lcm(x, y)
}

export const setoid: Setoid<BigInteger> = {
  equals: (x, y) => x.equals(y)
}

export const ord: Ord<BigInteger> = {
  ...setoid,
  compare: (x, y) => x.compare(y) as any
}

export const ring: Ring<BigInteger> = {
  add: (x, y) => add(x, y),
  zero: zero,
  mul: (x, y) => mul(x, y),
  one: one,
  sub: (x, y) => sub(x, y)
}
