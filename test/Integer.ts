import * as assert from 'assert'
import * as I from '../src/Integer'
import {
  assertProperty,
  IntegerGenerator,
  NaturalGenerator,
  unsafeInteger,
  unsafeNatural,
  assertEqualInteger
} from './helpers'
import { property } from 'testcheck'

const n2 = unsafeNatural('2')
const n4 = unsafeNatural('4')
const i0 = unsafeInteger('0')
const i1 = unsafeInteger('1')
const i2 = unsafeInteger('2')
const i3 = unsafeInteger('3')
const i5 = unsafeInteger('5')
const i6 = unsafeInteger('6')
const in1 = unsafeInteger('-1')
const in2 = unsafeInteger('-2')
const in3 = unsafeInteger('-3')
const in5 = unsafeInteger('-5')

describe('Integer', () => {
  it('add', () => {
    assertEqualInteger(I.add(i2, i3), i5)
    assertEqualInteger(I.add(in2, in3), in5)
    assertProperty(
      property(NaturalGenerator, NaturalGenerator, (a, b) => {
        const c = I.add(a, b)
        return I.integer.compare(c, a) === 1 && I.integer.compare(c, b) === 1
      })
    )
    assertProperty(
      property(IntegerGenerator, IntegerGenerator, (a, b) => {
        const c = I.add(a, b)
        const d = I.sub(c, b)
        I.integer.equals(d, a)
      })
    )
  })

  it('mul', () => {
    assertEqualInteger(I.mul(i2, i3), i6)
  })

  it('one', () => {
    assertEqualInteger(I.one, i1)
  })

  it('negate', () => {
    assertEqualInteger(I.negate(I.one), in1)
  })

  it('sub', () => {
    assertEqualInteger(I.sub(i2, i3), in1)
  })

  it('zero', () => {
    assertEqualInteger(I.zero, i0)
  })

  it('div', () => {
    assertEqualInteger(I.div(i6, n2), i3)
    assertEqualInteger(I.div(i6, n4), i1)
  })

  it('isZero', () => {
    assert.strictEqual(I.isZero(i0), true)
    assert.strictEqual(I.isZero(i5), false)
  })

  it('isPositive', () => {
    assert.strictEqual(I.isPositive(i0), false)
    assert.strictEqual(I.isPositive(i5), true)
    assert.strictEqual(I.isPositive(in1), false)
  })

  it('sign', () => {
    assert.strictEqual(I.sign(i1), 1)
    assert.strictEqual(I.sign(i0), 0)
    assert.strictEqual(I.sign(in1), -1)
  })

  it('ord', () => {
    assert.strictEqual(I.integer.compare(i1, i2), -1)
    assert.strictEqual(I.integer.compare(i2, i1), 1)
    assert.strictEqual(I.integer.compare(i2, i2), 0)
    assert.strictEqual(I.integer.compare(in1, in2), 1)
    assert.strictEqual(I.integer.compare(in2, in1), -1)
    assert.strictEqual(I.integer.compare(in2, in2), 0)
  })

  it('show', () => {
    assert.strictEqual(I.show(I.one), '1')
    assert.strictEqual(I.show(unsafeInteger('9007199254740993')), '9007199254740993')
  })

  it('should handle big numbers', () => {
    assertEqualInteger(I.add(unsafeInteger('9007199254740992'), I.one), unsafeInteger('9007199254740993'))
  })
})
