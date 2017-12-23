import { Integer } from './Integer'
import { NonZeroInteger } from './NonZeroInteger'
import { NonZeroRational } from './NonZeroRational'
import { Setoid, getProductSetoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'
import * as integer from './Integer'
import * as nonZeroInteger from './NonZeroInteger'
import { Option } from 'fp-ts/lib/Option'
import { fromSome } from './scale/fromSome'
import { unsafeCoerce } from 'newtype-ts'

export type Rational = [Integer, NonZeroInteger]

export function fromInput([x, y]: [number | string, number | string]): Option<Rational> {
  const on = integer.fromInput(x)
  const od = nonZeroInteger.fromInput(y)
  return od.ap(on.map(n => (d: NonZeroInteger) => reduce(n, d)))
}

export function fromInteger(n: Integer): Rational {
  return [n, nonZeroInteger.one]
}

export function isZero(r: Rational): boolean {
  return integer.isZero(r[0])
}

export const reduce = (n: Integer, d: NonZeroInteger): Rational => {
  const divisor = nonZeroInteger.gcd(n, d)
  const n2 = integer.div(n, divisor)
  const d2 = nonZeroInteger.div(d, divisor)
  return [n2, d2]
}

export function add([nx, dx]: Rational, [ny, dy]: Rational): Rational {
  const multiple = nonZeroInteger.lcm(dx, dy)
  const a = integer.div(multiple, dx)
  const b = integer.div(multiple, dy)
  const xa = integer.mul(nx, a)
  const xb = integer.mul(ny, b)
  return reduce(integer.add(xa, xb), multiple)
}

export const zero: Rational = [integer.zero, nonZeroInteger.one]

export function mul(x: Rational, y: Rational): Rational {
  return reduce(integer.mul(x[0], y[0]), nonZeroInteger.mul(x[1], y[1]))
}

export const one: Rational = [integer.one, nonZeroInteger.one]

export function negate(x: Rational): Rational {
  return [integer.negate(x[0]), x[1]]
}

export function sub(x: Rational, y: Rational): Rational {
  return add(x, negate(y))
}

export function div(x: Rational, y: NonZeroRational): Rational {
  return reduce(integer.mul(x[0], y[1]), nonZeroInteger.mul(x[1], y[0]))
}

export const sign = ([n, d]: Rational): -1 | 0 | 1 => unsafeCoerce(integer.sign(n) * nonZeroInteger.sign(d))

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

const semi: Rational = fromSome(fromInput([1, 2]))

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

export const setoid: Setoid<Rational> = getProductSetoid(integer.setoid, nonZeroInteger.setoid)

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

export const show = (x: Rational): string => `${integer.show(x[0])} / ${nonZeroInteger.show(x[1])}`
