import { unsafeCoerce } from 'fp-ts/lib/function'
import { refinement, Type } from 'io-ts'
import { NonZeroInteger as NonZeroIntegerNewtype } from '../NonZeroInteger'
import { BigInteger } from './BigInteger'

/**
 * @since 0.1.2
 */
export const NonZeroInteger: Type<NonZeroIntegerNewtype, string, unknown> = unsafeCoerce(
  // tslint:disable-next-line: deprecation
  refinement(BigInteger, bi => !bi.isZero(), 'NonZeroInteger')
)
