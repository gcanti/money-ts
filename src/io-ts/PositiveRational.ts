import { Type, mixed, tuple } from 'io-ts'
import { Natural } from './Natural'
import { PositiveRational as PositiveRationalNewtype, reduce } from '../PositiveRational'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

const PR = tuple([Natural, Natural])

export const PositiveRational: Type<PositiveRationalNewtype, [string, string], mixed> = new Type(
  'PositiveRational',
  PR.is,
  (m, c) =>
    pipe(
      PR.validate(m, c),
      E.map(([n, d]) => reduce(n, d))
    ),
  PR.encode
)
