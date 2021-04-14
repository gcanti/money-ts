import * as assert from 'assert'
import * as O from 'fp-ts/Option'
import * as integer from '../src/Integer'
import * as natural from '../src/Natural'
import { getAssertEqual, getAssertEqualOption, assertProperty, IntegerGenerator, unsafeNatural } from './helpers'
import { property } from 'testcheck'
import * as Ord from 'fp-ts/Ord'
import { pipe } from 'fp-ts/function'

const n1 = unsafeNatural(1)
const n2 = unsafeNatural(2)
const n3 = unsafeNatural(3)
const n4 = unsafeNatural(4)
const n5 = unsafeNatural(5)
const n6 = unsafeNatural(6)
const n12 = unsafeNatural(12)

const assertEqual = getAssertEqual(natural.eq)

const assertEqualOption = getAssertEqualOption(natural.eq)

describe('Natural', () => {
  it('fromInteger', () => {
    const lte = Ord.leq(integer.ord)
    const gte = Ord.geq(natural.ord)
    assertProperty(
      property(IntegerGenerator, (i) =>
        pipe(
          natural.fromInteger(i),
          O.fold(
            () => lte(i, integer.zero),
            (n) => gte(n, natural.one)
          )
        )
      )
    )
  })

  it('add', () => {
    assertEqual(natural.add(n2, n3), n5)
    assertEqual(natural.add(unsafeNatural('9007199254740992'), natural.one), unsafeNatural('9007199254740993'))
  })

  it('mul', () => {
    assertEqual(natural.mul(n2, n3), n6)
  })

  it('sub', () => {
    assertEqualOption(natural.sub(n3, n2), O.some(n1))
    assertEqualOption(natural.sub(n2, n2), O.none)
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
    assert.strictEqual(natural.ord.compare(n1, n2), -1)
    assert.strictEqual(natural.ord.compare(n2, n1), 1)
    assert.strictEqual(natural.ord.compare(n2, n2), 0)
  })

  it('show', () => {
    assert.strictEqual(natural.show(unsafeNatural(100)), '100')
    assert.strictEqual(natural.show(unsafeNatural('9007199254740993')), '9007199254740993')
  })
})
