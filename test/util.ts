import * as assert from 'assert'
import { check, Property, gen, Generator, property } from 'testcheck'
import { Natural } from '../src/Natural'
import { Integer } from '../src/Integer'
import { NonZeroInteger } from '../src/NonZeroInteger'
import { Rational } from '../src/Rational'
import { NonZeroRational } from '../src/NonZeroRational'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Option, getSetoid } from 'fp-ts/lib/Option'
import { BigInteger } from 'big-integer'
import { unsafeCoerce } from 'newtype-ts'
import * as bigInteger from '../src/BigInteger'
import * as integer from '../src/Integer'
import * as nonZeroInteger from '../src/NonZeroInteger'
import * as natural from '../src/Natural'
import * as rational from '../src/Rational'
import * as nonZeroRational from '../src/NonZeroRational'
import { Dense } from '../src/Dense'
import * as dense from '../src/Dense'
import { Discrete } from '../src/Discrete'
import * as discrete from '../src/Discrete'
import { PositiveRational } from '../src/PositiveRational'
import * as positiveRational from '../src/PositiveRational'
import { Semiring } from 'fp-ts/lib/Semiring'
import { Ring } from 'fp-ts/lib/Ring'
import { Ord } from 'fp-ts/lib/Ord'

const fromSome = <A>(fa: Option<A>): A =>
  fa.getOrElse(() => {
    throw new Error('fromSome called with None')
  })

export function getAssertEqual<A>(S: Setoid<A>): (x: A, y: A) => void {
  return function assertEqual(x: A, y: A): void {
    if (!S.equals(x)(y)) {
      assert.fail(`${x} !== ${y}`)
    }
  }
}

export function getAssertEqualOption<A>(S: Setoid<A>): (x: Option<A>, y: Option<A>) => void {
  return getAssertEqual(getSetoid(S))
}

export const assertEqualInteger = getAssertEqual(integer.setoid)

const denseSetoid = dense.getSetoid<any>()

export function assertEqualDense<D extends string>(x: dense.Dense<D>): (y: Dense<D>) => void {
  return y => {
    if (!denseSetoid.equals(x)(y)) {
      assert.fail(`${x} !== ${y}`)
    }
  }
}

const discreteSetoid = discrete.getSetoid<any, any>()

export function assertEqualDiscrete<D extends string, U extends string>(
  x: Discrete<D, U>
): (y: Discrete<D, U>) => void {
  return y => {
    if (!discreteSetoid.equals(x)(y)) {
      assert.fail(`${x} !== ${y}`)
    }
  }
}

export function assertProperty<A>(p: Property<A>): void {
  const result = check(p)
  if (!result.result) {
    assert.fail(`Property failed with the following test: ${JSON.stringify(result, null, 2)}`)
  }
}

export function unsafeBigInteger(x: number | string): BigInteger {
  return fromSome(bigInteger.wrap(x))
}

export function unsafeInteger(x: number | string): Integer {
  return fromSome(bigInteger.wrap(x).map(integer.wrap))
}

export function unsafeNatural(x: number | string): Natural {
  return fromSome(bigInteger.wrap(x).chain(natural.wrap))
}

export function unsafeNonZeroInteger(x: number | string): NonZeroInteger {
  return fromSome(bigInteger.wrap(x).chain(nonZeroInteger.wrap))
}

export function unsafeRational([x, y]: [number | string, number | string]): Rational {
  return rational.reduce(unsafeInteger(x), unsafeNatural(y))
}

export function unsafeNonZeroRational([x, y]: [number | string, number | string]): NonZeroRational {
  return nonZeroRational.reduce(unsafeNonZeroInteger(x), unsafeNatural(y))
}

const BigNaturalStringGenerator: Generator<string> = gen.sPosInt.then(i => i + '9007199254740992')

const BigIntegerStringGenerator: Generator<string> = gen.int.then(i => i + '9007199254740992')

const BigNaturalGenerator: Generator<BigInteger> = gen
  .oneOf<string | number>([gen.sPosInt, BigNaturalStringGenerator])
  .then(unsafeBigInteger)

export const BigIntegerGenerator: Generator<BigInteger> = gen
  .oneOf<string | number>([gen.int, BigIntegerStringGenerator])
  .then(unsafeBigInteger)

export const NaturalGenerator: Generator<Natural> = unsafeCoerce(BigNaturalGenerator)

export const IntegerGenerator: Generator<Integer> = unsafeCoerce(BigIntegerGenerator)

export const NonZeroIntegerGenerator: Generator<NonZeroInteger> = BigIntegerGenerator.suchThat(bi => !bi.isZero()).then(
  bi => unsafeCoerce(bi)
)

export const NonZeroRationalGenerator: Generator<NonZeroRational> = gen
  .array([NonZeroIntegerGenerator, NaturalGenerator])
  .then(r => nonZeroRational.reduce(r[0], r[1]))

export const PositiveRationalGenerator: Generator<PositiveRational> = gen
  .array([NaturalGenerator, NaturalGenerator])
  .then(r => positiveRational.reduce(r[0], r[1]))

const RationalGenerator: Generator<Rational> = gen
  .array([IntegerGenerator, NaturalGenerator])
  .then(r => rational.reduce(r[0], r[1]))

export function getDenseGenerator<D extends string>(dimension: D): Generator<Dense<D>> {
  return RationalGenerator.then(r => new Dense(dimension, r))
}

export function checkOrdLaws<A>(generator: Generator<A>, E: Setoid<A>, O: Ord<A>): void {
  // Compatibility with Setoid
  assertProperty(
    property(generator, generator, (a, b) => {
      return O.compare(a)(b) === 'EQ' ? E.equals(a)(b) : true
    })
  )
  // Reflexivity
  assertProperty(
    property(generator, a => {
      return O.compare(a)(a) !== 'GT'
    })
  )
  // Antisymmetry
  assertProperty(
    property(generator, generator, (a, b) => {
      return O.compare(a)(b) !== 'GT' && O.compare(b)(a) !== 'GT' ? E.equals(a)(b) : true
    })
  )
  // Transitivity
  assertProperty(
    property(generator, generator, generator, (a, b, c) => {
      return O.compare(a)(b) !== 'GT' && O.compare(b)(c) !== 'GT' ? O.compare(a)(c) !== 'GT' : true
    })
  )
}

export function checkSemiringLaws<A>(generator: Generator<A>, E: Setoid<A>, S: Semiring<A>): void {
  const zero = S.zero()
  // addition Associativity
  assertProperty(
    property(generator, generator, generator, (a, b, c) => {
      return E.equals(S.add(S.add(a)(b))(c))(S.add(a)(S.add(b)(c)))
    })
  )
  // addition Identity
  assertProperty(
    property(generator, a => {
      const b = S.add(a)(zero)
      const c = S.add(zero)(a)
      return E.equals(b)(c) && E.equals(b)(a)
    })
  )
  // addition Commutativity
  assertProperty(
    property(generator, generator, (a, b) => {
      return E.equals(S.add(a)(b))(S.add(b)(a))
    })
  )
  const one = S.one()
  // multiplication Associativity
  assertProperty(
    property(generator, generator, generator, (a, b, c) => {
      return E.equals(S.mul(S.mul(a)(b))(c))(S.mul(a)(S.mul(b)(c)))
    })
  )
  // multiplication Identity
  assertProperty(
    property(generator, a => {
      const b = S.mul(a)(one)
      const c = S.mul(one)(a)
      return E.equals(b)(c) && E.equals(b)(a)
    })
  )
  // Left distributivity
  assertProperty(
    property(generator, generator, generator, (a, b, c) => {
      return E.equals(S.mul(a)(S.add(b)(c)))(S.add(S.mul(a)(b))(S.mul(a)(c)))
    })
  )
  // Right distributivity
  assertProperty(
    property(generator, generator, generator, (a, b, c) => {
      return E.equals(S.mul(S.add(a)(b))(c))(S.add(S.mul(a)(c))(S.mul(b)(c)))
    })
  )
  // Annihilation
  assertProperty(
    property(generator, a => {
      const b = S.mul(a)(zero)
      const c = S.mul(zero)(a)
      return E.equals(b)(c) && E.equals(b)(zero)
    })
  )
}

export function checkRingLaws<A>(generator: Generator<A>, E: Setoid<A>, R: Ring<A>): void {
  checkSemiringLaws(generator, E, R)
  const zero = R.zero()
  // Additive inverse
  assertProperty(
    property(generator, a => {
      const b = R.sub(a)(a)
      const c = R.add(R.sub(zero)(a))(a)
      return E.equals(b)(c) && E.equals(b)(zero)
    })
  )
}
