import { Newtype, unsafeCoerce } from 'newtype-ts'
import { Option, none, some } from 'fp-ts/lib/Option'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Integer } from './Integer'
import { BigInteger } from 'big-integer'
import * as integer from './Integer'
import * as bigInteger from './BigInteger'

/** A NonZeroInteger is also an Integer */
export interface NonZeroInteger
  extends Newtype<
      {
        Integer: true
        NonZeroInteger: true
      },
      BigInteger
    > {}

export function fromInput(x: number | string): Option<NonZeroInteger> {
  return bigInteger.wrap(x).chain(wrap)
}

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

const unsafeWrap: (x: BigInteger) => NonZeroInteger = unsafeCoerce(integer.wrap)

export function gcd(x: Integer, y: NonZeroInteger): NonZeroInteger {
  return unsafeWrap(bigInteger.gcd(integer.unwrap(x), unwrap(y)))
}

export function lcm(x: NonZeroInteger, y: NonZeroInteger): NonZeroInteger {
  return unsafeWrap(bigInteger.lcm(unwrap(x), unwrap(y)))
}

export const setoid: Setoid<NonZeroInteger> = unsafeCoerce(integer.setoid)

export const ord: Ord<NonZeroInteger> = unsafeCoerce(integer.ord)

export const show: (x: NonZeroInteger) => string = unsafeCoerce(integer.show)
