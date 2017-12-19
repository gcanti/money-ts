import { fromNewtype } from 'io-ts-types/lib/newtype-ts/fromNewtype'
import * as t from 'io-ts'
import { Dense as DenseNewtype } from '../Dense'
import { Rational } from './Rational'

export const Dense = <Currency>(): t.Type<any, DenseNewtype<Currency>> => fromNewtype<DenseNewtype<Currency>>(Rational)
