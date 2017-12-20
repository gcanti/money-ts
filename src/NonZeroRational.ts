import { NonZeroInteger } from './NonZeroInteger'
import { Option, none, some } from 'fp-ts/lib/Option'
import { Prism } from 'monocle-ts'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Rational } from './Rational'
import * as rational from './Rational'

export type NonZeroRational = [NonZeroInteger, NonZeroInteger]

export const prism: Prism<Rational, NonZeroRational> = new Prism(rational.toNonZeroRational, nzr => nzr as any)

export const simplify: (nzr: NonZeroRational) => NonZeroRational = rational.simplify as any

export const add: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = rational.add as any

export const mul: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = rational.mul as any

export const one: NonZeroRational = rational.one as any

export function sub(x: NonZeroRational, y: NonZeroRational): Option<NonZeroRational> {
  const r = rational.sub(x as any, y as any)
  return rational.isZero(r) ? none : some(r as any)
}

export const div: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = rational.div as any

export function inverse(nzr: NonZeroRational): NonZeroRational {
  const [n, d] = nzr
  return [d, n]
}

export const setoidNonZeroRational: Setoid<NonZeroRational> = rational.setoidRational as any

export const ordNonZeroRational: Ord<NonZeroRational> = rational.ordRational as any
