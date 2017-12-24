import * as assert from 'assert'
import { Integer } from '../src/Integer'
import * as integer from '../src/Integer'
import * as nonZeroInteger from '../src/NonZeroInteger'
import { fromSome } from '../src/scale/fromSome'
import { Option, getSetoid, some, none } from 'fp-ts/lib/Option'

const wrap = (x: number | string): Integer => fromSome(integer.fromInput(x))

const n0 = wrap(0)
export const n1 = wrap(1)
export const n2 = wrap(2)
const n3 = wrap(3)
const n5 = wrap(5)
const n6 = wrap(6)
export const z1 = wrap(-1)
export const z2 = wrap(-2)
const nz2 = fromSome(nonZeroInteger.fromInput(2))
const nz4 = fromSome(nonZeroInteger.fromInput(4))

export function assertEqual(x: Integer, y: Integer): void {
  if (!integer.setoid.equals(x)(y)) {
    assert.fail(`${x} !== ${y}`)
  }
}

const S = getSetoid(integer.setoid)

function assertEqualOption(x: Option<Integer>, y: Option<Integer>): void {
  if (!S.equals(x)(y)) {
    assert.fail(`${x} !== ${y}`)
  }
}

describe('Integer', () => {
  it('fromInput', () => {
    assertEqualOption(integer.fromInput(1), some(n1))
    assertEqualOption(integer.fromInput(-1), some(z1))
    assertEqualOption(integer.fromInput(1.1), none)
  })

  it('add', () => {
    assertEqual(integer.add(n2, n3), n5)
  })

  it('mul', () => {
    assertEqual(integer.mul(n2, n3), n6)
  })

  it('one', () => {
    assertEqual(integer.one, n1)
  })

  it('negate', () => {
    assertEqual(integer.negate(integer.one), z1)
  })

  it('sub', () => {
    assertEqual(integer.sub(n2, n3), z1)
  })

  it('zero', () => {
    assertEqual(integer.zero, n0)
  })

  it('div', () => {
    assertEqual(integer.div(n6, nz2), n3)
    assertEqual(integer.div(n6, nz4), n1)
  })

  it('isZero', () => {
    assert.strictEqual(integer.isZero(n0), true)
    assert.strictEqual(integer.isZero(n5), false)
  })

  it('sign', () => {
    assert.strictEqual(integer.sign(n1), 1)
    assert.strictEqual(integer.sign(n0), 0)
    assert.strictEqual(integer.sign(z1), -1)
  })

  it('ord', () => {
    assert.strictEqual(integer.ord.compare(n1)(n2), 'LT')
    assert.strictEqual(integer.ord.compare(n2)(n1), 'GT')
    assert.strictEqual(integer.ord.compare(n2)(n2), 'EQ')
    assert.strictEqual(integer.ord.compare(z1)(z2), 'GT')
    assert.strictEqual(integer.ord.compare(z2)(z1), 'LT')
    assert.strictEqual(integer.ord.compare(z2)(z2), 'EQ')
  })

  it('show', () => {
    assert.strictEqual(integer.show(integer.one), '1')
    assert.strictEqual(integer.show(wrap('9007199254740993')), '9007199254740993')
  })

  it('should handle big numbers', () => {
    assertEqual(integer.add(wrap(9007199254740992), integer.one), wrap('9007199254740993'))
  })
})
