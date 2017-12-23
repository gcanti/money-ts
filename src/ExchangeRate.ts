import { Newtype } from 'newtype-ts'
import { Rational } from './Rational'
import { NonZeroRational } from './NonZeroRational'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Dense } from './Dense'
import * as nonZeroRational from './NonZeroRational'
import * as dense from './Dense'

export interface ExchangeRate<S, D> extends Newtype<['ExchangeRate', S, D], NonZeroRational> {}

export function wrap<S, D>(r: NonZeroRational): ExchangeRate<S, D> {
  return r as any
}

export function unwrap<S, D>(er: ExchangeRate<S, D>): NonZeroRational {
  return er as any
}

export function toRational<S, D>(er: ExchangeRate<S, D>): Rational {
  return er as any
}

export const exchange = <S, D>(er: ExchangeRate<S, D>) => (d: Dense<S>): Dense<D> => {
  return dense.mul(d, toRational(er)) as any
}

export const compose = <A, B, C>(bc: ExchangeRate<B, C>, ab: ExchangeRate<A, B>): ExchangeRate<A, C> => {
  return wrap(nonZeroRational.mul(unwrap(bc), unwrap(ab)))
}

export const getSetoid = <S, D>(): Setoid<ExchangeRate<S, D>> => nonZeroRational.setoid as any

export const getOrd = <S, D>(): Ord<ExchangeRate<S, D>> => nonZeroRational.ord as any
