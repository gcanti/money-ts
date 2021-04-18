import { Newtype } from 'newtype-ts'
import { Option, none, some } from 'fp-ts/Option'
import * as EQ from 'fp-ts/Eq'
import * as ORD from 'fp-ts/Ord'
import { Integer } from './Integer'
import { BigInteger } from 'big-integer'
import { NonZeroInteger } from './NonZeroInteger'
import * as integer from './Integer'
import * as nonZeroInteger from './NonZeroInteger'
import { unsafeCoerce } from 'fp-ts/function'

/** A PositiveInteger is also an Integer */
export interface Natural
  extends Newtype<
    {
      Integer: true
      NonZero: true
      Positive: true
    },
    BigInteger
  > {}

export function wrap(x: BigInteger): Option<Natural> {
  return fromInteger(integer.wrap(x))
}

export const unwrap: (x: Natural) => BigInteger = unsafeCoerce

export function fromInteger(i: Integer): Option<Natural> {
  return integer.isPositive(i) ? some(unsafeCoerce(i)) : none
}

export const add: (x: Natural, y: Natural) => Natural = unsafeCoerce(integer.add)

export const mul: (x: Natural, y: Natural) => Natural = unsafeCoerce(integer.mul)

export function sub(x: Natural, y: Natural): Option<Natural> {
  return fromInteger(integer.sub(x, y))
}

export const negate: (x: Natural) => NonZeroInteger = unsafeCoerce(integer.negate)

export const div: (x: Natural, y: Natural) => Natural = unsafeCoerce(integer.div)

export const gcd: (x: Natural, y: Natural) => Natural = nonZeroInteger.gcd

export const lcm: (x: Natural, y: Natural) => Natural = nonZeroInteger.lcm

export const Eq: EQ.Eq<Natural> = integer.Eq

export const Ord: ORD.Ord<Natural> = integer.Ord

export const show: (x: Natural) => string = integer.show

export const one: Natural = unsafeCoerce(integer.one)
