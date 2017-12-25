import { NonZeroInteger } from './NonZeroInteger'
import { Natural } from './Natural'
import { Option } from 'fp-ts/lib/Option'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Rational } from './Rational'
import * as natural from './Natural'
import * as rational from './Rational'
import * as nonZeroInteger from './NonZeroInteger'
import { unsafeCoerce } from 'newtype-ts'

export type NonZeroRational = [NonZeroInteger, Natural]

export function fromRational(r: Rational): Option<NonZeroRational> {
  return nonZeroInteger.fromInteger(r[0]).map((n): NonZeroRational => [n, r[1]])
}

export const reduce: (n: NonZeroInteger, d: Natural) => NonZeroRational = unsafeCoerce(rational.reduce)

export const add: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = unsafeCoerce(rational.add)

export const mul: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = unsafeCoerce(rational.mul)

export const one: NonZeroRational = unsafeCoerce(rational.one)

export function sub(x: NonZeroRational, y: NonZeroRational): Option<NonZeroRational> {
  return fromRational(rational.sub(x, y))
}

export const div: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = unsafeCoerce(rational.div)

export function inverse(x: NonZeroRational): NonZeroRational {
  const d = x[1]
  const n = nonZeroInteger.abs(x[0])
  return nonZeroInteger.isPositive(x[0]) ? [d, n] : [natural.negate(d), n]
}

export const setoid: Setoid<NonZeroRational> = rational.setoid

export const ord: Ord<NonZeroRational> = rational.ord

export const show: (x: NonZeroRational) => string = rational.show
