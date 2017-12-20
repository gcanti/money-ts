import { fromNewtype } from 'io-ts-types/lib/newtype-ts/fromNewtype'
import * as t from 'io-ts'
import { NonZeroInteger as NonZeroIntegerNewtype } from '../NonZeroInteger'
import { Integer } from './Integer'
import { isZero } from '../Integer'

export const NonZeroInteger = fromNewtype<NonZeroIntegerNewtype>(
  t.refinement(Integer, i => !isZero(i), 'NonZeroInteger')
)
