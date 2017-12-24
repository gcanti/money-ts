import * as t from 'io-ts'
import { Natural } from './Natural'
import { PositiveRational as PositiveRationalNewtype, reduce } from '../PositiveRational'

const Tuple = t.tuple([Natural, Natural])

export const PositiveRational: t.Type<any, PositiveRationalNewtype> = new t.Type(
  'PositiveRational',
  Tuple.is,
  (v, c) => Tuple.validate(v, c).map(([n, d]) => reduce(n, d)),
  Tuple.serialize
)
