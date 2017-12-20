import { Integer } from './Integer'
import { NonZeroInteger } from './NonZeroInteger'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Option, none, some } from 'fp-ts/lib/Option'
import { NonZeroRational } from './NonZeroRational'
import * as integer from './Integer'
import * as nonZeroInteger from './NonZeroInteger'

export type Rational = [Integer, NonZeroInteger]

const isRationalTuple = (t: [number, number]): boolean =>
  t[1] !== 0 && integer.isInteger(t[0]) && integer.isInteger(t[1])

export const fromTuple = (t: [number, number]): Option<Rational> => (isRationalTuple(t) ? some(t as any) : none)

export const toTuple = (r: Rational): [number, number] => r as any

export function fromInteger(i: Integer): Rational {
  return [i, nonZeroInteger.one]
}

export const fromNonZeroRational = (nzr: NonZeroRational): Rational => nzr as any

export const toNonZeroRational = (r: Rational): Option<NonZeroRational> => (isZero(r) ? none : some(r as any))

const gcd = (a: number, b: number): number => {
  if (b === 0) {
    return a
  } else {
    return gcd(b, a % b)
  }
}

export function simplify(r: Rational): Rational {
  const [n, d] = toTuple(r)
  const gc = gcd(n, d)
  if (Math.abs(gc) === 1) {
    return r
  } else {
    return [integer.unsafeFromNumber(n / gc), nonZeroInteger.unsafeFromNumber(d / gc)]
  }
}

export function numerator(r: Rational): number {
  return toTuple(r)[0]
}

export function denominator(r: Rational): number {
  return toTuple(r)[1]
}

export function isZero(r: Rational): boolean {
  return numerator(r) === 0
}

export function add(x: Rational, y: Rational): Rational {
  const [nx, dx] = toTuple(x)
  const [ny, dy] = toTuple(y)
  return [integer.unsafeFromNumber(nx * dy + ny * dx), nonZeroInteger.unsafeFromNumber(dx * dy)]
}

export const zero: Rational = [integer.zero, nonZeroInteger.one]

export function mul(x: Rational, y: Rational): Rational {
  const [nx, dx] = toTuple(x)
  const [ny, dy] = toTuple(y)
  return [integer.unsafeFromNumber(nx * ny), nonZeroInteger.unsafeFromNumber(dx * dy)]
}

export const one: Rational = [integer.one, nonZeroInteger.one]

export function sub(x: Rational, y: Rational): Rational {
  const [nx, dx] = toTuple(x)
  const [ny, dy] = toTuple(y)
  return [integer.unsafeFromNumber(nx * dy - ny * dx), nonZeroInteger.unsafeFromNumber(dx * dy)]
}

export function div(x: Rational, y: NonZeroRational): Rational {
  const [nx, dx] = toTuple(x)
  const [ny, dy] = toTuple(fromNonZeroRational(y))
  return [integer.unsafeFromNumber(nx * dy), nonZeroInteger.unsafeFromNumber(ny * dx)]
}

export function div_(x: Rational, y: Rational): Option<Rational> {
  return toNonZeroRational(y).map(y => div(x, y))
}

export const setoidRational: Setoid<Rational> = {
  equals: x => y => {
    const [nx, dx] = simplify(x)
    const [ny, dy] = simplify(y)
    return nx === ny && dx === dy
  }
}

export const ordRational: Ord<Rational> = {
  ...setoidRational,
  compare: x => y => {
    const [nx, dx] = simplify(x)
    const [ny, dy] = simplify(y)
    return nx < ny ? 'LT' : nx > ny ? 'GT' : dx < dy ? 'LT' : dx > dy ? 'GT' : 'EQ'
  }
}
