import { Newtype, unsafeCoerce } from 'newtype-ts'
import { Option, none, some } from 'fp-ts/lib/Option'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Integer } from './Integer'
import { BigInteger } from 'big-integer'
import * as integer from './Integer'
import * as nonZeroInteger from './NonZeroInteger'
import * as bigInteger from './BigInteger'

/** A PositiveInteger is also an Integer */
export interface Natural
  extends Newtype<
      {
        Integer: true
        Positive: true
      },
      BigInteger
    > {}

export function fromInput(x: number | string): Option<Natural> {
  return bigInteger.wrap(x).chain(wrap)
}

export function wrap(x: BigInteger): Option<Natural> {
  return fromInteger(integer.wrap(x))
}

export const unwrap: (x: Natural) => BigInteger = unsafeCoerce

export function fromInteger(i: Integer): Option<Natural> {
  return integer.isPositive(i) ? some(unsafeCoerce(i)) : none
}

export const add: (x: Natural, y: Natural) => Natural = unsafeCoerce(integer.add)

export const mul: (x: Natural, y: Natural) => Natural = unsafeCoerce(integer.mul)

export const one: Natural = unsafeCoerce(integer.one)

export function sub(x: Natural, y: Natural): Option<Natural> {
  return fromInteger(integer.sub(x, y))
}

export const div: (x: Natural, y: Natural) => Natural = unsafeCoerce(integer.div)

export const gcd: (x: Natural, y: Natural) => Natural = unsafeCoerce(nonZeroInteger.gcd)

export const lcm: (x: Natural, y: Natural) => Natural = unsafeCoerce(nonZeroInteger.lcm)

export const setoid: Setoid<Natural> = unsafeCoerce(integer.setoid)

export const ord: Ord<Natural> = unsafeCoerce(integer.ord)

export const show: (x: Natural) => string = unsafeCoerce(integer.show)
