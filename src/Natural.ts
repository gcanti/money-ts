import { unsafeCoerce } from 'fp-ts/lib/function'
import { none, Option, some } from 'fp-ts/lib/Option'
import { Ord } from 'fp-ts/lib/Ord'
import { Newtype } from 'newtype-ts'
import * as I from './Integer'
import * as NZI from './NonZeroInteger'

import Integer = I.Integer
import NonZeroInteger = NZI.NonZeroInteger

/**
 * @since 0.1.2
 */
export interface Natural
  extends Newtype<
    {
      Integer: true
      NonZero: true
      Positive: true
    },
    bigint
  > {}

/**
 * @since 0.1.2
 */
export function wrap(x: bigint): Option<Natural> {
  return fromInteger(I.wrap(x))
}

/**
 * @since 0.1.2
 */
export const unwrap: (x: Natural) => bigint = unsafeCoerce

/**
 * @since 0.1.2
 */
export function fromInteger(i: Integer): Option<Natural> {
  return I.isPositive(i) ? some(unsafeCoerce(i)) : none
}

/**
 * @since 0.1.2
 */
export const add: (x: Natural, y: Natural) => Natural = unsafeCoerce(I.add)

/**
 * @since 0.1.2
 */
export const mul: (x: Natural, y: Natural) => Natural = unsafeCoerce(I.mul)

/**
 * @since 0.1.2
 */
export function sub(x: Natural, y: Natural): Option<Natural> {
  return fromInteger(I.sub(x, y))
}

/**
 * @since 0.1.2
 */
export const negate: (x: Natural) => NonZeroInteger = unsafeCoerce(I.negate)

/**
 * @since 0.1.2
 */
export const div: (x: Natural, y: Natural) => Natural = unsafeCoerce(I.div)

/**
 * @since 0.1.2
 */
export const gcd: (x: Natural, y: Natural) => Natural = NZI.gcd

/**
 * @since 0.1.2
 */
export const lcm: (x: Natural, y: Natural) => Natural = NZI.lcm

/**
 * @since 0.1.2
 */
export const ord: Ord<Natural> = {
  equals: I.integer.equals,
  compare: I.integer.compare
}

/**
 * @since 0.1.2
 */
export const show: (x: Natural) => string = I.show

/**
 * @since 0.1.2
 */
export const one: Natural = unsafeCoerce(I.one)
