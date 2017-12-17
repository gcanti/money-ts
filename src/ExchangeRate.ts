import { Newtype } from 'newtype-ts'
import { Rational } from './Rational'
import { NonZeroRational } from './NonZeroRational'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Dense } from './Dense'
import * as nonZeroRational from './NonZeroRational'
import * as dense from './Dense'

export interface ExchangeRate<Source, Destination>
  extends Newtype<['ExchangeRate', Source, Destination], NonZeroRational> {}

export function fromNonZeroRational<Source, Destination>(r: NonZeroRational): ExchangeRate<Source, Destination> {
  return r as any
}

export function toNonZeroRational<Source, Destination>(er: ExchangeRate<Source, Destination>): NonZeroRational {
  return er as any
}

export function toRational<Source, Destination>(er: ExchangeRate<Source, Destination>): Rational {
  return er as any
}

export const exchange = <Source, Destination>(er: ExchangeRate<Source, Destination>) => (
  d: Dense<Source>
): Dense<Destination> => {
  return dense.mul(d, toRational(er)) as any
}

export const compose = <A, B, C>(bc: ExchangeRate<B, C>, ab: ExchangeRate<A, B>): ExchangeRate<A, C> => {
  return fromNonZeroRational(
    nonZeroRational.simplify(nonZeroRational.mul(toNonZeroRational(bc), toNonZeroRational(ab)))
  )
}

export const getSetoid = <Source, Destination>(): Setoid<ExchangeRate<Source, Destination>> =>
  nonZeroRational.setoidNonZeroRational as any

export const getOrd = <Source, Destination>(): Ord<ExchangeRate<Source, Destination>> =>
  nonZeroRational.ordNonZeroRational as any
