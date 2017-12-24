import * as assert from 'assert'
import { Option, some, none, getSetoid } from 'fp-ts/lib/Option'
import { Natural } from '../src/Natural'
import * as integer from '../src/Integer'
import * as natural from '../src/Natural'
import { i3 } from './Integer'
import * as BigInteger from 'big-integer'

const wrap = (x: number | string): Natural => BigInteger(x as any) as any

export const n1 = wrap(1)
export const n2 = wrap(2)
export const n3 = wrap(3)
export const n4 = wrap(4)
export const n5 = wrap(5)
export const n6 = wrap(6)
export const n12 = wrap(12)

function assertEqual(x: Natural, y: Natural): void {
  if (!natural.setoid.equals(x)(y)) {
    assert.fail(`${x} !== ${y}`)
  }
}

const S = getSetoid(natural.setoid)

function assertEqualOption(x: Option<Natural>, y: Option<Natural>): void {
  if (!S.equals(x)(y)) {
    assert.fail(`${x} !== ${y}`)
  }
}

describe('Natural', () => {
  it('fromInteger', () => {
    assertEqualOption(natural.fromInteger(i3), some(n3))
    assertEqualOption(natural.fromInteger(integer.zero), none)
  })

  it('add', () => {
    assertEqual(natural.add(n2, n3), n5)
  })

  it('mul', () => {
    assertEqual(natural.mul(n2, n3), n6)
  })

  it('one', () => {
    assertEqual(natural.one, n1)
  })

  it('sub', () => {
    assertEqualOption(natural.sub(n3, n2), some(n1))
    assertEqualOption(natural.sub(n2, n2), none)
  })

  it('div', () => {
    assertEqual(natural.div(n6, n2), n3)
    assertEqual(natural.div(n6, n4), n1)
  })

  it('gcd', () => {
    assertEqual(natural.gcd(n6, n4), n2)
  })

  it('lcm', () => {
    assertEqual(natural.lcm(n6, n4), n12)
  })

  it('ord', () => {
    assert.strictEqual(natural.ord.compare(n1)(n2), 'LT')
    assert.strictEqual(natural.ord.compare(n2)(n1), 'GT')
    assert.strictEqual(natural.ord.compare(n2)(n2), 'EQ')
  })

  it('show', () => {
    assert.strictEqual(natural.show(natural.one), '1')
    assert.strictEqual(natural.show(wrap('9007199254740993')), '9007199254740993')
  })

  it('should handle big numbers', () => {
    assertEqual(natural.add(wrap(9007199254740992), natural.one), wrap('9007199254740993'))
  })
})
