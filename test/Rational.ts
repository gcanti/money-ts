import * as assert from 'assert'
import * as rational from '../src/Rational'
import * as integer from '../src/Integer'
import {
  getAssertEqual,
  unsafeInteger,
  unsafeRational,
  unsafeNatural,
  unsafeNonZeroRational,
  assertEqualInteger
} from './helpers'

const i2 = unsafeInteger(2)
const in1 = unsafeInteger(-1)
const in2 = unsafeInteger(-2)

const assertEqual = getAssertEqual(rational.eq)

describe('Rational', () => {
  it('fromInteger', () => {
    assertEqual(rational.fromInteger(integer.one), unsafeRational([1, 1]))
  })

  it('isZero', () => {
    assert.deepEqual(rational.isZero(rational.zero), true)
    assert.deepEqual(rational.isZero(rational.one), false)
  })

  it('reduce', () => {
    assertEqual(rational.reduce(unsafeInteger(4), unsafeNatural(2)), unsafeRational([2, 1]))
    assertEqual(rational.reduce(unsafeInteger(-4), unsafeNatural(2)), unsafeRational([-2, 1]))
    assertEqual(rational.reduce(unsafeInteger(2), unsafeNatural(1)), unsafeRational([2, 1]))
    assertEqual(rational.reduce(unsafeInteger(0), unsafeNatural(1)), unsafeRational([0, 1]))
  })

  it('add', () => {
    assertEqual(rational.add(unsafeRational([-124, 100]), rational.zero), unsafeRational([-124, 100]))
    assertEqual(rational.add(unsafeRational([1, 3]), unsafeRational([2, 3])), unsafeRational([1, 1]))
    assertEqual(rational.add(unsafeRational([1, 3]), unsafeRational([-2, 3])), unsafeRational([-1, 3]))
  })

  it('zero', () => {
    assertEqual(rational.zero, unsafeRational([0, 1]))
  })

  it('sub', () => {
    assertEqual(rational.sub(unsafeRational([1, 3]), unsafeRational([2, 3])), unsafeRational([-1, 3]))
  })

  it('one', () => {
    assertEqual(rational.one, unsafeRational([1, 1]))
  })

  it('mul', () => {
    assertEqual(rational.mul(unsafeRational([1, 3]), unsafeRational([2, 3])), unsafeRational([2, 9]))
  })

  it('div', () => {
    assertEqual(rational.div(unsafeRational([1, 3]), unsafeNonZeroRational([2, 3])), unsafeRational([1, 2]))
    assertEqual(rational.div(unsafeRational([1, 3]), unsafeNonZeroRational([-2, 3])), unsafeRational([-1, 2]))
  })

  it('floor', () => {
    assertEqualInteger(rational.floor(unsafeRational([6, 4])), integer.one)
    assertEqualInteger(rational.floor(unsafeRational([5, 4])), integer.one)
    assertEqualInteger(rational.floor(unsafeRational([7, 4])), integer.one)
    assertEqualInteger(rational.floor(unsafeRational([-1, 2])), in1)
    assertEqualInteger(rational.floor(unsafeRational([-6, 4])), in2)
    assertEqualInteger(rational.floor(unsafeRational([-5, 4])), in2)
    assertEqualInteger(rational.floor(unsafeRational([-7, 4])), in2)
  })

  it('round', () => {
    assertEqualInteger(rational.round(unsafeRational([6, 4])), i2)
    assertEqualInteger(rational.round(unsafeRational([5, 4])), integer.one)
    assertEqualInteger(rational.round(unsafeRational([7, 4])), i2)
    assertEqualInteger(rational.round(unsafeRational([-6, 4])), in1)
    assertEqualInteger(rational.round(unsafeRational([-5, 4])), in1)
    assertEqualInteger(rational.round(unsafeRational([-7, 4])), in2)
  })

  it('ceil', () => {
    assertEqualInteger(rational.ceil(unsafeRational([6, 4])), i2)
    assertEqualInteger(rational.ceil(unsafeRational([5, 4])), i2)
    assertEqualInteger(rational.ceil(unsafeRational([7, 4])), i2)
    assertEqualInteger(rational.ceil(unsafeRational([-6, 4])), in1)
    assertEqualInteger(rational.ceil(unsafeRational([-5, 4])), in1)
    assertEqualInteger(rational.ceil(unsafeRational([-7, 4])), in1)
  })

  it('trunc', () => {
    assertEqualInteger(rational.trunc(unsafeRational([6, 4])), integer.one)
    assertEqualInteger(rational.trunc(unsafeRational([5, 4])), integer.one)
    assertEqualInteger(rational.trunc(unsafeRational([7, 4])), integer.one)
    assertEqualInteger(rational.trunc(unsafeRational([-6, 4])), in1)
    assertEqualInteger(rational.trunc(unsafeRational([-5, 4])), in1)
    assertEqualInteger(rational.trunc(unsafeRational([-7, 4])), in1)
  })

  it('ord', () => {
    assert.strictEqual(rational.ord.compare(unsafeRational([1, 1]), unsafeRational([2, 1])), -1)
    assert.strictEqual(rational.ord.compare(unsafeRational([2, 1]), unsafeRational([2, 1])), 0)
    assert.strictEqual(rational.ord.compare(unsafeRational([2, 1]), unsafeRational([1, 1])), 1)
    assert.strictEqual(rational.ord.compare(unsafeRational([2, 3]), unsafeRational([1, 3])), 1)
    assert.strictEqual(rational.ord.compare(unsafeRational([1, 2]), unsafeRational([1, 3])), 1)
    assert.strictEqual(rational.ord.compare(unsafeRational([-1, 1]), unsafeRational([-2, 1])), 1)
    assert.strictEqual(rational.ord.compare(unsafeRational([-2, 1]), unsafeRational([-2, 1])), 0)
    assert.strictEqual(rational.ord.compare(unsafeRational([-2, 1]), unsafeRational([-1, 1])), -1)
    assert.strictEqual(rational.ord.compare(unsafeRational([-2, 3]), unsafeRational([-1, 3])), -1)
    assert.strictEqual(rational.ord.compare(unsafeRational([-1, 2]), unsafeRational([-1, 3])), -1)
  })

  it('show', () => {
    assert.strictEqual(rational.show(rational.one), '1 / 1')
    assert.strictEqual(rational.show(unsafeRational([-2, 3])), '-2 / 3')
  })
})
