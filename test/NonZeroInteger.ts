import * as assert from 'assert'
import * as O from 'fp-ts/Option'
import * as I from '../src/Integer'
import * as NZI from '../src/NonZeroInteger'
import * as BigInteger from 'big-integer'
import { getAssertEqual, getAssertEqualOption, assertProperty, IntegerGenerator, unsafeNatural } from './helpers'
import { property } from 'testcheck'
import { pipe } from 'fp-ts/function'

const wrap = (x: number | string): NZI.NonZeroInteger => BigInteger(x as any) as any

const n1 = unsafeNatural(1)
const nz1 = wrap(1)
const nz2 = wrap(2)
const nz3 = wrap(3)
const nz4 = wrap(4)
const nz5 = wrap(5)
const nz6 = wrap(6)
const nz12 = wrap(12)
const zz1 = wrap(-1)

const assertEqual = getAssertEqual(NZI.Eq)

const assertEqualOption = getAssertEqualOption(NZI.Eq)

describe('NonZeroInteger', () => {
  it('fromInteger', () => {
    assertProperty(
      property(IntegerGenerator, (i) =>
        pipe(
          NZI.fromInteger(i),
          O.fold(
            () => I.Eq.equals(i, I.zero),
            () => true
          )
        )
      )
    )
  })

  it('add', () => {
    assertEqual(NZI.add(nz2, nz3), nz5)
  })

  it('mul', () => {
    assertEqual(NZI.mul(nz2, nz3), nz6)
  })

  it('one', () => {
    assertEqual(NZI.one, nz1)
  })

  it('negate', () => {
    assertEqual(NZI.negate(NZI.one), zz1)
  })

  it('sub', () => {
    assertEqualOption(NZI.sub(nz2, nz3), O.some(zz1))
    assertEqualOption(NZI.sub(nz2, nz2), O.none)
  })

  it('div', () => {
    assertEqual(NZI.div(nz6, nz2), nz3)
    assertEqual(NZI.div(nz6, nz4), nz1)
  })

  it('gcd', () => {
    assertEqual(NZI.gcd(nz6, nz4), nz2)
    assertEqual(NZI.gcd(I.zero, nz4), nz4)
  })

  it('lcm', () => {
    assertEqual(NZI.lcm(nz6, nz4), nz12)
  })

  it('Ord', () => {
    assert.strictEqual(NZI.Ord.compare(nz1, nz2), -1)
    assert.strictEqual(NZI.Ord.compare(nz2, nz1), 1)
    assert.strictEqual(NZI.Ord.compare(nz2, nz2), 0)
  })

  it('sign', () => {
    assert.strictEqual(NZI.sign(nz1), 1)
    assert.strictEqual(NZI.sign(zz1), -1)
  })

  it('isPositive', () => {
    assert.strictEqual(NZI.isPositive(nz1), true)
    assert.strictEqual(NZI.isPositive(zz1), false)
  })

  it('abs', () => {
    assertEqual(NZI.abs(nz1), n1)
    assertEqual(NZI.abs(zz1), n1)
  })

  it('show', () => {
    assert.strictEqual(NZI.show(NZI.one), '1')
    assert.strictEqual(NZI.show(wrap('9007199254740993')), '9007199254740993')
  })

  it('should handle big numbers', () => {
    assertEqual(NZI.add(wrap(9007199254740992), NZI.one), wrap('9007199254740993'))
  })
})
