import { Type, mixed } from 'io-ts'
import { Dense } from '../Dense'
import { Rational } from './Rational'

export const getDense = <D extends string>(dimension: D): Type<Dense<D>, [string, string], mixed> =>
  new Type(
    'Dense',
    (m): m is Dense<D> => m instanceof Dense && m.dimension === dimension,
    (m, c) => Rational.validate(m, c).map(r => new Dense(dimension, r)),
    a => Rational.encode(a.value)
  )
