import * as assert from 'assert'
import * as O from 'fp-ts/Option'
import { NonZeroInteger } from '../src/NonZeroInteger'
import * as integer from '../src/Integer'
import * as nonZeroInteger from '../src/NonZeroInteger'
import * as BigInteger from 'big-integer'
import { getAssertEqual, getAssertEqualOption, assertProperty, IntegerGenerator, unsafeNatural } from './helpers'
import { property } from 'testcheck'
import { pipe } from 'fp-ts/function'

const wrap = (x: number | string): NonZeroInteger => BigInteger(x as any) as any

const n1 = unsafeNatural(1)
const nz1 = wrap(1)
const nz2 = wrap(2)
const nz3 = wrap(3)
const nz4 = wrap(4)
const nz5 = wrap(5)
const nz6 = wrap(6)
const nz12 = wrap(12)
const zz1 = wrap(-1)

const assertEqual = getAssertEqual(nonZeroInteger.eq)

const assertEqualOption = getAssertEqualOption(nonZeroInteger.eq)

describe('NonZeroInteger', () => {
  it('fromInteger', () => {
    assertProperty(
      property(IntegerGenerator, (i) =>
        pipe(
          nonZeroInteger.fromInteger(i),
          O.fold(
            () => integer.eq.equals(i, integer.zero),
            () => true
          )
        )
      )
    )
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
    assertEqualOption(nonZeroInteger.sub(nz2, nz3), O.some(zz1))
    assertEqualOption(nonZeroInteger.sub(nz2, nz2), O.none)
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
    assert.strictEqual(nonZeroInteger.ord.compare(nz1, nz2), -1)
    assert.strictEqual(nonZeroInteger.ord.compare(nz2, nz1), 1)
    assert.strictEqual(nonZeroInteger.ord.compare(nz2, nz2), 0)
  })

  it('sign', () => {
    assert.strictEqual(nonZeroInteger.sign(nz1), 1)
    assert.strictEqual(nonZeroInteger.sign(zz1), -1)
  })

  it('isPositive', () => {
    assert.strictEqual(nonZeroInteger.isPositive(nz1), true)
    assert.strictEqual(nonZeroInteger.isPositive(zz1), false)
  })

  it('abs', () => {
    assertEqual(nonZeroInteger.abs(nz1), n1)
    assertEqual(nonZeroInteger.abs(zz1), n1)
  })

  it('show', () => {
    assert.strictEqual(nonZeroInteger.show(nonZeroInteger.one), '1')
    assert.strictEqual(nonZeroInteger.show(wrap('9007199254740993')), '9007199254740993')
  })

  it('should handle big numbers', () => {
    assertEqual(nonZeroInteger.add(wrap(9007199254740992), nonZeroInteger.one), wrap('9007199254740993'))
  })
})
