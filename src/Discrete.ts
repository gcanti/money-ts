import { Newtype } from 'newtype-ts'
import { Integer } from './Integer'
import * as integer from './Integer'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'

export interface Scale {
  EUR: {
    EUR: [100, 1]
    cent: [100, 1]
    euro: [1, 1]
  }
}

export const scale: Scale = {
  EUR: {
    EUR: [100, 1],
    cent: [100, 1],
    euro: [1, 1]
  }
}

export type Currencies = keyof Scale

export type Units<Currency extends Currencies> = keyof Scale[Currency]

export interface Discrete<Currency extends Currencies, Unit extends Units<Currency>>
  extends Newtype<['Discrete', Currency, Unit], Integer> {}

export const fromInteger = <Currency extends Currencies, Unit extends Units<Currency>>(
  n: Integer
): Discrete<Currency, Unit> => n as any

export const toInteger = <Currency extends Currencies, Unit extends Units<Currency>>(
  d: Discrete<Currency, Unit>
): Integer => d as any

export const add: <Currency extends Currencies, Unit extends Units<Currency>>(
  x: Discrete<Currency, Unit>,
  y: Discrete<Currency, Unit>
) => Discrete<Currency, Unit> = integer.add as any

export const mul: <Currency extends Currencies, Unit extends Units<Currency>>(
  x: Discrete<Currency, Unit>,
  y: Integer
) => Discrete<Currency, Unit> = integer.mul as any

export const one: Discrete<never, never> = integer.one as any

export const sub: <Currency extends Currencies, Unit extends Units<Currency>>(
  x: Discrete<Currency, Unit>,
  y: Discrete<Currency, Unit>
) => Discrete<Currency, Unit> = integer.sub as any

export const zero: Discrete<never, never> = integer.zero as any

export const getSetoid = <Currency extends Currencies, Unit extends Units<Currency>>(): Setoid<
  Discrete<Currency, Unit>
> => integer.setoidInteger as any

export const getOrd = <Currency extends Currencies, Unit extends Units<Currency>>(): Ord<Discrete<Currency, Unit>> =>
  integer.ordInteger as any
