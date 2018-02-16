import { Type, mixed, tuple } from 'io-ts'
import { NonZeroInteger } from './NonZeroInteger'
import { Natural } from './Natural'
import { NonZeroRational as NonZeroRationalNewtype, reduce } from '../NonZeroRational'

const NZR = tuple([NonZeroInteger, Natural])

export const NonZeroRational: Type<NonZeroRationalNewtype, [string, string], mixed> = new Type(
  'NonZeroRational',
  NZR.is,
  (m, c) => NZR.validate(m, c).map(([n, d]) => reduce(n, d)),
  NZR.encode
)
