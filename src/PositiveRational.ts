import { Natural } from './Natural'
import { Option } from 'fp-ts/lib/Option'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Rational } from './Rational'
import * as rational from './Rational'
import * as nonZeroRational from './NonZeroRational'
import * as natural from './Natural'
import { unsafeCoerce } from 'newtype-ts'

export type PositiveRational = [Natural, Natural]

export function fromInput(input: [number | string, number | string]): Option<PositiveRational> {
  return rational.fromInput(input).chain(fromRational)
}

export function fromRational(r: Rational): Option<PositiveRational> {
  return natural.fromInteger(r[0]).map((n): PositiveRational => [n, r[1]])
}

export const reduce: (n: Natural, d: Natural) => PositiveRational = unsafeCoerce(rational.reduce)

export const add: (x: PositiveRational, y: PositiveRational) => PositiveRational = unsafeCoerce(rational.add)

export const mul: (x: PositiveRational, y: PositiveRational) => PositiveRational = unsafeCoerce(rational.mul)

export const one: PositiveRational = unsafeCoerce(rational.one)

export function sub(x: PositiveRational, y: PositiveRational): Option<PositiveRational> {
  return fromRational(rational.sub(x, y))
}

export const div: (x: PositiveRational, y: PositiveRational) => PositiveRational = unsafeCoerce(rational.div)

export const inverse: (x: PositiveRational) => PositiveRational = unsafeCoerce(nonZeroRational.inverse)

export const setoid: Setoid<PositiveRational> = rational.setoid

export const ord: Ord<PositiveRational> = rational.ord

export const show: (x: PositiveRational) => string = rational.show
