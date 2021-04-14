import { unsafeCoerce } from 'fp-ts/function'
import { Type, mixed, refinement } from 'io-ts'
import { NonZeroInteger as NonZeroIntegerNewtype } from '../NonZeroInteger'
import { BigInteger } from './BigInteger'

export const NonZeroInteger: Type<NonZeroIntegerNewtype, string, mixed> = unsafeCoerce(
  refinement(BigInteger, (bi) => !bi.isZero(), 'NonZeroInteger')
)
