import * as assert from 'assert'
import { Dense } from '../src/Dense'
import { Discrete } from '../src/Discrete'
import * as dense from '../src/Dense'
import * as discrete from '../src/Discrete'
import * as integer from '../src/Integer'
import * as rational from '../src/Rational'
import * as nonZeroRational from '../src/NonZeroRational'
import '../src/scale/EUR'
import '../src/scale/XAU'
import * as BigInteger from 'big-integer'
import { fromSome } from '../src/scale/fromSome'

const nzr4 = fromSome(nonZeroRational.fromInput([4, 1]))

const S = dense.getSetoid<any>()

export function assertEqual<D extends string>(x: Dense<D>): (y: Dense<D>) => void {
  return y => {
    if (!S.equals(x)(y)) {
      assert.fail(`${x} !== ${y}`)
    }
  }
}

describe('Dense', () => {
  it('fromDiscrete', () => {
    assertEqual(dense.fromDiscrete(new Discrete({ dimension: 'EUR', unit: 'cent' }, integer.one)))(
      new Dense('EUR', fromSome(rational.fromInput([1, 100])))
    )
    assertEqual(dense.fromDiscrete(new Discrete({ dimension: 'EUR', unit: 'euro' }, integer.one)))(
      new Dense('EUR', fromSome(rational.fromInput([1, 1])))
    )
    assertEqual(dense.fromDiscrete(new Discrete({ dimension: 'XAU', unit: 'gram' }, integer.one)))(
      new Dense('XAU', fromSome(rational.fromInput([1000000, 31103477])))
    )
  })

  it('mul', () => {
    assertEqual(new Dense('EUR', fromSome(rational.fromInput([3, 1]))).mul(nzr4))(
      new Dense('EUR', fromSome(rational.fromInput([12, 1])))
    )
  })

  it('div', () => {
    assertEqual(new Dense('EUR', fromSome(rational.fromInput([4, 1]))).div(nzr4))(new Dense('EUR', rational.one))
  })

  it('floor', () => {
    const [f1, rest1] = dense.floor('cent', new Dense('EUR', fromSome(rational.fromInput([124, 100]))))
    assert.strictEqual(
      discrete.getSetoid<'EUR', 'cent'>().equals(f1)(
        new Discrete({ dimension: 'EUR', unit: 'cent' }, integer.wrap(BigInteger(124)))
      ),
      true
    )
    assertEqual(rest1)(dense.getZero('EUR'))
  })

  it('round', () => {
    const [f1, rest1] = dense.round('euro', new Dense('EUR', fromSome(rational.fromInput([124, 100]))))
    assert.strictEqual(
      discrete.getSetoid<'EUR', 'euro'>().equals(f1)(
        new Discrete({ dimension: 'EUR', unit: 'euro' }, integer.wrap(BigInteger(1)))
      ),
      true
    )
    assertEqual(rest1)(new Dense('EUR', fromSome(rational.fromInput([24, 100]))))
  })

  it('ceil', () => {
    const [f1, rest1] = dense.ceil('euro', new Dense('EUR', fromSome(rational.fromInput([124, 100]))))
    assert.strictEqual(
      discrete.getSetoid<'EUR', 'euro'>().equals(f1)(
        new Discrete({ dimension: 'EUR', unit: 'euro' }, integer.wrap(BigInteger(2)))
      ),
      true
    )
    assertEqual(rest1)(new Dense('EUR', fromSome(rational.fromInput([-76, 100]))))
  })

  it('trunc', () => {
    const [f1, rest1] = dense.trunc('euro', new Dense('EUR', fromSome(rational.fromInput([124, 100]))))
    assert.strictEqual(
      discrete.getSetoid<'EUR', 'euro'>().equals(f1)(
        new Discrete({ dimension: 'EUR', unit: 'euro' }, integer.wrap(BigInteger(1)))
      ),
      true
    )
    assertEqual(rest1)(new Dense('EUR', fromSome(rational.fromInput([24, 100]))))
    const [f2, rest2] = dense.trunc('euro', new Dense('EUR', fromSome(rational.fromInput([-124, 100]))))
    assert.strictEqual(
      discrete.getSetoid<'EUR', 'euro'>().equals(f2)(
        new Discrete({ dimension: 'EUR', unit: 'euro' }, integer.wrap(BigInteger(-1)))
      ),
      true
    )
    assertEqual(rest2)(new Dense('EUR', fromSome(rational.fromInput([-24, 100]))))
  })

  it('should not allow for loss of intermediate amounts', () => {
    const S = dense.getSetoid<'USD'>()
    const x = new Dense('USD', fromSome(rational.fromInput([4, 1])))
    const y = x.mul(nzr4).div(nzr4)
    assert.strictEqual(S.equals(y)(x), true)
  })
})
