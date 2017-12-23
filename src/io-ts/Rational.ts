import * as t from 'io-ts'
import { Integer } from './Integer'
import { NonZeroInteger } from './NonZeroInteger'
import { Rational as RationalNewtype, reduce } from '../Rational'

const Tuple = t.tuple([Integer, NonZeroInteger])

export const Rational: t.Type<any, RationalNewtype> = new t.Type(
  'Rational',
  Tuple.is,
  (v, c) => Tuple.validate(v, c).map(([n, d]) => reduce(n, d)),
  Tuple.serialize
)
