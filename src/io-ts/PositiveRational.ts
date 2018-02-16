import { Type, mixed, tuple } from 'io-ts'
import { Natural } from './Natural'
import { PositiveRational as PositiveRationalNewtype, reduce } from '../PositiveRational'

const PR = tuple([Natural, Natural])

export const PositiveRational: Type<PositiveRationalNewtype, [string, string], mixed> = new Type(
  'PositiveRational',
  PR.is,
  (m, c) => PR.validate(m, c).map(([n, d]) => reduce(n, d)),
  PR.encode
)
