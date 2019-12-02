import { unsafeCoerce } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import { Ord } from 'fp-ts/lib/Ord'
import { pipe } from 'fp-ts/lib/pipeable'
import * as N from './Natural'
import * as NZI from './NonZeroInteger'
import * as R from './Rational'

import Option = O.Option
import NonZeroInteger = NZI.NonZeroInteger
import Natural = N.Natural
import Rational = R.Rational

/**
 * @since 0.1.2
 */
export type NonZeroRational = [NonZeroInteger, Natural]

/**
 * @since 0.1.2
 */
export function fromRational(r: Rational): Option<NonZeroRational> {
  return pipe(
    NZI.fromInteger(r[0]),
    O.map((n): NonZeroRational => [n, r[1]])
  )
}

/**
 * @since 0.1.2
 */
export const reduce: (n: NonZeroInteger, d: Natural) => NonZeroRational = unsafeCoerce(R.reduce)

/**
 * @since 0.1.2
 */
export const add: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = unsafeCoerce(R.add)

/**
 * @since 0.1.2
 */
export const mul: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = unsafeCoerce(R.mul)

/**
 * @since 0.1.2
 */
export const one: NonZeroRational = unsafeCoerce(R.one)

/**
 * @since 0.1.2
 */
export function sub(x: NonZeroRational, y: NonZeroRational): Option<NonZeroRational> {
  return fromRational(R.sub(x, y))
}

/**
 * @since 0.1.2
 */
export const div: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = unsafeCoerce(R.div)

/**
 * @since 0.1.2
 */
export function inverse(x: NonZeroRational): NonZeroRational {
  const d = x[1]
  const n = NZI.abs(x[0])
  return NZI.isPositive(x[0]) ? [d, n] : [N.negate(d), n]
}

/**
 * @since 0.1.2
 */
export const ord: Ord<NonZeroRational> = R.ord

/**
 * @since 0.1.2
 */
export const show: (x: NonZeroRational) => string = R.show
