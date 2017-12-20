import { fromNewtype } from 'io-ts-types/lib/newtype-ts/fromNewtype'
import * as t from 'io-ts'
import { Discrete as DiscreteNewtype } from '../Discrete'
import { Integer } from './Integer'

export const Discrete = <Dimension, Unit>(): t.Type<any, DiscreteNewtype<Dimension, Unit>> =>
  fromNewtype<DiscreteNewtype<Dimension, Unit>>(Integer)
