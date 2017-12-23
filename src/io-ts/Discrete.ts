import * as t from 'io-ts'
import { Discrete } from '../Discrete'
import { Integer } from './Integer'

export const getDiscrete = <D extends string, U extends string>(dimension: D, unit: U): t.Type<any, Discrete<D, U>> => {
  const format = { dimension, unit }
  return new t.Type(
    'Discrete',
    (v): v is Discrete<D, U> => v instanceof Discrete,
    (v, c) => Integer.validate(v, c).map(r => new Discrete(format, r)),
    v => Integer.serialize(v.value)
  )
}
