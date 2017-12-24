import * as t from 'io-ts'
import { Integer } from './Integer'
import { Natural } from './Natural'
import { Rational as RationalNewtype, reduce } from '../Rational'

const Tuple = t.tuple([Integer, Natural])

export const Rational: t.Type<any, RationalNewtype> = new t.Type(
  'Rational',
  Tuple.is,
  (v, c) => Tuple.validate(v, c).map(([n, d]) => reduce(n, d)),
  Tuple.serialize
)
