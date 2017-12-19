import { fromNewtype } from 'io-ts-types/lib/newtype-ts/fromNewtype'
import * as t from 'io-ts'
import { Integer as IntegerNewtype } from '../Integer'

export const Integer = fromNewtype<IntegerNewtype>(t.Integer)
