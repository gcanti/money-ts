import { unsafeCoerce } from 'newtype-ts'
import { Type, mixed, refinement } from 'io-ts'
import { NonZeroInteger as NonZeroIntegerNewtype } from '../NonZeroInteger'
import { BigInteger } from './BigInteger'

export const NonZeroInteger: Type<NonZeroIntegerNewtype, string, mixed> = unsafeCoerce(
  refinement(BigInteger, bi => !bi.isZero(), 'NonZeroInteger')
)
