import { Type } from 'io-ts'
import { Dense } from '../Dense'
import { Rational } from './Rational'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'

/**
 * @since 0.1.2
 */
export const getDense = <D extends string>(dimension: D): Type<Dense<D>, [string, string], unknown> =>
  new Type(
    'Dense',
    (m): m is Dense<D> => m instanceof Dense && m.dimension === dimension,
    (m, c) =>
      pipe(
        Rational.validate(m, c),
        E.map(r => new Dense(dimension, r))
      ),
    a => Rational.encode(a.value)
  )
