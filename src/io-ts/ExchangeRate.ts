import { unsafeCoerce } from 'fp-ts/function'
import { Type, mixed } from 'io-ts'
import { ExchangeRate as ExchangeRateNewtype } from '../ExchangeRate'
import { PositiveRational } from './PositiveRational'

export const ExchangeRate = <S, D>(): Type<ExchangeRateNewtype<S, D>, [string, string], mixed> =>
  unsafeCoerce(PositiveRational)
