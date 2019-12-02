import { unsafeCoerce } from 'fp-ts/lib/function'
import { Ord } from 'fp-ts/lib/Ord'
import { Newtype } from 'newtype-ts'
import { Dense } from './Dense'
import * as PR from './PositiveRational'

import PositiveRational = PR.PositiveRational

/**
 * @since 0.1.2
 */
export interface ExchangeRate<S, D> extends Newtype<['ExchangeRate', S, D], PositiveRational> {}

/**
 * @since 0.1.2
 */
export const wrap: <S, D>(r: PositiveRational) => ExchangeRate<S, D> = unsafeCoerce

/**
 * @since 0.1.2
 */
export const unwrap: <S, D>(er: ExchangeRate<S, D>) => PositiveRational = unsafeCoerce

/**
 * @since 0.1.2
 */
export const exchange = <S extends string, D extends string>(er: ExchangeRate<S, D>) => (d: Dense<S>): Dense<D> => {
  return unsafeCoerce(d.mul(unwrap(er)))
}

/**
 * @since 0.1.2
 */
export function compose<A, B, C>(bc: ExchangeRate<B, C>, ab: ExchangeRate<A, B>): ExchangeRate<A, C> {
  return wrap(PR.mul(unwrap(bc), unwrap(ab)))
}

/**
 * @since 0.1.2
 */
export const getOrd = <S, D>(): Ord<ExchangeRate<S, D>> => unsafeCoerce(PR.ord)
