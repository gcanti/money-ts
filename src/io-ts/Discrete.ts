import { Type, mixed } from 'io-ts'
import { Discrete } from '../Discrete'
import { Integer } from './Integer'

export const getDiscrete = <D extends string, U extends string>(
  dimension: D,
  unit: U
): Type<Discrete<D, U>, string, mixed> => {
  const format = { dimension, unit }
  return new Type(
    'Discrete',
    (m): m is Discrete<D, U> => m instanceof Discrete && m.format.dimension === dimension && m.format.unit === unit,
    (m, c) => Integer.validate(m, c).map(r => new Discrete(format, r)),
    a => Integer.encode(a.value)
  )
}
