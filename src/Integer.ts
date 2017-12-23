import { Newtype } from 'newtype-ts'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { BigInteger } from 'big-integer'
import { Ordering } from 'fp-ts/lib/Ordering'
import { NonZeroInteger } from './NonZeroInteger'
import * as bigInteger from './BigInteger'
import { Option } from 'fp-ts/lib/Option'

export interface Integer extends Newtype<{ Integer: true }, BigInteger> {}

export const fromInput = (x: number | string): Option<Integer> => bigInteger.wrap(x).map(wrap)

export const wrap = (bi: BigInteger): Integer => bi as any

export const unwrap = (i: Integer): BigInteger => i as any

export const add = (x: Integer, y: Integer): Integer => wrap(unwrap(x).add(unwrap(y)))

export const mul = (x: Integer, y: Integer): Integer => wrap(unwrap(x).times(unwrap(y)))

export const one: Integer = wrap(bigInteger.one)

export const negate = (x: Integer): Integer => wrap(unwrap(x).negate())

export const sub = (x: Integer, y: Integer): Integer => wrap(unwrap(x).subtract(unwrap(y)))

export const zero: Integer = wrap(bigInteger.zero)

export const div = (x: Integer, y: NonZeroInteger): Integer => wrap(unwrap(x).divide(unwrap(y)))

export const setoid: Setoid<Integer> = {
  equals: x => y => unwrap(x).equals(unwrap(y))
}

export const isZero: (i: Integer) => boolean = setoid.equals(zero)

export const sign = (i: Integer): -1 | 0 | 1 => unwrap(i).compare(bigInteger.zero) as any

const fromNumber = (n: number): Ordering => (n <= -1 ? 'LT' : n >= 1 ? 'GT' : 'EQ')

export const ord: Ord<Integer> = {
  ...setoid,
  compare: x => y => fromNumber(unwrap(x).compare(unwrap(y)))
}

export const show = (x: Integer): string => unwrap(x).toString()
