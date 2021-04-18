import { NonZeroInteger } from './NonZeroInteger'
import { Natural } from './Natural'
import * as O from 'fp-ts/Option'
import * as EQ from 'fp-ts/Eq'
import * as ORD from 'fp-ts/Ord'
import { Rational } from './Rational'
import * as natural from './Natural'
import * as rational from './Rational'
import * as nonZeroInteger from './NonZeroInteger'
import { pipe, unsafeCoerce } from 'fp-ts/function'

export type NonZeroRational = [NonZeroInteger, Natural]

export function fromRational(r: Rational): O.Option<NonZeroRational> {
  return pipe(
    nonZeroInteger.fromInteger(r[0]),
    O.map((n): NonZeroRational => [n, r[1]])
  )
}

export const reduce: (n: NonZeroInteger, d: Natural) => NonZeroRational = unsafeCoerce(rational.reduce)

export const add: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = unsafeCoerce(rational.add)

export const mul: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = unsafeCoerce(rational.mul)

export const one: NonZeroRational = unsafeCoerce(rational.one)

export function sub(x: NonZeroRational, y: NonZeroRational): O.Option<NonZeroRational> {
  return fromRational(rational.sub(x, y))
}

export const div: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = unsafeCoerce(rational.div)

export function inverse(x: NonZeroRational): NonZeroRational {
  const d = x[1]
  const n = nonZeroInteger.abs(x[0])
  return nonZeroInteger.isPositive(x[0]) ? [d, n] : [natural.negate(d), n]
}

export const Eq: EQ.Eq<NonZeroRational> = rational.Eq

export const Ord: ORD.Ord<NonZeroRational> = rational.Ord

export const show: (x: NonZeroRational) => string = rational.show
