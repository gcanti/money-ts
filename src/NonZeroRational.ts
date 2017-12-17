import { Newtype } from 'newtype-ts'
import { Option, none, some } from 'fp-ts/lib/Option'
import { Prism } from 'monocle-ts'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Rational } from './Rational'
import * as rational from './Rational'

export interface NonZeroRational extends Newtype<'NonZeroRational', [number, number]> {}

export const prismNonZeroRational: Prism<[number, number], NonZeroRational> = new Prism(
  t => (t[0] !== 0 ? some(t as any) : none),
  nzr => nzr as any
)

export const fromRational: (r: Rational) => Option<NonZeroRational> = prismNonZeroRational.getOption as any

export function toRational(nzr: NonZeroRational): Rational {
  return nzr as any
}

export const simplify: (nzr: NonZeroRational) => NonZeroRational = rational.simplify as any

export const add: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = rational.add as any

export const mul: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = rational.mul as any

export const one: NonZeroRational = rational.one as any

export function sub(x: NonZeroRational, y: NonZeroRational): Option<NonZeroRational> {
  const r = rational.sub(x as any, y as any)
  return rational.isZero(r) ? none : some(r as any)
}

export const div: (x: NonZeroRational, y: NonZeroRational) => NonZeroRational = rational.div as any

export const setoidNonZeroRational: Setoid<NonZeroRational> = rational.setoidRational as any

export const ordNonZeroRational: Ord<NonZeroRational> = rational.ordRational as any
