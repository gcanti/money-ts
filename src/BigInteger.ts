import { unsafeCoerce } from 'newtype-ts'
import { Option, some, none } from 'fp-ts/lib/Option'
import * as BigInteger from 'big-integer'

export const wrap = (x: number | string): Option<BigInteger.BigInteger> => {
  try {
    return some(BigInteger(unsafeCoerce(x)))
  } catch (e) {
    return none
  }
}

export const one = BigInteger.one

export const zero = BigInteger.zero

export const gcd = (x: BigInteger.BigInteger, y: BigInteger.BigInteger): BigInteger.BigInteger => BigInteger.gcd(x, y)

export const lcm = (x: BigInteger.BigInteger, y: BigInteger.BigInteger): BigInteger.BigInteger => BigInteger.lcm(x, y)
