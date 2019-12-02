import { unsafeCoerce } from 'fp-ts/lib/function'
import { Type } from 'io-ts'
import { Integer as IntegerNewtype } from '../Integer'
import { bigint } from './bigint'

/**
 * @since 0.1.2
 */
export const Integer: Type<IntegerNewtype, string, unknown> = unsafeCoerce(bigint)
