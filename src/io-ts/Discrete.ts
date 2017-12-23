import { fromNewtype } from 'io-ts-types/lib/newtype-ts/fromNewtype'
import * as t from 'io-ts'
import { Discrete as DiscreteNewtype } from '../Discrete'
import { Integer } from './Integer'

export const Discrete = <D, U>(): t.Type<any, DiscreteNewtype<D, U>> => fromNewtype<DiscreteNewtype<D, U>>(Integer)
