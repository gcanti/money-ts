import * as assert from 'assert'
import { Dense, Format } from '../src/Dense'
import * as dense from '../src/Dense'
import { Integer } from '../src/Integer'
import { Rational } from '../src/Rational'
import { NonZeroRational } from '../src/NonZeroRational'
import { Discrete } from '../src/Discrete'
import { Dimensions, Units } from '../src/Scale'
import '../src/scale/EUR'
import '../src/scale/XAU'

const unsafeUSDFromInteger = (n: number): Dense<'USD'> => [n, 1] as any

const i2: Integer = 2 as any
const r3: Rational = [3, 1] as any
const nzr3: NonZeroRational = [3, 1] as any

function assertRound<dimension extends Dimensions, Unit extends Units<dimension>>(
  f: <dimension extends Dimensions, Unit extends Units<dimension>>(
    format: Format<dimension, Unit>,
    d: Dense<dimension>
  ) => [Discrete<dimension, Unit>, Dense<dimension>],
  format: Format<dimension, Unit>,
  x: Dense<dimension>
) {
  const [d, rest] = f(format, x)
  assert.deepEqual(dense.simplify(x), dense.simplify(dense.add(dense.fromDiscrete(format, d), rest)))
}

describe('Dense', () => {
  it('simplify', () => {
    assert.deepEqual(dense.simplify([4, 2] as any), [2, 1])
    assert.deepEqual(dense.simplify([-4, 2] as any), [-2, 1])
    assert.deepEqual(dense.simplify([2, 1] as any), [2, 1])
    assert.deepEqual(dense.simplify([2, -1] as any), [2, -1])
  })

  it('fromInteger', () => {
    const usd2 = dense.fromInteger(i2)
    assert.deepEqual(usd2, [2, 1])
  })

  it('fromDiscrete', () => {
    const d1: Discrete<'EUR', 'cent'> = 1 as any
    assert.deepEqual(dense.fromDiscrete({ dimension: 'EUR', unit: 'cent' }, d1), [1, 100])
    const d2: Discrete<'EUR', 'euro'> = 1 as any
    assert.deepEqual(dense.fromDiscrete({ dimension: 'EUR', unit: 'euro' }, d2), [1, 1])
    const d3: Discrete<'XAU', 'gram'> = 1 as any
    assert.deepEqual(dense.fromDiscrete({ dimension: 'XAU', unit: 'gram' }, d3), [1000000, 31103477])
  })

  it('floor', () => {
    assertRound(dense.floor, { dimension: 'EUR', unit: 'cent' }, [-124, 100] as any)
    assertRound(dense.floor, { dimension: 'EUR', unit: 'euro' }, [-124, 100] as any)
  })

  it('round', () => {
    assertRound(dense.round, { dimension: 'EUR', unit: 'cent' }, [-124, 100] as any)
    assertRound(dense.round, { dimension: 'EUR', unit: 'euro' }, [-124, 100] as any)
  })

  it('ceil', () => {
    assertRound(dense.ceil, { dimension: 'EUR', unit: 'cent' }, [-124, 100] as any)
    assertRound(dense.ceil, { dimension: 'EUR', unit: 'euro' }, [-124, 100] as any)
  })

  it('trunc', () => {
    assertRound(dense.trunc, { dimension: 'EUR', unit: 'cent' }, [-124, 100] as any)
    assertRound(dense.trunc, { dimension: 'EUR', unit: 'euro' }, [-124, 100] as any)
  })

  it('getRing', () => {
    const usd2 = unsafeUSDFromInteger(2)
    const usd3 = unsafeUSDFromInteger(3)
    const r = dense.add(usd2, usd3)
    assert.deepEqual(r, [5, 1])
  })

  it('mul', () => {
    const x = unsafeUSDFromInteger(4)
    assert.deepEqual(dense.mul(x, r3), [12, 1])
  })

  it('div', () => {
    const x = unsafeUSDFromInteger(4)
    assert.deepEqual(dense.div(x, nzr3), [4, 3])
  })

  it('should not loss of intermediate amounts', () => {
    const S = dense.getSetoid<'USD'>()
    const x = unsafeUSDFromInteger(4)
    const y = dense.div(dense.mul(x, r3), nzr3)
    assert.strictEqual(S.equals(y)(x), true)
  })
})
