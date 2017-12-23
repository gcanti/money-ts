import { fromNewtype } from 'io-ts-types/lib/newtype-ts/fromNewtype'
import * as t from 'io-ts'
import { Dense as DenseNewtype } from '../Dense'
import { Rational } from './Rational'

export const Dense = <D>(): t.Type<any, DenseNewtype<D>> => fromNewtype<DenseNewtype<D>>(Rational)
