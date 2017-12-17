import * as assert from 'assert'
import * as dense from '../src/Dense'
import { Integer } from '../src/Integer'
import { Rational } from '../src/Rational'
import { scale } from '../src/Discrete'

const unsafeUSDFromInteger = (n: number): dense.Dense<'USD'> => [n, 1] as any

const i2: Integer = 2 as any
const r3: Rational = [3, 1] as any

declare module '../src/Discrete' {
  interface Scale {
    XAU: {
      'troy-ounce': [1, 1]
      gram: [31103477, 1000000]
    }
  }
}

scale['XAU'] = {
  'troy-ounce': [1, 1],
  gram: [31103477, 1000000]
}

describe('Dense', () => {
  it('fromInteger', () => {
    const usd2 = dense.fromInteger(i2)
    assert.deepEqual(usd2, [2, 1])
  })

  it('fromDiscrete', () => {
    assert.deepEqual(dense.fromDiscrete(1 as any, 'EUR', 'cent'), [1, 100])
    assert.deepEqual(dense.fromDiscrete(1 as any, 'EUR', 'euro'), [1, 1])
    assert.deepEqual(dense.fromDiscrete(1 as any, 'XAU', 'gram'), [1000000, 31103477])
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
