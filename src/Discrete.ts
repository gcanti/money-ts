import { Newtype } from 'newtype-ts'
import { Integer } from './Integer'
import * as integer from './Integer'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'

export interface Discrete<Currency, Unit> extends Newtype<['Discrete', Currency, Unit], Integer> {}

export const fromInteger = <Currency, Unit>(n: Integer): Discrete<Currency, Unit> => n as any

export const toInteger = <Currency, Unit>(d: Discrete<Currency, Unit>): Integer => d as any

export const add: <Currency, Unit>(
  x: Discrete<Currency, Unit>,
  y: Discrete<Currency, Unit>
) => Discrete<Currency, Unit> = integer.add as any

export const mul: <Currency, Unit>(
  x: Discrete<Currency, Unit>,
  y: Integer
) => Discrete<Currency, Unit> = integer.mul as any

export const one: Discrete<never, never> = integer.one as any

export const sub: <Currency, Unit>(
  x: Discrete<Currency, Unit>,
  y: Discrete<Currency, Unit>
) => Discrete<Currency, Unit> = integer.sub as any

export const zero: Discrete<never, never> = integer.zero as any

export const getSetoid = <Currency, Unit>(): Setoid<Discrete<Currency, Unit>> => integer.setoidInteger as any

export const getOrd = <Currency, Unit>(): Ord<Discrete<Currency, Unit>> => integer.ordInteger as any
