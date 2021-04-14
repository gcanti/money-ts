import * as assert from 'assert'
import { check, Property, gen, Generator, property } from 'testcheck'
import { Eq } from 'fp-ts/Eq'
import { BigInteger } from 'big-integer'
import { pipe, unsafeCoerce } from 'fp-ts/function'
import * as BI from '../src/BigInteger'
import * as I from '../src/Integer'
import * as NZI from '../src/NonZeroInteger'
import * as N from '../src/Natural'
import * as R from '../src/Rational'
import * as NZR from '../src/NonZeroRational'
import * as D from '../src/Dense'
import * as DC from '../src/Discrete'
import * as PR from '../src/PositiveRational'
import { Semiring } from 'fp-ts/Semiring'
import { Ring } from 'fp-ts/Ring'
import { Ord } from 'fp-ts/Ord'
import * as O from 'fp-ts/Option'

function fromSome<A>(fa: O.Option<A>): A {
  return pipe(
    fa,
    O.getOrElse<A>(() => {
      throw new Error('fromSome called with None')
    })
  )
}

export function getAssertEqual<A>(S: Eq<A>): (x: A, y: A) => void {
  return function assertEqual(x: A, y: A): void {
    if (!S.equals(x, y)) {
      assert.fail(`${x} !== ${y}`)
    }
  }
}

export function getAssertEqualOption<A>(S: Eq<A>): (x: O.Option<A>, y: O.Option<A>) => void {
  return getAssertEqual(O.getEq(S))
}

export const assertEqualInteger = getAssertEqual(I.eq)

const denseEq = D.getEq<any>()

export function assertEqualDense<D extends string>(x: D.Dense<D>): (y: D.Dense<D>) => void {
  return (y) => {
    if (!denseEq.equals(x, y)) {
      assert.fail(`${x} !== ${y}`)
    }
  }
}

const discreteEq = DC.getEq<any, any>()

export function assertEqualDiscrete<D extends string, U extends string>(
  x: DC.Discrete<D, U>
): (y: DC.Discrete<D, U>) => void {
  return (y) => {
    if (!discreteEq.equals(x, y)) {
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
  return fromSome(BI.wrap(x))
}

export function unsafeInteger(x: number | string): I.Integer {
  return pipe(BI.wrap(x), O.map(I.wrap), fromSome)
}

export function unsafeNatural(x: number | string): N.Natural {
  return pipe(BI.wrap(x), O.chain(N.wrap), fromSome)
}

export function unsafeNonZeroInteger(x: number | string): NZI.NonZeroInteger {
  return pipe(BI.wrap(x), O.chain(NZI.wrap), fromSome)
}

export function unsafeRational([x, y]: [number | string, number | string]): R.Rational {
  return R.reduce(unsafeInteger(x), unsafeNatural(y))
}

export function unsafeNonZeroRational([x, y]: [number | string, number | string]): NZR.NonZeroRational {
  return NZR.reduce(unsafeNonZeroInteger(x), unsafeNatural(y))
}

const BigNaturalStringGenerator: Generator<string> = gen.sPosInt.then((i) => i + '9007199254740992')

const BigIntegerStringGenerator: Generator<string> = gen.int.then((i) => i + '9007199254740992')

const BigNaturalGenerator: Generator<BigInteger> = gen
  .oneOf<string | number>([gen.sPosInt, BigNaturalStringGenerator])
  .then(unsafeBigInteger)

export const BigIntegerGenerator: Generator<BigInteger> = gen
  .oneOf<string | number>([gen.int, BigIntegerStringGenerator])
  .then(unsafeBigInteger)

export const NaturalGenerator: Generator<N.Natural> = unsafeCoerce(BigNaturalGenerator)

export const IntegerGenerator: Generator<I.Integer> = unsafeCoerce(BigIntegerGenerator)

export const NonZeroIntegerGenerator: Generator<NZI.NonZeroInteger> = BigIntegerGenerator.suchThat(
  (bi) => !bi.isZero()
).then((bi) => unsafeCoerce(bi))

export const NonZeroRationalGenerator: Generator<NZR.NonZeroRational> = gen
  .array([NonZeroIntegerGenerator, NaturalGenerator])
  .then((r) => NZR.reduce(r[0], r[1]))

export const PositiveRationalGenerator: Generator<PR.PositiveRational> = gen
  .array([NaturalGenerator, NaturalGenerator])
  .then((r) => PR.reduce(r[0], r[1]))

const RationalGenerator: Generator<R.Rational> = gen
  .array([IntegerGenerator, NaturalGenerator])
  .then((r) => R.reduce(r[0], r[1]))

export function getDenseGenerator<D extends string>(dimension: D): Generator<D.Dense<D>> {
  return RationalGenerator.then((r) => new D.Dense(dimension, r))
}

export function checkOrdLaws<A>(generator: Generator<A>, E: Eq<A>, O: Ord<A>): void {
  // Compatibility with Eq
  assertProperty(
    property(generator, generator, (a, b) => {
      return O.compare(a, b) === 0 ? E.equals(a, b) : true
    })
  )
  // Reflexivity
  assertProperty(
    property(generator, (a) => {
      return O.compare(a, a) !== 1
    })
  )
  // Antisymmetry
  assertProperty(
    property(generator, generator, (a, b) => {
      return O.compare(a, b) !== 1 && O.compare(b, a) !== 1 ? E.equals(a, b) : true
    })
  )
  // Transitivity
  assertProperty(
    property(generator, generator, generator, (a, b, c) => {
      return O.compare(a, b) !== 1 && O.compare(b, c) !== 1 ? O.compare(a, c) !== 1 : true
    })
  )
}

export function checkSemiringLaws<A>(generator: Generator<A>, E: Eq<A>, S: Semiring<A>): void {
  const zero = S.zero
  // addition Associativity
  assertProperty(
    property(generator, generator, generator, (a, b, c) => {
      return E.equals(S.add(S.add(a, b), c), S.add(a, S.add(b, c)))
    })
  )
  // addition Identity
  assertProperty(
    property(generator, (a) => {
      const b = S.add(a, zero)
      const c = S.add(zero, a)
      return E.equals(b, c) && E.equals(b, a)
    })
  )
  // addition Commutativity
  assertProperty(
    property(generator, generator, (a, b) => {
      return E.equals(S.add(a, b), S.add(b, a))
    })
  )
  const one = S.one
  // multiplication Associativity
  assertProperty(
    property(generator, generator, generator, (a, b, c) => {
      return E.equals(S.mul(S.mul(a, b), c), S.mul(a, S.mul(b, c)))
    })
  )
  // multiplication Identity
  assertProperty(
    property(generator, (a) => {
      const b = S.mul(a, one)
      const c = S.mul(one, a)
      return E.equals(b, c) && E.equals(b, a)
    })
  )
  // Left distributivity
  assertProperty(
    property(generator, generator, generator, (a, b, c) => {
      return E.equals(S.mul(a, S.add(b, c)), S.add(S.mul(a, b), S.mul(a, c)))
    })
  )
  // Right distributivity
  assertProperty(
    property(generator, generator, generator, (a, b, c) => {
      return E.equals(S.mul(S.add(a, b), c), S.add(S.mul(a, c), S.mul(b, c)))
    })
  )
  // Annihilation
  assertProperty(
    property(generator, (a) => {
      const b = S.mul(a, zero)
      const c = S.mul(zero, a)
      return E.equals(b, c) && E.equals(b, zero)
    })
  )
}

export function checkRingLaws<A>(generator: Generator<A>, E: Eq<A>, R: Ring<A>): void {
  checkSemiringLaws(generator, E, R)
  const zero = R.zero
  // Additive inverse
  assertProperty(
    property(generator, (a) => {
      const b = R.sub(a, a)
      const c = R.add(R.sub(zero, a), a)
      return E.equals(b, c) && E.equals(b, zero)
    })
  )
}
