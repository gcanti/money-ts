import * as assert from 'assert'
import { Dense, Format } from '../src/Dense'
import { Discrete } from '../src/Discrete'
import * as dense from '../src/Dense'
import * as discrete from '../src/Discrete'
import * as integer from '../src/Integer'
import * as rational from '../src/Rational'
import * as nonZeroRational from '../src/NonZeroRational'
import '../src/scale/EUR'
import '../src/scale/XAU'
import { Dimensions, Units } from '../src/Scale'
import * as BigInteger from 'big-integer'
import { fromSome } from '../src/scale/fromSome'

const nzr4 = fromSome(nonZeroRational.fromInput([4, 1]))

const S = dense.getSetoid<any>()

export function assertEqual<D>(x: Dense<D>): (y: Dense<D>) => void {
  return y => {
    if (!S.equals(x)(y)) {
      assert.fail(`${x} !== ${y}`)
    }
  }
}

export function assertPropertyRound<D extends Dimensions, U extends Units<D>>(
  format: Format<D, U>,
  f: (format: Format<D, U>) => (d: Dense<D>) => [Discrete<D, U>, Dense<D>],
  x: Dense<D>
) {
  const [d, rest] = f(format)(x)
  assertEqual(x)(dense.add(dense.fromDiscrete(format)(d), rest))
}

describe('Dense', () => {
  it('fromDiscrete', () => {
    assertEqual(dense.fromDiscrete({ dimension: 'EUR', unit: 'cent' })(discrete.wrap<'EUR', 'cent'>(integer.one)))(
      dense.wrap<'EUR'>(fromSome(rational.fromInput([1, 100])))
    )
    assertEqual(dense.fromDiscrete({ dimension: 'EUR', unit: 'euro' })(discrete.wrap<'EUR', 'euro'>(integer.one)))(
      dense.wrap<'EUR'>(fromSome(rational.fromInput([1, 1])))
    )
    assertEqual(dense.fromDiscrete({ dimension: 'XAU', unit: 'gram' })(discrete.wrap<'XAU', 'gram'>(integer.one)))(
      dense.wrap<'XAU'>(fromSome(rational.fromInput([1000000, 31103477])))
    )
  })

  it('mul', () => {
    assertEqual(dense.mul(dense.wrap<'EUR'>(fromSome(rational.fromInput([3, 1]))), nzr4))(
      dense.wrap<'EUR'>(fromSome(rational.fromInput([12, 1])))
    )
  })

  it('div', () => {
    assertEqual(dense.div(dense.wrap<'EUR'>(fromSome(rational.fromInput([4, 1]))), nzr4))(
      dense.wrap<'EUR'>(rational.one)
    )
  })

  it('floor', () => {
    const [f1, rest1] = dense.floor({ dimension: 'EUR', unit: 'cent' })(
      dense.wrap<'EUR'>(fromSome(rational.fromInput([124, 100])))
    )
    assert.strictEqual(
      discrete.getSetoid<'EUR', 'cent'>().equals(f1)(discrete.wrap(integer.wrap(BigInteger(124)))),
      true
    )
    assertEqual(rest1)(dense.zero)
    assertPropertyRound(
      { dimension: 'EUR', unit: 'cent' },
      dense.floor,
      dense.wrap<'EUR'>(fromSome(rational.fromInput([124, 100])))
    )
    assertPropertyRound(
      { dimension: 'EUR', unit: 'euro' },
      dense.floor,
      dense.wrap<'EUR'>(fromSome(rational.fromInput([124, 100])))
    )
  })

  it('round', () => {
    const [f1, rest1] = dense.round({ dimension: 'EUR', unit: 'euro' })(
      dense.wrap<'EUR'>(fromSome(rational.fromInput([124, 100])))
    )
    assert.strictEqual(discrete.getSetoid<'EUR', 'euro'>().equals(f1)(discrete.wrap(integer.wrap(BigInteger(1)))), true)
    assertEqual(rest1)(dense.wrap<'EUR'>(fromSome(rational.fromInput([24, 100]))))
    assertPropertyRound(
      { dimension: 'EUR', unit: 'euro' },
      dense.round,
      dense.wrap<'EUR'>(fromSome(rational.fromInput([124, 100])))
    )
    assertPropertyRound(
      { dimension: 'EUR', unit: 'cent' },
      dense.round,
      dense.wrap<'EUR'>(fromSome(rational.fromInput([124, 100])))
    )
  })

  it('ceil', () => {
    const [f1, rest1] = dense.ceil({ dimension: 'EUR', unit: 'euro' })(
      dense.wrap<'EUR'>(fromSome(rational.fromInput([124, 100])))
    )
    assert.strictEqual(discrete.getSetoid<'EUR', 'euro'>().equals(f1)(discrete.wrap(integer.wrap(BigInteger(2)))), true)
    assertEqual(rest1)(dense.wrap<'EUR'>(fromSome(rational.fromInput([-76, 100]))))
    assertPropertyRound(
      { dimension: 'EUR', unit: 'euro' },
      dense.ceil,
      dense.wrap<'EUR'>(fromSome(rational.fromInput([124, 100])))
    )
    assertPropertyRound(
      { dimension: 'EUR', unit: 'cent' },
      dense.ceil,
      dense.wrap<'EUR'>(fromSome(rational.fromInput([124, 100])))
    )
  })

  it('trunc', () => {
    const [f1, rest1] = dense.trunc({ dimension: 'EUR', unit: 'euro' })(
      dense.wrap<'EUR'>(fromSome(rational.fromInput([124, 100])))
    )
    assert.strictEqual(discrete.getSetoid<'EUR', 'euro'>().equals(f1)(discrete.wrap(integer.wrap(BigInteger(1)))), true)
    assertEqual(rest1)(dense.wrap<'EUR'>(fromSome(rational.fromInput([24, 100]))))
    const [f2, rest2] = dense.trunc({ dimension: 'EUR', unit: 'euro' })(
      dense.wrap<'EUR'>(fromSome(rational.fromInput([-124, 100])))
    )
    assert.strictEqual(
      discrete.getSetoid<'EUR', 'euro'>().equals(f2)(discrete.wrap(integer.wrap(BigInteger(-1)))),
      true
    )
    assertEqual(rest2)(dense.wrap<'EUR'>(fromSome(rational.fromInput([-24, 100]))))
  })

  it('should not allow for loss of intermediate amounts', () => {
    const S = dense.getSetoid<'USD'>()
    const x = dense.wrap<'USD'>(fromSome(rational.fromInput([4, 1])))
    const y = dense.div(dense.mul(x, nzr4), nzr4)
    assert.strictEqual(S.equals(y)(x), true)
  })
})
