import { Prism } from 'monocle-ts'
import { Integer } from './Integer'
import { NonZeroInteger } from './NonZeroInteger'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import { none, some } from 'fp-ts/lib/Option'
import { NonZeroRational } from './NonZeroRational'

export type Rational = [Integer, NonZeroInteger]

export const prism: Prism<[number, number], Rational> = new Prism(t => {
  const [n, d] = t
  if (n % 1 !== 0 || d === 0) {
    return none
  } else {
    return some(t as any)
  }
}, r => r as any)

export function fromInteger(i: Integer): Rational {
  return [i, 1 as any]
}

const gcd = (a: number, b: number): number => {
  if (b === 0) {
    return a
  } else {
    return gcd(b, a % b)
  }
}

export function simplify(r: Rational): Rational {
  const [n, d] = prism.reverseGet(r)
  const gc = gcd(n, d)
  if (Math.abs(gc) === 1) {
    return r
  } else {
    return [n / gc, d / gc] as any
  }
}

export function isZero(r: Rational): boolean {
  return prism.reverseGet(r)[0] === 0
}

export function add(x: Rational, y: Rational): Rational {
  const [nx, dx] = prism.reverseGet(x)
  const [ny, dy] = prism.reverseGet(y)
  return [nx * dy + ny * dx, dx * dy] as any
}

export const zero: Rational = [0, 1] as any

export function mul(x: Rational, y: Rational): Rational {
  const [nx, dx] = prism.reverseGet(x)
  const [ny, dy] = prism.reverseGet(y)
  return [nx * ny, dx * dy] as any
}

export const one: Rational = [1, 1] as any

export function sub(x: Rational, y: Rational): Rational {
  const [nx, dx] = prism.reverseGet(x)
  const [ny, dy] = prism.reverseGet(y)
  return [nx * dy - ny * dx, dx * dy] as any
}

export function div(x: Rational, y: NonZeroRational): Rational {
  const [nx, dx] = prism.reverseGet(x)
  const [ny, dy] = prism.reverseGet(y as any)
  return [nx * dy, ny * dx] as any
}

export function mod(x: Rational, y: Rational): Rational {
  const [nx, dx] = prism.reverseGet(x)
  const [ny, dy] = prism.reverseGet(y)
  const d = nx * dy / (ny * dx)
  const n = Math.sign(d) * Math.floor(Math.abs(d))
  return sub(x, mul([n, 1] as any, y))
}

export const setoidRational: Setoid<Rational> = {
  equals: x => y => {
    const [xa, xb] = simplify(x)
    const [ya, yb] = simplify(y)
    return xa === ya && xb === yb
  }
}

export const ordRational: Ord<Rational> = {
  ...setoidRational,
  compare: x => y => {
    const [xa, xb] = simplify(x)
    const [ya, yb] = simplify(y)
    return xa < ya ? 'LT' : xa > ya ? 'GT' : xb < yb ? 'LT' : xb > yb ? 'GT' : 'EQ'
  }
}
