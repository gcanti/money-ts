import { Type, mixed, tuple } from 'io-ts'
import { Integer } from './Integer'
import { Natural } from './Natural'
import { Rational as RationalNewtype, reduce } from '../Rational'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

const R = tuple([Integer, Natural])

export const Rational: Type<RationalNewtype, [string, string], mixed> = new Type(
  'Rational',
  R.is,
  (m, c) =>
    pipe(
      R.validate(m, c),
      E.map(([n, d]) => reduce(n, d))
    ),
  R.encode
)
