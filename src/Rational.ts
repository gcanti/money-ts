import { unsafeCoerce } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import { fromCompare, Ord } from 'fp-ts/lib/Ord'
import { pipe } from 'fp-ts/lib/pipeable'
import * as I from './Integer'
import * as N from './Natural'
import * as NZI from './NonZeroInteger'
import { NonZeroRational } from './NonZeroRational'

import Integer = I.Integer
import Natural = N.Natural

/**
 * @since 0.1.2
 */
export type Rational = [Integer, Natural]

/**
 * @since 0.1.2
 */
export function fromInteger(x: Integer): Rational {
  return [x, N.one]
}

/**
 * @since 0.1.2
 */
export function isZero(x: Rational): boolean {
  return I.isZero(x[0])
}

/**
 * @since 0.1.2
 */
export function reduce(n: Integer, d: Natural): Rational {
  return pipe(
    NZI.fromInteger(n),
    O.fold(
      () => zero,
      n => {
        const divisor = N.gcd(NZI.abs(n), d)
        const n2 = I.div(n, divisor)
        const d2 = N.div(d, divisor)
        return [n2, d2]
      }
    )
  )
}

/**
 * @since 0.1.2
 */
export function add([nx, dx]: Rational, [ny, dy]: Rational): Rational {
  const multiple = N.lcm(dx, dy)
  const a = N.div(multiple, dx)
  const b = N.div(multiple, dy)
  const xa = I.mul(nx, a)
  const xb = I.mul(ny, b)
  return reduce(I.add(xa, xb), multiple)
}

/**
 * @since 0.1.2
 */
export const zero: Rational = [I.zero, N.one]

/**
 * @since 0.1.2
 */
export function mul(x: Rational, y: Rational): Rational {
  return reduce(I.mul(x[0], y[0]), N.mul(x[1], y[1]))
}

/**
 * @since 0.1.2
 */
export const one: Rational = [I.one, N.one]

/**
 * @since 0.1.2
 */
export function negate(x: Rational): Rational {
  return [I.negate(x[0]), x[1]]
}

/**
 * @since 0.1.2
 */
export function sub(x: Rational, y: Rational): Rational {
  return add(x, negate(y))
}

/**
 * @since 0.1.2
 */
export function div(x: Rational, y: NonZeroRational): Rational {
  const ny = NZI.abs(y[0])
  const n = I.mul(x[0], y[1])
  return reduce(I.isPositive(y[0]) ? n : I.negate(n), N.mul(x[1], ny))
}

/**
 * @since 0.1.2
 */
export function sign(x: Rational): -1 | 0 | 1 {
  return I.sign(x[0])
}

/**
 * @since 0.1.2
 */
export function floor(x: Rational): Integer {
  const n = I.unwrap(x[0])
  const d = I.unwrap(x[1])
  const quotient = n / d
  const remainder = n % d
  if (remainder === 0n || sign(x) >= 0) {
    return I.wrap(quotient)
  } else {
    return I.wrap(quotient - 1n)
  }
}

/**
 * @since 0.1.2
 */
const semi: Rational = unsafeCoerce([1n, 2n])

/**
 * @since 0.1.2
 */
export function round(x: Rational): Integer {
  return floor(add(x, semi))
}

/**
 * @since 0.1.2
 */
export function ceil(x: Rational): Integer {
  const n = I.unwrap(x[0])
  const d = I.unwrap(x[1])
  const quotient = n / d
  const remainder = n % d
  if (remainder === 0n || sign(x) < 0) {
    return I.wrap(quotient)
  } else {
    return I.wrap(quotient + 1n)
  }
}

/**
 * @since 0.1.2
 */
export function trunc(x: Rational): Integer {
  if (sign(x) >= 0) {
    return floor(x)
  } else {
    return ceil(x)
  }
}

/**
 * @since 0.1.2
 */
export const ord: Ord<Rational> = fromCompare(([nx, dx], [ny, dy]) => {
  if (I.integer.equals(dx, dy)) {
    return I.integer.compare(nx, ny)
  } else {
    return I.integer.compare(I.mul(nx, dy), I.mul(ny, dx))
  }
})

/**
 * @since 0.1.2
 */
export const show = (x: Rational): string => `${I.show(x[0])} / ${N.show(x[1])}`
