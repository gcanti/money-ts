import * as assert from 'assert'
import * as O from 'fp-ts/lib/Option'
import { geq, leq } from 'fp-ts/lib/Ord'
import { pipe } from 'fp-ts/lib/pipeable'
import { property } from 'testcheck'
import * as I from '../src/Integer'
import * as N from '../src/Natural'
import { assertProperty, getAssertEqual, getAssertEqualOption, IntegerGenerator, unsafeNatural } from './helpers'

const n1 = unsafeNatural(1)
const n2 = unsafeNatural(2)
const n3 = unsafeNatural(3)
const n4 = unsafeNatural(4)
const n5 = unsafeNatural(5)
const n6 = unsafeNatural(6)
const n12 = unsafeNatural(12)

const assertEqual = getAssertEqual(N.ord)

const assertEqualOption = getAssertEqualOption(N.ord)

describe('Natural', () => {
  it('fromInteger', () => {
    const lte = leq(I.ord)
    const gte = geq(N.ord)
    assertProperty(
      property(IntegerGenerator, i => {
        return pipe(
          N.fromInteger(i),
          O.fold(
            () => lte(i, I.zero),
            n => gte(n, N.one)
          )
        )
      })
    )
  })

  it('add', () => {
    assertEqual(N.add(n2, n3), n5)
    assertEqual(N.add(unsafeNatural('9007199254740992'), N.one), unsafeNatural('9007199254740993'))
  })

  it('mul', () => {
    assertEqual(N.mul(n2, n3), n6)
  })

  it('sub', () => {
    assertEqualOption(N.sub(n3, n2), O.some(n1))
    assertEqualOption(N.sub(n2, n2), O.none)
  })

  it('div', () => {
    assertEqual(N.div(n6, n2), n3)
    assertEqual(N.div(n6, n4), n1)
  })

  it('gcd', () => {
    assertEqual(N.gcd(n6, n4), n2)
  })

  it('lcm', () => {
    assertEqual(N.lcm(n6, n4), n12)
  })

  it('ord', () => {
    assert.strictEqual(N.ord.compare(n1, n2), -1)
    assert.strictEqual(N.ord.compare(n2, n1), 1)
    assert.strictEqual(N.ord.compare(n2, n2), 0)
  })

  it('show', () => {
    assert.strictEqual(N.show(unsafeNatural(100)), '100')
    assert.strictEqual(N.show(unsafeNatural('9007199254740993')), '9007199254740993')
  })
})
