import { Integer } from './Integer'
import { Natural } from './Natural'
import { NonZeroRational } from './NonZeroRational'
import { Setoid, getProductSetoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import * as bigInteger from './BigInteger'
import * as integer from './Integer'
import * as natural from './Natural'
import * as nonZeroInteger from './NonZeroInteger'
import { unsafeCoerce } from 'newtype-ts'

export type Rational = [Integer, Natural]

export function fromInteger(x: Integer): Rational {
  return [x, natural.one]
}

export function isZero(x: Rational): boolean {
  return integer.isZero(x[0])
}

export function reduce(n: Integer, d: Natural): Rational {
  return nonZeroInteger.fromInteger(n).fold<Rational>(
    () => zero,
    n => {
      const divisor = natural.gcd(nonZeroInteger.abs(n), d)
      const n2 = integer.div(n, divisor)
      const d2 = natural.div(d, divisor)
      return [n2, d2]
    }
  )
}

export function add([nx, dx]: Rational, [ny, dy]: Rational): Rational {
  const multiple = natural.lcm(dx, dy)
  const a = natural.div(multiple, dx)
  const b = natural.div(multiple, dy)
  const xa = integer.mul(nx, a)
  const xb = integer.mul(ny, b)
  return reduce(integer.add(xa, xb), multiple)
}

export const zero: Rational = [integer.zero, natural.one]

export function mul(x: Rational, y: Rational): Rational {
  return reduce(integer.mul(x[0], y[0]), natural.mul(x[1], y[1]))
}

export const one: Rational = [integer.one, natural.one]

export function negate(x: Rational): Rational {
  return [integer.negate(x[0]), x[1]]
}

export function sub(x: Rational, y: Rational): Rational {
  return add(x, negate(y))
}

export function div(x: Rational, y: NonZeroRational): Rational {
  const ny = nonZeroInteger.abs(y[0])
  const n = integer.mul(x[0], y[1])
  return reduce(integer.isPositive(y[0]) ? n : integer.negate(n), natural.mul(x[1], ny))
}

export function sign(x: Rational): -1 | 0 | 1 {
  return integer.sign(x[0])
}

export function floor(x: Rational): Integer {
  const n = integer.unwrap(x[0])
  const d = integer.unwrap(x[1])
  const divmod = n.divmod(d)
  if (divmod.remainder.isZero() || sign(x) >= 0) {
    return integer.wrap(divmod.quotient)
  } else {
    return integer.wrap(divmod.quotient.prev())
  }
}

const semi: Rational = unsafeCoerce([bigInteger.one, bigInteger.two])

export function round(x: Rational): Integer {
  return floor(add(x, semi))
}

export function ceil(x: Rational): Integer {
  const n = integer.unwrap(x[0])
  const d = integer.unwrap(x[1])
  const divmod = n.divmod(d)
  if (divmod.remainder.isZero() || sign(x) < 0) {
    return integer.wrap(divmod.quotient)
  } else {
    return integer.wrap(divmod.quotient.next())
  }
}

export function trunc(x: Rational): Integer {
  if (sign(x) >= 0) {
    return floor(x)
  } else {
    return ceil(x)
  }
}

export const setoid: Setoid<Rational> = getProductSetoid(integer.setoid, natural.setoid)

export const ord: Ord<Rational> = {
  ...setoid,
  compare: ([nx, dx]) => ([ny, dy]) => {
    if (integer.setoid.equals(dx)(dy)) {
      return integer.ord.compare(nx)(ny)
    } else {
      return integer.ord.compare(integer.mul(nx, dy))(integer.mul(ny, dx))
    }
  }
}

export const show = (x: Rational): string => `${integer.show(x[0])} / ${natural.show(x[1])}`
