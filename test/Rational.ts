import * as assert from 'assert'
import { Rational } from '../src/Rational'
import { NonZeroRational } from '../src/NonZeroRational'
import * as rational from '../src/Rational'
import * as nonZeroRational from '../src/NonZeroRational'
import * as integer from '../src/Integer'
import { fromSome } from '../src/scale/fromSome'
import { assertEqual as assertEqualInteger, i1, i2, z1, z2 } from './Integer'
import { Option, getSetoid, some, none } from 'fp-ts/lib/Option'

export function wrapR(t: [number | string, number | string]): Rational {
  return fromSome(rational.fromInput(t))
}

export function wrapNZR(t: [number | string, number | string]): NonZeroRational {
  return fromSome(nonZeroRational.fromInput(t))
}

function assertEqual(x: Rational, y: Rational): void {
  if (!rational.setoid.equals(x)(y)) {
    assert.fail(`${x} !== ${y}`)
  }
}

const S = getSetoid(rational.setoid)

function assertEqualOption(x: Option<Rational>, y: Option<Rational>): void {
  if (!S.equals(x)(y)) {
    assert.fail(`${x} !== ${y}`)
  }
}

describe('Rational', () => {
  it('fromInput', () => {
    assertEqualOption(rational.fromInput([1, 1]), some([i1, i1] as Rational))
    assertEqualOption(rational.fromInput([-1, 1]), some([z1, i1] as Rational))
    assertEqualOption(rational.fromInput([1, -1]), none)
  })

  it('fromInteger', () => {
    assertEqual(rational.fromInteger(integer.one), wrapR([1, 1]))
  })

  it('isZero', () => {
    assert.deepEqual(rational.isZero(rational.zero), true)
    assert.deepEqual(rational.isZero(rational.one), false)
  })

  it('reduce', () => {
    const reduce = (input: [number | string, number | string]): Rational => {
      return fromSome(rational.fromInput(input))
    }
    assertEqual(reduce([4, 2]), wrapR([2, 1]))
    assertEqual(reduce([-4, 2]), wrapR([-2, 1]))
    assertEqual(reduce([2, 1]), wrapR([2, 1]))
    assertEqual(reduce([2, -1]), wrapR([2, -1]))
    assertEqual(reduce([0, 1]), wrapR([0, 1]))
  })

  it('add', () => {
    assertEqual(rational.add(wrapR([-124, 100]), rational.zero), wrapR([-124, 100]))
    assertEqual(rational.add(wrapR([1, 3]), wrapR([2, 3])), wrapR([1, 1]))
    assertEqual(rational.add(wrapR([1, 3]), wrapR([-2, 3])), wrapR([-1, 3]))
  })

  it('zero', () => {
    assertEqual(rational.zero, wrapR([0, 1]))
  })

  it('sub', () => {
    assertEqual(rational.sub(wrapR([1, 3]), wrapR([2, 3])), wrapR([-1, 3]))
  })

  it('one', () => {
    assertEqual(rational.one, wrapR([1, 1]))
  })

  it('mul', () => {
    assertEqual(rational.mul(wrapR([1, 3]), wrapR([2, 3])), wrapR([2, 9]))
  })

  it('div', () => {
    assertEqual(rational.div(wrapR([1, 3]), wrapNZR([2, 3])), wrapR([1, 2]))
  })

  it('floor', () => {
    assertEqualInteger(rational.floor(wrapR([6, 4])), integer.one)
    assertEqualInteger(rational.floor(wrapR([5, 4])), integer.one)
    assertEqualInteger(rational.floor(wrapR([7, 4])), integer.one)
    assertEqualInteger(rational.floor(wrapR([-1, 2])), z1)
    assertEqualInteger(rational.floor(wrapR([-6, 4])), z2)
    assertEqualInteger(rational.floor(wrapR([-5, 4])), z2)
    assertEqualInteger(rational.floor(wrapR([-7, 4])), z2)
  })

  it('round', () => {
    assertEqualInteger(rational.round(wrapR([6, 4])), i2)
    assertEqualInteger(rational.round(wrapR([5, 4])), integer.one)
    assertEqualInteger(rational.round(wrapR([7, 4])), i2)
    assertEqualInteger(rational.round(wrapR([-6, 4])), z1)
    assertEqualInteger(rational.round(wrapR([-5, 4])), z1)
    assertEqualInteger(rational.round(wrapR([-7, 4])), z2)
  })

  it('ceil', () => {
    assertEqualInteger(rational.ceil(wrapR([6, 4])), i2)
    assertEqualInteger(rational.ceil(wrapR([5, 4])), i2)
    assertEqualInteger(rational.ceil(wrapR([7, 4])), i2)
    assertEqualInteger(rational.ceil(wrapR([-6, 4])), z1)
    assertEqualInteger(rational.ceil(wrapR([-5, 4])), z1)
    assertEqualInteger(rational.ceil(wrapR([-7, 4])), z1)
  })

  it('trunc', () => {
    assertEqualInteger(rational.trunc(wrapR([6, 4])), integer.one)
    assertEqualInteger(rational.trunc(wrapR([5, 4])), integer.one)
    assertEqualInteger(rational.trunc(wrapR([7, 4])), integer.one)
    assertEqualInteger(rational.trunc(wrapR([-6, 4])), z1)
    assertEqualInteger(rational.trunc(wrapR([-5, 4])), z1)
    assertEqualInteger(rational.trunc(wrapR([-7, 4])), z1)
  })

  it('ord', () => {
    assert.strictEqual(rational.ord.compare(wrapR([1, 1]))(wrapR([2, 1])), 'LT')
    assert.strictEqual(rational.ord.compare(wrapR([2, 1]))(wrapR([2, 1])), 'EQ')
    assert.strictEqual(rational.ord.compare(wrapR([2, 1]))(wrapR([1, 1])), 'GT')
    assert.strictEqual(rational.ord.compare(wrapR([2, 3]))(wrapR([1, 3])), 'GT')
    assert.strictEqual(rational.ord.compare(wrapR([1, 2]))(wrapR([1, 3])), 'GT')
    assert.strictEqual(rational.ord.compare(wrapR([-1, 1]))(wrapR([-2, 1])), 'GT')
    assert.strictEqual(rational.ord.compare(wrapR([-2, 1]))(wrapR([-2, 1])), 'EQ')
    assert.strictEqual(rational.ord.compare(wrapR([-2, 1]))(wrapR([-1, 1])), 'LT')
    assert.strictEqual(rational.ord.compare(wrapR([-2, 3]))(wrapR([-1, 3])), 'LT')
    assert.strictEqual(rational.ord.compare(wrapR([-1, 2]))(wrapR([-1, 3])), 'LT')
  })

  it('show', () => {
    assert.strictEqual(rational.show(rational.one), '1 / 1')
    assert.strictEqual(rational.show(wrapR([-2, 3])), '-2 / 3')
  })
})
