import { unsafeCoerce } from 'newtype-ts'
import { Type, mixed } from 'io-ts'
import { Integer as IntegerNewtype } from '../Integer'
import { BigInteger } from './BigInteger'

export const Integer: Type<IntegerNewtype, string, mixed> = unsafeCoerce(BigInteger)
