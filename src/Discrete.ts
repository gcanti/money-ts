import { Newtype } from 'newtype-ts'
import { Integer } from './Integer'
import { NonZeroInteger } from './NonZeroInteger'
import * as integer from './Integer'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'

export interface Discrete<D, U> extends Newtype<['Discrete', D, U], Integer> {}

export const wrap = <D, U>(n: Integer): Discrete<D, U> => n as any

export const unwrap = <D, U>(d: Discrete<D, U>): Integer => d as any

export const add: <D, U>(x: Discrete<D, U>, y: Discrete<D, U>) => Discrete<D, U> = integer.add as any

export const mul: <D, U>(x: Discrete<D, U>, y: Integer) => Discrete<D, U> = integer.mul as any

export const one: Discrete<never, never> = integer.one as any

export const negate: <D, U>(x: Discrete<D, U>) => Discrete<D, U> = integer.negate as any

export const sub: <D, U>(x: Discrete<D, U>, y: Discrete<D, U>) => Discrete<D, U> = integer.sub as any

export const zero: Discrete<never, never> = integer.zero as any

export const div: <D, U>(x: Discrete<D, U>, y: NonZeroInteger) => Discrete<D, U> = integer.div as any

export const isZero: <D, U>(i: Discrete<D, U>) => boolean = integer.isZero as any

export const getSetoid = <D, U>(): Setoid<Discrete<D, U>> => integer.setoid as any

export const getOrd = <D, U>(): Ord<Discrete<D, U>> => integer.ord as any
