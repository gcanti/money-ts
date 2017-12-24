import { unsafeCoerce } from 'newtype-ts'
import { Option, some, none } from 'fp-ts/lib/Option'
import * as BigInteger from 'big-integer'

export function wrap(x: number | string): Option<BigInteger.BigInteger> {
  try {
    return some(BigInteger(unsafeCoerce(x)))
  } catch (e) {
    return none
  }
}

export const one = BigInteger.one

export const zero = BigInteger.zero

export function gcd(x: BigInteger.BigInteger, y: BigInteger.BigInteger): BigInteger.BigInteger {
  return BigInteger.gcd(x, y)
}

export function lcm(x: BigInteger.BigInteger, y: BigInteger.BigInteger): BigInteger.BigInteger {
  return BigInteger.lcm(x, y)
}
