import { Newtype, unsafeCoerce } from 'newtype-ts'
import { PositiveRational } from './PositiveRational'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Dense } from './Dense'
import * as positiveRational from './PositiveRational'

export interface ExchangeRate<S, D> extends Newtype<['ExchangeRate', S, D], PositiveRational> {}

export const wrap: <S, D>(r: PositiveRational) => ExchangeRate<S, D> = unsafeCoerce

export const unwrap: <S, D>(er: ExchangeRate<S, D>) => PositiveRational = unsafeCoerce

export const exchange = <S extends string, D extends string>(er: ExchangeRate<S, D>) => (d: Dense<S>): Dense<D> => {
  return unsafeCoerce(d.mul(unwrap(er)))
}

export function compose<A, B, C>(bc: ExchangeRate<B, C>, ab: ExchangeRate<A, B>): ExchangeRate<A, C> {
  return wrap(positiveRational.mul(unwrap(bc), unwrap(ab)))
}

export const getSetoid = <S, D>(): Setoid<ExchangeRate<S, D>> => unsafeCoerce(positiveRational.setoid)

export const getOrd = <S, D>(): Ord<ExchangeRate<S, D>> => unsafeCoerce(positiveRational.ord)
