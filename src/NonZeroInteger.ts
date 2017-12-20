import { Newtype } from 'newtype-ts'
import { Option, none, some } from 'fp-ts/lib/Option'
import { Prism } from 'monocle-ts'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Integer } from './Integer'
import * as integer from './Integer'

export interface NonZeroInteger extends Newtype<'NonZeroInteger', Integer> {}

export const unsafeFromNumber: (n: number) => NonZeroInteger = integer.unsafeFromNumber as any

export const prism = new Prism<Integer, NonZeroInteger>(
  i => (integer.isZero(i) ? none : some(i as any)),
  nzi => nzi as any
)

export const add: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = integer.add as any

export const mul: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = integer.mul as any

export const one: NonZeroInteger = integer.one as any

export const sub = (x: NonZeroInteger, y: NonZeroInteger): Option<NonZeroInteger> => {
  return prism.getOption(integer.sub(prism.reverseGet(x), prism.reverseGet(y)))
}

export const setoidNonZeroInteger: Setoid<NonZeroInteger> = integer.setoidInteger as any

export const ordNonZeroInteger: Ord<NonZeroInteger> = integer.ordInteger as any
