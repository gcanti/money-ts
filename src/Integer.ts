import { Newtype } from 'newtype-ts'
import { none, some } from 'fp-ts/lib/Option'
import { Prism } from 'monocle-ts'
import { Setoid, setoidNumber } from 'fp-ts/lib/Setoid'
import { Ord, ordNumber } from 'fp-ts/lib/Ord'
import { NonZeroInteger } from './NonZeroInteger'

export interface Integer extends Newtype<'Integer', number> {}

export const unsafeFromNumber = (n: number): Integer => (n | 0) as any

export const isInteger = (n: number): boolean => (n | 0) === n

export const prism = new Prism<number, Integer>(n => (isInteger(n) ? some(n as any) : none), i => i as any)

export const fromNonZeroInteger = (nzi: NonZeroInteger): Integer => nzi as any

export const add = (x: Integer, y: Integer): Integer => unsafeFromNumber(prism.reverseGet(x) + prism.reverseGet(y))

export const mul = (x: Integer, y: Integer): Integer => unsafeFromNumber(prism.reverseGet(x) * prism.reverseGet(y))

export const one: Integer = unsafeFromNumber(1)

export const sub = (x: Integer, y: Integer): Integer => unsafeFromNumber(prism.reverseGet(x) - prism.reverseGet(y))

export const zero: Integer = unsafeFromNumber(0)

export const setoidInteger: Setoid<Integer> = setoidNumber as any

export const isZero: (i: Integer) => boolean = setoidInteger.equals(zero)

export const ordInteger: Ord<Integer> = ordNumber as any
