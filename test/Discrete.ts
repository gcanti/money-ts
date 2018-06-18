import * as assert from 'assert'
import { Discrete, getOne, getZero, getOrd } from '../src/Discrete'
import { unsafeInteger, unsafeNonZeroInteger, assertEqualDiscrete } from './helpers'

const format = { dimension: 'EUR', unit: 'cent' }
const dn0 = new Discrete(format, unsafeInteger(0))
const dn1 = new Discrete(format, unsafeInteger(1))
const dn2 = new Discrete(format, unsafeInteger(2))
const dn3 = new Discrete(format, unsafeInteger(3))
const dn5 = new Discrete(format, unsafeInteger(5))
const dn6 = new Discrete(format, unsafeInteger(6))
const dz1 = new Discrete(format, unsafeInteger(-1))

describe('Discrete', () => {
  it('add', () => {
    assertEqualDiscrete(dn2.add(dn3))(dn5)
  })

  it('mul', () => {
    assertEqualDiscrete(dn2.mul(unsafeInteger(3)))(dn6)
  })

  it('one', () => {
    assertEqualDiscrete(getOne(format))(dn1)
  })

  it('negate', () => {
    assertEqualDiscrete(dn1.negate())(dz1)
  })

  it('sub', () => {
    assertEqualDiscrete(dn2.sub(dn3))(dz1)
  })

  it('zero', () => {
    assertEqualDiscrete(getZero(format))(dn0)
  })

  it('div', () => {
    assertEqualDiscrete(dn6.div(unsafeNonZeroInteger(2)))(dn3)
    assertEqualDiscrete(dn6.div(unsafeNonZeroInteger(4)))(dn1)
  })

  it('isZero', () => {
    assert.strictEqual(dn0.isZero(), true)
    assert.strictEqual(dn5.isZero(), false)
  })

  it('ord', () => {
    const O = getOrd()
    assert.strictEqual(O.compare(dn1, dn2), -1)
    assert.strictEqual(O.compare(dn2, dn1), 1)
    assert.strictEqual(O.compare(dn2, dn2), 0)
  })

  it('toString', () => {
    assert.strictEqual(dn2.toString(), 'EUR cent 2')
  })

  it('should handle big numbers', () => {
    assertEqualDiscrete(new Discrete(format, unsafeInteger(9007199254740992)).add(dn1))(
      new Discrete(format, unsafeInteger('9007199254740993'))
    )
  })
})
