import * as assert from 'assert'
import { Integer } from '../src/Integer'
import * as integer from '../src/Integer'
import * as nonZeroInteger from '../src/NonZeroInteger'
import { fromSome } from '../src/scale/fromSome'
import { Option, getSetoid, some, none } from 'fp-ts/lib/Option'
import * as BigInteger from 'big-integer'

const wrap = (x: number | string): Integer => BigInteger(x as any) as any

export const i0 = wrap(0)
export const i1 = wrap(1)
export const i2 = wrap(2)
export const i3 = wrap(3)
export const i5 = wrap(5)
export const i6 = wrap(6)
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
    assertEqualOption(integer.fromInput(1), some(i1))
    assertEqualOption(integer.fromInput(-1), some(z1))
    assertEqualOption(integer.fromInput(1.1), none)
  })

  it('add', () => {
    assertEqual(integer.add(i2, i3), i5)
  })

  it('mul', () => {
    assertEqual(integer.mul(i2, i3), i6)
  })

  it('one', () => {
    assertEqual(integer.one, i1)
  })

  it('negate', () => {
    assertEqual(integer.negate(integer.one), z1)
  })

  it('sub', () => {
    assertEqual(integer.sub(i2, i3), z1)
  })

  it('zero', () => {
    assertEqual(integer.zero, i0)
  })

  it('div', () => {
    assertEqual(integer.div(i6, nz2), i3)
    assertEqual(integer.div(i6, nz4), i1)
  })

  it('isZero', () => {
    assert.strictEqual(integer.isZero(i0), true)
    assert.strictEqual(integer.isZero(i5), false)
  })

  it('isPositive', () => {
    assert.strictEqual(integer.isPositive(i0), false)
    assert.strictEqual(integer.isPositive(i5), true)
    assert.strictEqual(integer.isPositive(z1), false)
  })

  it('sign', () => {
    assert.strictEqual(integer.sign(i1), 1)
    assert.strictEqual(integer.sign(i0), 0)
    assert.strictEqual(integer.sign(z1), -1)
  })

  it('ord', () => {
    assert.strictEqual(integer.ord.compare(i1)(i2), 'LT')
    assert.strictEqual(integer.ord.compare(i2)(i1), 'GT')
    assert.strictEqual(integer.ord.compare(i2)(i2), 'EQ')
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
