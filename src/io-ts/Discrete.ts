import { fromNewtype } from 'io-ts-types/lib/newtype-ts/fromNewtype'
import * as t from 'io-ts'
import { Discrete as DiscreteNewtype } from '../Discrete'
import { Integer } from './Integer'

export const Discrete = <Currency, Unit>(): t.Type<any, DiscreteNewtype<Currency, Unit>> =>
  fromNewtype<DiscreteNewtype<Currency, Unit>>(Integer)
