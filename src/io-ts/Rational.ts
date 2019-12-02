import { Type, tuple } from 'io-ts'
import { Integer } from './Integer'
import { Natural } from './Natural'
import { Rational as RationalNewtype, reduce } from '../Rational'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'

const R = tuple([Integer, Natural])

/**
 * @since 0.1.2
 */
export const Rational: Type<RationalNewtype, [string, string], unknown> = new Type(
  'Rational',
  R.is,
  (m, c) =>
    pipe(
      R.validate(m, c),
      E.map(([n, d]) => reduce(n, d))
    ),
  R.encode
)
