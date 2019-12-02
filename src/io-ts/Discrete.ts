import { Type } from 'io-ts'
import { Discrete } from '../Discrete'
import { Integer } from './Integer'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'

/**
 * @since 0.1.2
 */
export const getDiscrete = <D extends string, U extends string>(
  dimension: D,
  unit: U
): Type<Discrete<D, U>, string, unknown> => {
  const format = { dimension, unit }
  return new Type(
    'Discrete',
    (m): m is Discrete<D, U> => m instanceof Discrete && m.format.dimension === dimension && m.format.unit === unit,
    (m, c) =>
      pipe(
        Integer.validate(m, c),
        E.map(r => new Discrete(format, r))
      ),
    a => Integer.encode(a.value)
  )
}
