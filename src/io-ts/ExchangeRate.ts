import { fromNewtype } from 'io-ts-types/lib/newtype-ts/fromNewtype'
import * as t from 'io-ts'
import { ExchangeRate as ExchangeRateNewtype } from '../ExchangeRate'
import { PositiveRational } from './PositiveRational'

export const ExchangeRate = <S, D>(): t.Type<any, ExchangeRateNewtype<S, D>> =>
  fromNewtype<ExchangeRateNewtype<S, D>>(PositiveRational)
