import { fromNewtype } from 'io-ts-types/lib/newtype-ts/fromNewtype'
import * as t from 'io-ts'
import { NonZeroInteger as NonZeroIntegerNewtype } from '../NonZeroInteger'
import { BigInteger } from './BigInteger'

export const NonZeroInteger = fromNewtype<NonZeroIntegerNewtype>(
  t.refinement(BigInteger, bi => !bi.isZero(), 'NonZeroInteger')
)
