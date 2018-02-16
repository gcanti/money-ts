import { unsafeCoerce } from 'newtype-ts'
import { Type, mixed, refinement } from 'io-ts'
import { Natural as NaturalNewtype } from '../Natural'
import { BigInteger } from './BigInteger'

export const Natural: Type<NaturalNewtype, string, mixed> = unsafeCoerce(
  refinement(BigInteger, bi => bi.isPositive(), 'Natural')
)
