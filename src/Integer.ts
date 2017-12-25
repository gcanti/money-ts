import { Newtype, unsafeCoerce } from 'newtype-ts'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord, lessThan } from 'fp-ts/lib/Ord'
import { BigInteger } from 'big-integer'
import { NonZeroInteger } from './NonZeroInteger'
import * as bigInteger from './BigInteger'
import { Ring } from 'fp-ts/lib/Ring'

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

export const setoid: Setoid<Integer> = unsafeCoerce(bigInteger.setoid)

export const isZero: (x: Integer) => boolean = setoid.equals(zero)

export function sign(x: Integer): -1 | 0 | 1 {
  return unsafeCoerce(unwrap(x).compare(bigInteger.zero))
}

export const ord: Ord<Integer> = unsafeCoerce(bigInteger.ord)

export const isPositive: (x: Integer) => boolean = lessThan(ord)(zero)

export function show(x: Integer): string {
  return unwrap(x).toString()
}

export const ring: Ring<Integer> = unsafeCoerce(bigInteger.ring)
