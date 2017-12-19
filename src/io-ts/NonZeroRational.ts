import { fromNewtype } from 'io-ts-types/lib/newtype-ts/fromNewtype'
import * as t from 'io-ts'
import { Rational as RationalNewtype, isZero } from '../Rational'
import { Rational } from './Rational'
import { NonZeroRational as NonZeroRationalNewtype } from '../NonZeroRational'

export const NonZeroRational: t.Type<any, NonZeroRationalNewtype> = fromNewtype<NonZeroRationalNewtype>(
  new t.Type<any, RationalNewtype>(
    'NonZeroRational',
    (v): v is RationalNewtype => Rational.is(v) && !isZero(v),
    (v, c) => Rational.validate(v, c).chain(n => (isZero(n) ? t.failure(n, c) : t.success(n))),
    Rational.serialize
  )
)
