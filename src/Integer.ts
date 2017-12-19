import { Newtype } from 'newtype-ts'
import { none, some } from 'fp-ts/lib/Option'
import { Prism } from 'monocle-ts'
import { Setoid, setoidNumber } from 'fp-ts/lib/Setoid'
import { Ord, ordNumber } from 'fp-ts/lib/Ord'
import { NonZeroInteger } from './NonZeroInteger'

export interface Integer extends Newtype<'Integer', number> {}

export const prism = new Prism<number, Integer>(n => (n % 1 === 0 ? some(n as any) : none), i => i as any)

export const fromNonZeroInteger = (nzi: NonZeroInteger): Integer => nzi as any

export const add = (x: Integer, y: Integer): Integer => (prism.reverseGet(x) + prism.reverseGet(y)) as any

export const mul = (x: Integer, y: Integer): Integer => (prism.reverseGet(x) * prism.reverseGet(y)) as any

export const one: Integer = 1 as any

export const sub = (x: Integer, y: Integer): Integer => (prism.reverseGet(x) - prism.reverseGet(y)) as any

export const zero: Integer = 0 as any

export const setoidInteger: Setoid<Integer> = setoidNumber as any

export const ordInteger: Ord<Integer> = ordNumber as any
