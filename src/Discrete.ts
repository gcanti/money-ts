import { Newtype, unsafeCoerce } from 'newtype-ts'
import { Integer } from './Integer'
import { NonZeroInteger } from './NonZeroInteger'
import * as integer from './Integer'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'

export interface Discrete<D, U> extends Newtype<['Discrete', D, U], Integer> {}

export const wrap: <D, U>(n: Integer) => Discrete<D, U> = unsafeCoerce

export const unwrap: <D, U>(d: Discrete<D, U>) => Integer = unsafeCoerce

export const add: <D, U>(x: Discrete<D, U>, y: Discrete<D, U>) => Discrete<D, U> = unsafeCoerce(integer.add)

export const mul: <D, U>(x: Discrete<D, U>, y: Integer) => Discrete<D, U> = unsafeCoerce(integer.mul)

export const one: Discrete<never, never> = unsafeCoerce(integer.one)

export const negate: <D, U>(x: Discrete<D, U>) => Discrete<D, U> = unsafeCoerce(integer.negate)

export const sub: <D, U>(x: Discrete<D, U>, y: Discrete<D, U>) => Discrete<D, U> = unsafeCoerce(integer.sub)

export const zero: Discrete<never, never> = unsafeCoerce(integer.zero)

export const div: <D, U>(x: Discrete<D, U>, y: NonZeroInteger) => Discrete<D, U> = unsafeCoerce(integer.div)

export const isZero: <D, U>(i: Discrete<D, U>) => boolean = unsafeCoerce(integer.isZero)

export const getSetoid = <D, U>(): Setoid<Discrete<D, U>> => unsafeCoerce(integer.setoid)

export const getOrd = <D, U>(): Ord<Discrete<D, U>> => unsafeCoerce(integer.ord)
