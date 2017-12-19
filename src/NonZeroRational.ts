import { Newtype } from 'newtype-ts'
import { Option, none, some } from 'fp-ts/lib/Option'
import { Prism } from 'monocle-ts'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Rational } from './Rational'
import * as rational from './Rational'
import { Integer } from './Integer'

export interface NonZeroRational extends Newtype<'NonZeroRational', Rational> {}

export const prism: Prism<Rational, NonZeroRational> = new Prism(
  t => ((t as any)[0] === 0 ? none : some(t as any)),
  nzr => nzr as any
)

export function fromInteger(i: Integer): Rational {
  return [i, 1 as any]
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

export function inverse(nzr: NonZeroRational): Rational {
  const [n, d] = prism.reverseGet(nzr)
  return [d, n] as any
}

export const setoidNonZeroRational: Setoid<NonZeroRational> = rational.setoidRational as any

export const ordNonZeroRational: Ord<NonZeroRational> = rational.ordRational as any
