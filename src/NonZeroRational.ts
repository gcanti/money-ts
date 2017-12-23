import { NonZeroInteger } from './NonZeroInteger'
import { Option } from 'fp-ts/lib/Option'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Rational } from './Rational'
import * as rational from './Rational'
import * as nonZeroInteger from './NonZeroInteger'

export type NonZeroRational = [NonZeroInteger, NonZeroInteger]

export function fromInput(input: [number | string, number | string]): Option<NonZeroRational> {
  return rational.fromInput(input).chain(fromRational)
}

export function fromRational(r: Rational): Option<NonZeroRational> {
  return nonZeroInteger.fromInteger(r[0]).map((n): NonZeroRational => [n, r[1]])
}

export function toRational(nzr: NonZeroRational): Rational {
  return nzr as any
}

export const reduce: (n: NonZeroInteger, d: NonZeroInteger) => NonZeroRational = rational.reduce as any

export const add: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = rational.add as any

export const mul: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = rational.mul as any

export const one: NonZeroRational = rational.one as any

export function sub(x: NonZeroRational, y: NonZeroRational): Option<NonZeroRational> {
  return fromRational(rational.sub(x, y))
}

export const div: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = rational.div as any

export function inverse(nzr: NonZeroRational): NonZeroRational {
  const [n, d] = nzr
  return [d, n]
}

export const setoid: Setoid<NonZeroRational> = rational.setoid as any

export const ord: Ord<NonZeroRational> = rational.ord as any

export const show: (x: NonZeroRational) => string = rational.show as any
