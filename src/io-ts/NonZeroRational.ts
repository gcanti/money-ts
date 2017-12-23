import * as t from 'io-ts'
import { NonZeroInteger } from './NonZeroInteger'
import { NonZeroRational as NonZeroRationalNewtype, reduce } from '../NonZeroRational'

const Tuple = t.tuple([NonZeroInteger, NonZeroInteger])

export const NonZeroRational: t.Type<any, NonZeroRationalNewtype> = new t.Type(
  'NonZeroRational',
  Tuple.is,
  (v, c) => Tuple.validate(v, c).map(([n, d]) => reduce(n, d)),
  Tuple.serialize
)
