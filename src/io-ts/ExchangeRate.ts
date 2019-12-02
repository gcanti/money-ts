import { unsafeCoerce } from 'fp-ts/lib/function'
import { Type } from 'io-ts'
import { ExchangeRate as ExchangeRateNewtype } from '../ExchangeRate'
import { PositiveRational } from './PositiveRational'

/**
 * @since 0.1.2
 */
export const ExchangeRate = <S, D>(): Type<ExchangeRateNewtype<S, D>, [string, string], unknown> =>
  unsafeCoerce(PositiveRational)
