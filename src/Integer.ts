import { Newtype } from 'newtype-ts'
import * as EQ from 'fp-ts/Eq'
import * as ORD from 'fp-ts/Ord'
import { BigInteger } from 'big-integer'
import { NonZeroInteger } from './NonZeroInteger'
import * as bigInteger from './BigInteger'
import * as R from 'fp-ts/Ring'
import { unsafeCoerce } from 'fp-ts/function'

export interface Integer extends Newtype<{ Integer: true }, BigInteger> {}

export const wrap: (x: BigInteger) => Integer = unsafeCoerce

export const unwrap: (x: Integer) => BigInteger = unsafeCoerce

export const add: (x: Integer, y: Integer) => Integer = unsafeCoerce(bigInteger.add)

export const mul: (x: Integer, y: Integer) => Integer = unsafeCoerce(bigInteger.mul)

export const one: Integer = wrap(bigInteger.one)

export const negate: (x: Integer) => Integer = unsafeCoerce(bigInteger.negate)

export const sub: (x: Integer, y: Integer) => Integer = unsafeCoerce(bigInteger.sub)

export const zero: Integer = wrap(bigInteger.zero)

export function div(x: Integer, y: NonZeroInteger): Integer {
  return wrap(unwrap(x).divide(unwrap(y)))
}

export const Eq: EQ.Eq<Integer> = unsafeCoerce(bigInteger.Eq)

export const isZero = (x: Integer): boolean => Eq.equals(zero, x)

export function sign(x: Integer): -1 | 0 | 1 {
  return unsafeCoerce(unwrap(x).compare(bigInteger.zero))
}

export const Ord: ORD.Ord<Integer> = unsafeCoerce(bigInteger.Ord)

const lessThanO = ORD.lt(Ord)

export const isPositive = (x: Integer): boolean => lessThanO(zero, x)

export function show(x: Integer): string {
  return unwrap(x).toString()
}

export const Ring: R.Ring<Integer> = unsafeCoerce(bigInteger.Ring)
