import { Newtype } from 'newtype-ts'
import { Option, none, some } from 'fp-ts/lib/Option'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Integer } from './Integer'
import * as integer from './Integer'

export interface NonZeroInteger extends Newtype<'NonZeroInteger', Integer> {}

export const unsafeFromNumber: (n: number) => NonZeroInteger = integer.unsafeFromNumber as any

export const fromInteger = (i: Integer): Option<NonZeroInteger> => (integer.isZero(i) ? none : some(i as any))

export const toInteger = (nzi: NonZeroInteger): Integer => nzi as any

export const add: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = integer.add as any

export const mul: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = integer.mul as any

export const one: NonZeroInteger = integer.one as any

export const sub = (x: NonZeroInteger, y: NonZeroInteger): Option<NonZeroInteger> => {
  return fromInteger(integer.sub(toInteger(x), toInteger(y)))
}

export const setoidNonZeroInteger: Setoid<NonZeroInteger> = integer.setoidInteger as any

export const ordNonZeroInteger: Ord<NonZeroInteger> = integer.ordInteger as any
