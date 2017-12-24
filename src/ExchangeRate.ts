import { Newtype, unsafeCoerce } from 'newtype-ts'
import { NonZeroRational } from './NonZeroRational'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Dense } from './Dense'
import * as nonZeroRational from './NonZeroRational'

export interface ExchangeRate<S, D> extends Newtype<['ExchangeRate', S, D], NonZeroRational> {}

export const wrap: <S, D>(r: NonZeroRational) => ExchangeRate<S, D> = unsafeCoerce

export const unwrap: <S, D>(er: ExchangeRate<S, D>) => NonZeroRational = unsafeCoerce

export const exchange = <S extends string, D extends string>(er: ExchangeRate<S, D>) => (d: Dense<S>): Dense<D> => {
  return unsafeCoerce(d.mul(unwrap(er)))
}

export function compose<A, B, C>(bc: ExchangeRate<B, C>, ab: ExchangeRate<A, B>): ExchangeRate<A, C> {
  return wrap(nonZeroRational.mul(unwrap(bc), unwrap(ab)))
}

export const getSetoid = <S, D>(): Setoid<ExchangeRate<S, D>> => unsafeCoerce(nonZeroRational.setoid)

export const getOrd = <S, D>(): Ord<ExchangeRate<S, D>> => unsafeCoerce(nonZeroRational.ord)
