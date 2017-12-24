import { NonZeroInteger } from './NonZeroInteger'
import { Option } from 'fp-ts/lib/Option'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Rational } from './Rational'
import * as rational from './Rational'
import * as nonZeroInteger from './NonZeroInteger'
import { unsafeCoerce } from 'newtype-ts'

/** A NonZeroRational is also a Rational */
export type NonZeroRational = [NonZeroInteger, NonZeroInteger]

export function fromInput(input: [number | string, number | string]): Option<NonZeroRational> {
  return rational.fromInput(input).chain(fromRational)
}

export function fromRational(r: Rational): Option<NonZeroRational> {
  return nonZeroInteger.fromInteger(r[0]).map((n): NonZeroRational => [n, r[1]])
}

export const toRational: (nzr: NonZeroRational) => Rational = unsafeCoerce

export const reduce: (n: NonZeroInteger, d: NonZeroInteger) => NonZeroRational = unsafeCoerce(rational.reduce)

export const add: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = unsafeCoerce(rational.add)

export const mul: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = unsafeCoerce(rational.mul)

export const one: NonZeroRational = unsafeCoerce(rational.one)

export function sub(x: NonZeroRational, y: NonZeroRational): Option<NonZeroRational> {
  return fromRational(rational.sub(x, y))
}

export const div: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = unsafeCoerce(rational.div)

export function inverse(x: NonZeroRational): NonZeroRational {
  return [x[1], x[0]]
}

export const setoid: Setoid<NonZeroRational> = unsafeCoerce(rational.setoid)

export const ord: Ord<NonZeroRational> = unsafeCoerce(rational.ord)

export const show: (x: NonZeroRational) => string = unsafeCoerce(rational.show)
