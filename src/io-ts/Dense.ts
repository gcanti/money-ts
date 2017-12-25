import * as t from 'io-ts'
import { Dense } from '../Dense'
import { Rational } from './Rational'

export const getDense = <D extends string>(dimension: D): t.Type<any, Dense<D>> =>
  new t.Type(
    'Dense',
    (v): v is Dense<D> => v instanceof Dense && v.dimension === dimension,
    (v, c) => Rational.validate(v, c).map(r => new Dense(dimension, r)),
    v => Rational.serialize(v.value)
  )
