import { Newtype } from 'newtype-ts'
import { Integer } from './Integer'
import * as integer from './Integer'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'

export interface Discrete<Dimension, Unit> extends Newtype<['Discrete', Dimension, Unit], Integer> {}

export const fromInteger = <Dimension, Unit>(n: Integer): Discrete<Dimension, Unit> => n as any

export const toInteger = <Dimension, Unit>(d: Discrete<Dimension, Unit>): Integer => d as any

export const add: <Dimension, Unit>(
  x: Discrete<Dimension, Unit>,
  y: Discrete<Dimension, Unit>
) => Discrete<Dimension, Unit> = integer.add as any

export const mul: <Dimension, Unit>(
  x: Discrete<Dimension, Unit>,
  y: Integer
) => Discrete<Dimension, Unit> = integer.mul as any

export const one: Discrete<never, never> = integer.one as any

export const sub: <Dimension, Unit>(
  x: Discrete<Dimension, Unit>,
  y: Discrete<Dimension, Unit>
) => Discrete<Dimension, Unit> = integer.sub as any

export const zero: Discrete<never, never> = integer.zero as any

export const getSetoid = <Dimension, Unit>(): Setoid<Discrete<Dimension, Unit>> => integer.setoidInteger as any

export const getOrd = <Dimension, Unit>(): Ord<Discrete<Dimension, Unit>> => integer.ordInteger as any
