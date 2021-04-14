import { Type, mixed, tuple } from 'io-ts'
import { NonZeroInteger } from './NonZeroInteger'
import { Natural } from './Natural'
import { NonZeroRational as NonZeroRationalNewtype, reduce } from '../NonZeroRational'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

const NZR = tuple([NonZeroInteger, Natural])

export const NonZeroRational: Type<NonZeroRationalNewtype, [string, string], mixed> = new Type(
  'NonZeroRational',
  NZR.is,
  (m, c) =>
    pipe(
      NZR.validate(m, c),
      E.map(([n, d]) => reduce(n, d))
    ),
  NZR.encode
)
