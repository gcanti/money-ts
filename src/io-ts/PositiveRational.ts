import { Type, tuple } from 'io-ts'
import { Natural } from './Natural'
import { PositiveRational as PositiveRationalNewtype, reduce } from '../PositiveRational'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'

const PR = tuple([Natural, Natural])

/**
 * @since 0.1.2
 */
export const PositiveRational: Type<PositiveRationalNewtype, [string, string], unknown> = new Type(
  'PositiveRational',
  PR.is,
  (m, c) =>
    pipe(
      PR.validate(m, c),
      E.map(([n, d]) => reduce(n, d))
    ),
  PR.encode
)
