import { fromNewtype } from 'io-ts-types/lib/newtype-ts/fromNewtype'
import * as t from 'io-ts'
import { Integer as IntegerNewtype } from '../Integer'
import { BigInteger } from './BigInteger'

export const Integer: t.Type<any, IntegerNewtype> = fromNewtype<IntegerNewtype>(BigInteger)
