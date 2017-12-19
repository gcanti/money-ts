import { fromNewtype } from 'io-ts-types/lib/newtype-ts/fromNewtype'
import * as t from 'io-ts'
import { NonZeroInteger as NonZeroIntegerNewtype } from '../NonZeroInteger'

export const NonZeroInteger = fromNewtype<NonZeroIntegerNewtype>(
  new t.Type<any, number>(
    'NonZeroInteger',
    (v): v is number => t.Integer.is(v) && v !== 0,
    (v, c) => t.Integer.validate(v, c).chain(n => (n !== 0 ? t.success(n) : t.failure(n, c))),
    t.Integer.serialize
  )
)
