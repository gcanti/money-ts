import { Natural } from './Natural'
import * as O from 'fp-ts/Option'
import { Eq } from 'fp-ts/Eq'
import { Ord } from 'fp-ts/Ord'
import { Rational } from './Rational'
import * as rational from './Rational'
import * as nonZeroRational from './NonZeroRational'
import * as natural from './Natural'
import { pipe, unsafeCoerce } from 'fp-ts/function'

export type PositiveRational = [Natural, Natural]

export function fromRational(r: Rational): O.Option<PositiveRational> {
  return pipe(
    natural.fromInteger(r[0]),
    O.map((n): PositiveRational => [n, r[1]])
  )
}

export const reduce: (n: Natural, d: Natural) => PositiveRational = unsafeCoerce(rational.reduce)

export const add: (x: PositiveRational, y: PositiveRational) => PositiveRational = unsafeCoerce(rational.add)

export const mul: (x: PositiveRational, y: PositiveRational) => PositiveRational = unsafeCoerce(rational.mul)

export const one: PositiveRational = unsafeCoerce(rational.one)

export function sub(x: PositiveRational, y: PositiveRational): O.Option<PositiveRational> {
  return fromRational(rational.sub(x, y))
}

export const div: (x: PositiveRational, y: PositiveRational) => PositiveRational = unsafeCoerce(rational.div)

export const inverse: (x: PositiveRational) => PositiveRational = unsafeCoerce(nonZeroRational.inverse)

export const eq: Eq<PositiveRational> = rational.eq

export const ord: Ord<PositiveRational> = rational.ord

export const show: (x: PositiveRational) => string = rational.show
