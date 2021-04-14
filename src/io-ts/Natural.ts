import { unsafeCoerce } from 'fp-ts/function'
import { Type, mixed, refinement } from 'io-ts'
import { Natural as NaturalNewtype } from '../Natural'
import { BigInteger } from './BigInteger'

export const Natural: Type<NaturalNewtype, string, mixed> = unsafeCoerce(
  refinement(BigInteger, (bi) => bi.isPositive(), 'Natural')
)
