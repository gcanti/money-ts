import { fromNewtype } from 'io-ts-types/lib/newtype-ts/fromNewtype'
import * as t from 'io-ts'
import { ExchangeRate as ExchangeRateNewtype } from '../ExchangeRate'
import { NonZeroRational } from './NonZeroRational'

export const ExchangeRate = <Source, Destination>(): t.Type<any, ExchangeRateNewtype<Source, Destination>> =>
  fromNewtype<ExchangeRateNewtype<Source, Destination>>(NonZeroRational)
