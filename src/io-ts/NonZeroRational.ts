import { Type, tuple } from 'io-ts'
import { NonZeroInteger } from './NonZeroInteger'
import { Natural } from './Natural'
import { NonZeroRational as NonZeroRationalNewtype, reduce } from '../NonZeroRational'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'

const NZR = tuple([NonZeroInteger, Natural])

/**
 * @since 0.1.2
 */
export const NonZeroRational: Type<NonZeroRationalNewtype, [string, string], unknown> = new Type(
  'NonZeroRational',
  NZR.is,
  (m, c) =>
    pipe(
      NZR.validate(m, c),
      E.map(([n, d]) => reduce(n, d))
    ),
  NZR.encode
)
