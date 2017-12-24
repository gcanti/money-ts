import * as assert from 'assert'
import { Option, some, none, getSetoid } from 'fp-ts/lib/Option'
import { NonZeroInteger } from '../src/NonZeroInteger'
import * as integer from '../src/Integer'
import * as nonZeroInteger from '../src/NonZeroInteger'
import { i3 } from './Integer'
import * as BigInteger from 'big-integer'

const wrap = (x: number | string): NonZeroInteger => BigInteger(x as any) as any

export const nz1 = wrap(1)
export const nz2 = wrap(2)
export const nz3 = wrap(3)
export const nz4 = wrap(4)
export const nz5 = wrap(5)
export const nz6 = wrap(6)
export const nz12 = wrap(12)
export const zz1 = wrap(-1)

function assertEqual(x: NonZeroInteger, y: NonZeroInteger): void {
  if (!nonZeroInteger.setoid.equals(x)(y)) {
    assert.fail(`${x} !== ${y}`)
  }
}

const S = getSetoid(nonZeroInteger.setoid)

function assertEqualOption(x: Option<NonZeroInteger>, y: Option<NonZeroInteger>): void {
  if (!S.equals(x)(y)) {
    assert.fail(`${x} !== ${y}`)
  }
}

describe('NonZeroInteger', () => {
  it('fromInteger', () => {
    assertEqualOption(nonZeroInteger.fromInteger(i3), some(nz3))
    assertEqualOption(nonZeroInteger.fromInteger(integer.zero), none)
  })

  it('add', () => {
    assertEqual(nonZeroInteger.add(nz2, nz3), nz5)
  })

  it('mul', () => {
    assertEqual(nonZeroInteger.mul(nz2, nz3), nz6)
  })

  it('one', () => {
    assertEqual(nonZeroInteger.one, nz1)
  })

  it('negate', () => {
    assertEqual(nonZeroInteger.negate(nonZeroInteger.one), zz1)
  })

  it('sub', () => {
    assertEqualOption(nonZeroInteger.sub(nz2, nz3), some(zz1))
    assertEqualOption(nonZeroInteger.sub(nz2, nz2), none)
  })

  it('div', () => {
    assertEqual(nonZeroInteger.div(nz6, nz2), nz3)
    assertEqual(nonZeroInteger.div(nz6, nz4), nz1)
  })

  it('gcd', () => {
    assertEqual(nonZeroInteger.gcd(nz6, nz4), nz2)
    assertEqual(nonZeroInteger.gcd(integer.zero, nz4), nz4)
  })

  it('lcm', () => {
    assertEqual(nonZeroInteger.lcm(nz6, nz4), nz12)
  })

  it('ord', () => {
    assert.strictEqual(nonZeroInteger.ord.compare(nz1)(nz2), 'LT')
    assert.strictEqual(nonZeroInteger.ord.compare(nz2)(nz1), 'GT')
    assert.strictEqual(nonZeroInteger.ord.compare(nz2)(nz2), 'EQ')
  })

  it('sign', () => {
    assert.strictEqual(nonZeroInteger.sign(nz1), 1)
    assert.strictEqual(nonZeroInteger.sign(zz1), -1)
  })

  it('show', () => {
    assert.strictEqual(nonZeroInteger.show(nonZeroInteger.one), '1')
    assert.strictEqual(nonZeroInteger.show(wrap('9007199254740993')), '9007199254740993')
  })

  it('should handle big numbers', () => {
    assertEqual(nonZeroInteger.add(wrap(9007199254740992), nonZeroInteger.one), wrap('9007199254740993'))
  })
})
