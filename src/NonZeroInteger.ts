import { Newtype } from 'newtype-ts'
import { Option, none, some } from 'fp-ts/lib/Option'
import { Prism } from 'monocle-ts'
import { Setoid, setoidNumber } from 'fp-ts/lib/Setoid'
import { Ord, ordNumber } from 'fp-ts/lib/Ord'
import { Integer } from './Integer'

export interface NonZeroInteger extends Newtype<'NonZeroInteger', number> {}

export const prism = new Prism<number, NonZeroInteger>(
  n => (n !== 0 && n % 1 === 0 ? some(n as any) : none),
  nzi => nzi as any
)

export const fromInteger: (i: Integer) => Option<NonZeroInteger> = prism.getOption as any

export const toInteger = (nzi: NonZeroInteger): Integer => nzi as any

export const add = (x: NonZeroInteger, y: NonZeroInteger): NonZeroInteger =>
  (prism.reverseGet(x) + prism.reverseGet(y)) as any

export const mul = (x: NonZeroInteger, y: NonZeroInteger): NonZeroInteger =>
  (prism.reverseGet(x) * prism.reverseGet(y)) as any

export const one: NonZeroInteger = 1 as any

export const sub = (x: NonZeroInteger, y: NonZeroInteger): Option<NonZeroInteger> => {
  const r = prism.reverseGet(x) - prism.reverseGet(y)
  return r === 0 ? none : some(r as any)
}

export const setoidNonZeroInteger: Setoid<NonZeroInteger> = setoidNumber as any

export const ordNonZeroInteger: Ord<NonZeroInteger> = ordNumber as any
