import { Newtype } from 'newtype-ts'
import { PositiveRational } from './PositiveRational'
import { Eq } from 'fp-ts/Eq'
import { Ord } from 'fp-ts/Ord'
import { Dense } from './Dense'
import * as positiveRational from './PositiveRational'
import { unsafeCoerce } from 'fp-ts/function'

export interface ExchangeRate<S, D> extends Newtype<['ExchangeRate', S, D], PositiveRational> {}

export const wrap: <S, D>(r: PositiveRational) => ExchangeRate<S, D> = unsafeCoerce

export const unwrap: <S, D>(er: ExchangeRate<S, D>) => PositiveRational = unsafeCoerce

export const exchange = <S extends string, D extends string>(er: ExchangeRate<S, D>) => (d: Dense<S>): Dense<D> => {
  return unsafeCoerce(d.mul(unwrap(er)))
}

export function compose<A, B, C>(bc: ExchangeRate<B, C>, ab: ExchangeRate<A, B>): ExchangeRate<A, C> {
  return wrap(positiveRational.mul(unwrap(bc), unwrap(ab)))
}

export const getEq = <S, D>(): Eq<ExchangeRate<S, D>> => unsafeCoerce(positiveRational.eq)

export const getOrd = <S, D>(): Ord<ExchangeRate<S, D>> => unsafeCoerce(positiveRational.ord)
