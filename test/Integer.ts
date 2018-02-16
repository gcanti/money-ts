import * as assert from 'assert'
import * as integer from '../src/Integer'
import {
  assertProperty,
  IntegerGenerator,
  NaturalGenerator,
  unsafeInteger,
  unsafeNatural,
  assertEqualInteger
} from './util'
import { property } from 'testcheck'

const n2 = unsafeNatural(2)
const n4 = unsafeNatural(4)
const i0 = unsafeInteger(0)
const i1 = unsafeInteger(1)
const i2 = unsafeInteger(2)
const i3 = unsafeInteger(3)
const i5 = unsafeInteger(5)
const i6 = unsafeInteger(6)
const in1 = unsafeInteger(-1)
const in2 = unsafeInteger(-2)
const in3 = unsafeInteger(-3)
const in5 = unsafeInteger(-5)

describe('Integer', () => {
  it('add', () => {
    assertEqualInteger(integer.add(i2, i3), i5)
    assertEqualInteger(integer.add(in2, in3), in5)
    assertProperty(
      property(NaturalGenerator, NaturalGenerator, (a, b) => {
        const c = integer.add(a, b)
        return integer.ord.compare(c, a) === 1 && integer.ord.compare(c, b) === 1
      })
    )
    assertProperty(
      property(IntegerGenerator, IntegerGenerator, (a, b) => {
        const c = integer.add(a, b)
        const d = integer.sub(c, b)
        integer.setoid.equals(d, a)
      })
    )
  })

  it('mul', () => {
    assertEqualInteger(integer.mul(i2, i3), i6)
  })

  it('one', () => {
    assertEqualInteger(integer.one, i1)
  })

  it('negate', () => {
    assertEqualInteger(integer.negate(integer.one), in1)
  })

  it('sub', () => {
    assertEqualInteger(integer.sub(i2, i3), in1)
  })

  it('zero', () => {
    assertEqualInteger(integer.zero, i0)
  })

  it('div', () => {
    assertEqualInteger(integer.div(i6, n2), i3)
    assertEqualInteger(integer.div(i6, n4), i1)
  })

  it('isZero', () => {
    assert.strictEqual(integer.isZero(i0), true)
    assert.strictEqual(integer.isZero(i5), false)
  })

  it('isPositive', () => {
    assert.strictEqual(integer.isPositive(i0), false)
    assert.strictEqual(integer.isPositive(i5), true)
    assert.strictEqual(integer.isPositive(in1), false)
  })

  it('sign', () => {
    assert.strictEqual(integer.sign(i1), 1)
    assert.strictEqual(integer.sign(i0), 0)
    assert.strictEqual(integer.sign(in1), -1)
  })

  it('ord', () => {
    assert.strictEqual(integer.ord.compare(i1, i2), -1)
    assert.strictEqual(integer.ord.compare(i2, i1), 1)
    assert.strictEqual(integer.ord.compare(i2, i2), 0)
    assert.strictEqual(integer.ord.compare(in1, in2), 1)
    assert.strictEqual(integer.ord.compare(in2, in1), -1)
    assert.strictEqual(integer.ord.compare(in2, in2), 0)
  })

  it('show', () => {
    assert.strictEqual(integer.show(integer.one), '1')
    assert.strictEqual(integer.show(unsafeInteger('9007199254740993')), '9007199254740993')
  })

  it('should handle big numbers', () => {
    assertEqualInteger(integer.add(unsafeInteger(9007199254740992), integer.one), unsafeInteger('9007199254740993'))
  })
})
