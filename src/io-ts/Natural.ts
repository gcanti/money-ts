import { unsafeCoerce } from 'fp-ts/lib/function'
import { refinement, Type } from 'io-ts'
import { Natural as NaturalNewtype } from '../Natural'
import { BigInteger } from './BigInteger'

/**
 * @since 0.1.2
 */
export const Natural: Type<NaturalNewtype, string, unknown> = unsafeCoerce(
  // tslint:disable-next-line: deprecation
  refinement(BigInteger, bi => bi.isPositive(), 'Natural')
)
