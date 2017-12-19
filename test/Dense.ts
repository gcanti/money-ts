import * as assert from 'assert'
import * as dense from '../src/Dense'
import { Integer } from '../src/Integer'
import { Rational } from '../src/Rational'
import { Discrete } from '../src/Discrete'
import '../src/scale/EUR'
import '../src/scale/XAU'

const unsafeUSDFromInteger = (n: number): dense.Dense<'USD'> => [n, 1] as any

const i2: Integer = 2 as any
const r3: Rational = [3, 1] as any

describe('Dense', () => {
  it('fromInteger', () => {
    const usd2 = dense.fromInteger(i2)
    assert.deepEqual(usd2, [2, 1])
  })

  it('fromDiscrete', () => {
    const d1: Discrete<'EUR', 'cent'> = 1 as any
    assert.deepEqual(dense.fromDiscrete(d1, 'EUR', 'cent'), [1, 100])
    const d2: Discrete<'EUR', 'euro'> = 1 as any
    assert.deepEqual(dense.fromDiscrete(d2, 'EUR', 'euro'), [1, 1])
    const d3: Discrete<'XAU', 'gram'> = 1 as any
    assert.deepEqual(dense.fromDiscrete(d3, 'XAU', 'gram'), [1000000, 31103477])
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
    assert.deepEqual(dense.div(x, r3), [4, 3])
  })

  it('should not loss of intermediate amounts', () => {
    const S = dense.getSetoid<'USD'>()
    const x = unsafeUSDFromInteger(4)
    const y = dense.div(dense.mul(x, r3), r3)
    assert.strictEqual(S.equals(y)(x), true)
  })
})
