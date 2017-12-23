import { Newtype } from 'newtype-ts'
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

export const unwrap: (i: NonZeroInteger) => BigInteger = integer.unwrap as any

export const fromInteger = (i: Integer): Option<NonZeroInteger> => (integer.isZero(i) ? none : some(i as any))

export const add: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = integer.add as any

export const mul: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = integer.mul as any

export const one: NonZeroInteger = integer.one as any

export const negate: (x: NonZeroInteger) => NonZeroInteger = integer.negate as any

export const sub = (x: NonZeroInteger, y: NonZeroInteger): Option<NonZeroInteger> => {
  return fromInteger(integer.sub(x, y))
}

export const div: (x: NonZeroInteger, y: NonZeroInteger) => NonZeroInteger = integer.div as any

export const sign: (i: NonZeroInteger) => -1 | 1 = integer.sign as any

const unsafeWrap: (bi: BigInteger) => NonZeroInteger = integer.wrap as any

export const gcd = (x: Integer, y: NonZeroInteger): NonZeroInteger =>
  unsafeWrap(bigInteger.gcd(integer.unwrap(x), unwrap(y)))

export const lcm = (x: NonZeroInteger, y: NonZeroInteger): NonZeroInteger =>
  unsafeWrap(bigInteger.lcm(unwrap(x), unwrap(y)))

export const setoid: Setoid<NonZeroInteger> = integer.setoid as any

export const ord: Ord<NonZeroInteger> = integer.ord as any

export const show: (x: NonZeroInteger) => string = integer.show as any
