import { Newtype, unsafeCoerce } from 'newtype-ts'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord, lessThan } from 'fp-ts/lib/Ord'
import { BigInteger } from 'big-integer'
import { Ordering } from 'fp-ts/lib/Ordering'
import { NonZeroInteger } from './NonZeroInteger'
import * as bigInteger from './BigInteger'
import { Option } from 'fp-ts/lib/Option'

export interface Integer extends Newtype<{ Integer: true }, BigInteger> {}

export function fromInput(x: number | string): Option<Integer> {
  return bigInteger.wrap(x).map(wrap)
}

export const wrap: (x: BigInteger) => Integer = unsafeCoerce

export const unwrap: (x: Integer) => BigInteger = unsafeCoerce

export function add(x: Integer, y: Integer): Integer {
  return wrap(unwrap(x).add(unwrap(y)))
}

export function mul(x: Integer, y: Integer): Integer {
  return wrap(unwrap(x).times(unwrap(y)))
}

export const one: Integer = wrap(bigInteger.one)

export function negate(x: Integer): Integer {
  return wrap(unwrap(x).negate())
}

export function sub(x: Integer, y: Integer): Integer {
  return wrap(unwrap(x).subtract(unwrap(y)))
}

export const zero: Integer = wrap(bigInteger.zero)

export function div(x: Integer, y: NonZeroInteger): Integer {
  return wrap(unwrap(x).divide(unwrap(y)))
}

export const setoid: Setoid<Integer> = {
  equals: x => y => unwrap(x).equals(unwrap(y))
}

export const isZero: (x: Integer) => boolean = setoid.equals(zero)

export function sign(x: Integer): -1 | 0 | 1 {
  return unsafeCoerce(unwrap(x).compare(bigInteger.zero))
}

function fromNumber(x: number): Ordering {
  return x <= -1 ? 'LT' : x >= 1 ? 'GT' : 'EQ'
}

export const ord: Ord<Integer> = {
  ...setoid,
  compare: x => y => fromNumber(unwrap(x).compare(unwrap(y)))
}

export const isPositive: (x: Integer) => boolean = lessThan(ord)(zero)

export function show(x: Integer): string {
  return unwrap(x).toString()
}
