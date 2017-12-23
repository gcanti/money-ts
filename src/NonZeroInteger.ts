import { Newtype, unsafeCoerce } from 'newtype-ts'
import { Option, none, some } from 'fp-ts/lib/Option'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Integer } from './Integer'
import { BigInteger } from 'big-integer'
import * as integer from './Integer'
import * as bigInteger from './BigInteger'

export interface NonZeroInteger extends Newtype<{ Integer: true; NonZeroInteger: true }, BigInteger> {}

export const fromInput = (x: number | string): Option<NonZeroInteger> => bigInteger.wrap(x).chain(wrap)

export const wrap = (bi: BigInteger): Option<NonZeroInteger> => fromInteger(integer.wrap(bi))

export const unwrap: (i: NonZeroInteger) => BigInteger = unsafeCoerce

export const fromInteger = (i: Integer): Option<NonZeroInteger> => (integer.isZero(i) ? none : some(unsafeCoerce(i)))

export const add: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = unsafeCoerce(integer.add)

export const mul: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = unsafeCoerce(integer.mul)

export const one: NonZeroInteger = unsafeCoerce(integer.one)

export const negate: (x: NonZeroInteger) => NonZeroInteger = unsafeCoerce(integer.negate)

export const sub = (x: NonZeroInteger, y: NonZeroInteger): Option<NonZeroInteger> => {
  return fromInteger(integer.sub(x, y))
}

export const div: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = unsafeCoerce(integer.div)

export const sign: (i: NonZeroInteger) => -1 | 1 = unsafeCoerce(integer.sign)

const unsafeWrap: (bi: BigInteger) => NonZeroInteger = unsafeCoerce(integer.wrap)

export const gcd = (x: Integer, y: NonZeroInteger): NonZeroInteger =>
  unsafeWrap(bigInteger.gcd(integer.unwrap(x), unwrap(y)))

export const lcm = (x: NonZeroInteger, y: NonZeroInteger): NonZeroInteger =>
  unsafeWrap(bigInteger.lcm(unwrap(x), unwrap(y)))

export const setoid: Setoid<NonZeroInteger> = unsafeCoerce(integer.setoid)

export const ord: Ord<NonZeroInteger> = unsafeCoerce(integer.ord)

export const show: (x: NonZeroInteger) => string = unsafeCoerce(integer.show)
