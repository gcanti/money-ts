import { Newtype } from 'newtype-ts'
import { Option, none, some } from 'fp-ts/Option'
import { Eq } from 'fp-ts/Eq'
import { Ord } from 'fp-ts/Ord'
import { BigInteger } from 'big-integer'
import { Natural } from './Natural'
import * as I from './Integer'
import * as BI from './BigInteger'
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
  return fromInteger(I.wrap(x))
}

export const unwrap: (x: NonZeroInteger) => BigInteger = unsafeCoerce

export function fromInteger(i: I.Integer): Option<NonZeroInteger> {
  return I.isZero(i) ? none : some(unsafeCoerce(i))
}

export const add: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = unsafeCoerce(I.add)

export const mul: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = unsafeCoerce(I.mul)

export const one: NonZeroInteger = unsafeCoerce(I.one)

export const negate: (x: NonZeroInteger) => NonZeroInteger = unsafeCoerce(I.negate)

export function sub(x: NonZeroInteger, y: NonZeroInteger): Option<NonZeroInteger> {
  return fromInteger(I.sub(x, y))
}

export const div: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = unsafeCoerce(I.div)

export const sign: (x: NonZeroInteger) => -1 | 1 = unsafeCoerce(I.sign)

export function gcd(x: I.Integer, y: NonZeroInteger): Natural {
  return unsafeCoerce(BI.gcd(I.unwrap(x), unwrap(y)))
}

export function lcm(x: NonZeroInteger, y: NonZeroInteger): Natural {
  return unsafeCoerce(BI.lcm(unwrap(x), unwrap(y)))
}

export const isPositive: (x: NonZeroInteger) => boolean = I.isPositive

export function abs(x: NonZeroInteger): Natural {
  return unsafeCoerce(!isPositive(x) ? negate(x) : x)
}

export const eq: Eq<NonZeroInteger> = I.eq

export const ord: Ord<NonZeroInteger> = I.ord

export const show: (x: NonZeroInteger) => string = I.show
