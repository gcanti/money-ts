import * as assert from 'assert'
import { Rational } from '../src/Rational'
import { NonZeroRational } from '../src/NonZeroRational'
import * as rational from '../src/Rational'
import * as nonZeroRational from '../src/NonZeroRational'
import * as integer from '../src/Integer'
import { fromSome } from '../src/scale/fromSome'
import { assertEqual as assertEqualInteger, n2, z1, z2 } from './Integer'

export function unsafeR(t: [number | string, number | string]): Rational {
  return fromSome(rational.fromInput(t))
}

export function unsafeNZR(t: [number | string, number | string]): NonZeroRational {
  return fromSome(nonZeroRational.fromInput(t))
}

function assertEqual(x: Rational, y: Rational): void {
  if (!rational.setoid.equals(x)(y)) {
    assert.fail(`${x} !== ${y}`)
  }
}

describe('Rational', () => {
  it('fromInteger', () => {
    assertEqual(rational.fromInteger(integer.one), unsafeR([1, 1]))
  })

  it('isZero', () => {
    assert.deepEqual(rational.isZero(rational.zero), true)
    assert.deepEqual(rational.isZero(rational.one), false)
  })

  it('reduce', () => {
    const reduce = (input: [number | string, number | string]): Rational => {
      return fromSome(rational.fromInput(input))
    }
    assertEqual(reduce([4, 2]), unsafeR([2, 1]))
    assertEqual(reduce([-4, 2]), unsafeR([-2, 1]))
    assertEqual(reduce([2, 1]), unsafeR([2, 1]))
    assertEqual(reduce([2, -1]), unsafeR([2, -1]))
    assertEqual(reduce([0, 1]), unsafeR([0, 1]))
  })

  it('add', () => {
    assertEqual(rational.add(unsafeR([-124, 100]), rational.zero), unsafeR([-124, 100]))
    assertEqual(rational.add(unsafeR([1, 3]), unsafeR([2, 3])), unsafeR([1, 1]))
    assertEqual(rational.add(unsafeR([1, 3]), unsafeR([-2, 3])), unsafeR([-1, 3]))
  })

  it('zero', () => {
    assertEqual(rational.zero, unsafeR([0, 1]))
  })

  it('sub', () => {
    assertEqual(rational.sub(unsafeR([1, 3]), unsafeR([2, 3])), unsafeR([-1, 3]))
  })

  it('one', () => {
    assertEqual(rational.one, unsafeR([1, 1]))
  })

  it('mul', () => {
    assertEqual(rational.mul(unsafeR([1, 3]), unsafeR([2, 3])), unsafeR([2, 9]))
  })

  it('div', () => {
    assertEqual(rational.div(unsafeR([1, 3]), unsafeNZR([2, 3])), unsafeR([1, 2]))
  })

  it('floor', () => {
    assertEqualInteger(rational.floor(unsafeR([6, 4])), integer.one)
    assertEqualInteger(rational.floor(unsafeR([5, 4])), integer.one)
    assertEqualInteger(rational.floor(unsafeR([7, 4])), integer.one)
    assertEqualInteger(rational.floor(unsafeR([-1, 2])), z1)
    assertEqualInteger(rational.floor(unsafeR([-6, 4])), z2)
    assertEqualInteger(rational.floor(unsafeR([-5, 4])), z2)
    assertEqualInteger(rational.floor(unsafeR([-7, 4])), z2)
  })

  it('round', () => {
    assertEqualInteger(rational.round(unsafeR([6, 4])), n2)
    assertEqualInteger(rational.round(unsafeR([5, 4])), integer.one)
    assertEqualInteger(rational.round(unsafeR([7, 4])), n2)
    assertEqualInteger(rational.round(unsafeR([-6, 4])), z1)
    assertEqualInteger(rational.round(unsafeR([-5, 4])), z1)
    assertEqualInteger(rational.round(unsafeR([-7, 4])), z2)
  })

  it('ceil', () => {
    assertEqualInteger(rational.ceil(unsafeR([6, 4])), n2)
    assertEqualInteger(rational.ceil(unsafeR([5, 4])), n2)
    assertEqualInteger(rational.ceil(unsafeR([7, 4])), n2)
    assertEqualInteger(rational.ceil(unsafeR([-6, 4])), z1)
    assertEqualInteger(rational.ceil(unsafeR([-5, 4])), z1)
    assertEqualInteger(rational.ceil(unsafeR([-7, 4])), z1)
  })

  it('trunc', () => {
    assertEqualInteger(rational.trunc(unsafeR([6, 4])), integer.one)
    assertEqualInteger(rational.trunc(unsafeR([5, 4])), integer.one)
    assertEqualInteger(rational.trunc(unsafeR([7, 4])), integer.one)
    assertEqualInteger(rational.trunc(unsafeR([-6, 4])), z1)
    assertEqualInteger(rational.trunc(unsafeR([-5, 4])), z1)
    assertEqualInteger(rational.trunc(unsafeR([-7, 4])), z1)
  })

  it('ord', () => {
    assert.strictEqual(rational.ord.compare(unsafeR([1, 1]))(unsafeR([2, 1])), 'LT')
    assert.strictEqual(rational.ord.compare(unsafeR([2, 1]))(unsafeR([2, 1])), 'EQ')
    assert.strictEqual(rational.ord.compare(unsafeR([2, 1]))(unsafeR([1, 1])), 'GT')
    assert.strictEqual(rational.ord.compare(unsafeR([2, 3]))(unsafeR([1, 3])), 'GT')
    assert.strictEqual(rational.ord.compare(unsafeR([-1, 1]))(unsafeR([-2, 1])), 'GT')
    assert.strictEqual(rational.ord.compare(unsafeR([-2, 1]))(unsafeR([-2, 1])), 'EQ')
    assert.strictEqual(rational.ord.compare(unsafeR([-2, 1]))(unsafeR([-1, 1])), 'LT')
    assert.strictEqual(rational.ord.compare(unsafeR([-2, 3]))(unsafeR([-1, 3])), 'LT')
  })

  it('show', () => {
    assert.strictEqual(rational.show(rational.one), '1 / 1')
    assert.strictEqual(rational.show(unsafeR([-2, 3])), '-2 / 3')
  })
})
