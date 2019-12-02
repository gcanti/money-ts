import { unsafeCoerce } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import { Ord } from 'fp-ts/lib/Ord'
import { pipe } from 'fp-ts/lib/pipeable'
import * as N from './Natural'
import * as NZR from './NonZeroRational'
import * as R from './Rational'

import Option = O.Option
import Natural = N.Natural
import Rational = R.Rational

/**
 * @since 0.1.2
 */
export type PositiveRational = [Natural, Natural]

/**
 * @since 0.1.2
 */
export function fromRational(r: Rational): Option<PositiveRational> {
  return pipe(
    N.fromInteger(r[0]),
    O.map((n): PositiveRational => [n, r[1]])
  )
}

/**
 * @since 0.1.2
 */
export const reduce: (n: Natural, d: Natural) => PositiveRational = unsafeCoerce(R.reduce)

/**
 * @since 0.1.2
 */
export const add: (x: PositiveRational, y: PositiveRational) => PositiveRational = unsafeCoerce(R.add)

/**
 * @since 0.1.2
 */
export const mul: (x: PositiveRational, y: PositiveRational) => PositiveRational = unsafeCoerce(R.mul)

/**
 * @since 0.1.2
 */
export const one: PositiveRational = unsafeCoerce(R.one)

/**
 * @since 0.1.2
 */
export function sub(x: PositiveRational, y: PositiveRational): Option<PositiveRational> {
  return fromRational(R.sub(x, y))
}

/**
 * @since 0.1.2
 */
export const div: (x: PositiveRational, y: PositiveRational) => PositiveRational = unsafeCoerce(R.div)

/**
 * @since 0.1.2
 */
export const inverse: (x: PositiveRational) => PositiveRational = unsafeCoerce(NZR.inverse)

/**
 * @since 0.1.2
 */
export const ord: Ord<PositiveRational> = R.ord

/**
 * @since 0.1.2
 */
export const show: (x: PositiveRational) => string = R.show
