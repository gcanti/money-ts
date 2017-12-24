import { fromNewtype } from 'io-ts-types/lib/newtype-ts/fromNewtype'
import * as t from 'io-ts'
import { Natural as NaturalNewtype } from '../Natural'
import { BigInteger } from './BigInteger'

export const Natural = fromNewtype<NaturalNewtype>(t.refinement(BigInteger, bi => bi.isPositive(), 'Natural'))
