import { Newtype } from 'newtype-ts'
import { Option, none, some } from 'fp-ts/Option'
import { Eq } from 'fp-ts/Eq'
import { Ord } from 'fp-ts/Ord'
import { Integer } from './Integer'
import { BigInteger } from 'big-integer'
import { Natural } from './Natural'
import * as integer from './Integer'
import * as bigInteger from './BigInteger'
import { unsafeCoerce } from 'fp-ts/function'

/** A NonZeroInteger is also an Integer */
export interface NonZeroInteger
  extends Newtype<
    {
      Integer: true
      NonZero: true
    },
    BigInteger
  > {}

export function wrap(x: BigInteger): Option<NonZeroInteger> {
  return fromInteger(integer.wrap(x))
}

export const unwrap: (x: NonZeroInteger) => BigInteger = unsafeCoerce

export function fromInteger(i: Integer): Option<NonZeroInteger> {
  return integer.isZero(i) ? none : some(unsafeCoerce(i))
}

export const add: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = unsafeCoerce(integer.add)

export const mul: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = unsafeCoerce(integer.mul)

export const one: NonZeroInteger = unsafeCoerce(integer.one)

export const negate: (x: NonZeroInteger) => NonZeroInteger = unsafeCoerce(integer.negate)

export function sub(x: NonZeroInteger, y: NonZeroInteger): Option<NonZeroInteger> {
  return fromInteger(integer.sub(x, y))
}

export const div: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = unsafeCoerce(integer.div)

export const sign: (x: NonZeroInteger) => -1 | 1 = unsafeCoerce(integer.sign)

export function gcd(x: Integer, y: NonZeroInteger): Natural {
  return unsafeCoerce(bigInteger.gcd(integer.unwrap(x), unwrap(y)))
}

export function lcm(x: NonZeroInteger, y: NonZeroInteger): Natural {
  return unsafeCoerce(bigInteger.lcm(unwrap(x), unwrap(y)))
}

export const isPositive: (x: NonZeroInteger) => boolean = integer.isPositive

export function abs(x: NonZeroInteger): Natural {
  return unsafeCoerce(!isPositive(x) ? negate(x) : x)
}

export const eq: Eq<NonZeroInteger> = integer.eq

export const ord: Ord<NonZeroInteger> = integer.ord

export const show: (x: NonZeroInteger) => string = integer.show
