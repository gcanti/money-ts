import { Type, mixed, tuple } from 'io-ts'
import { Integer } from './Integer'
import { Natural } from './Natural'
import { Rational as RationalNewtype, reduce } from '../Rational'

const R = tuple([Integer, Natural])

export const Rational: Type<RationalNewtype, [string, string], mixed> = new Type(
  'Rational',
  R.is,
  (m, c) => R.validate(m, c).map(([n, d]) => reduce(n, d)),
  R.encode
)
