import * as assert from 'assert'
import { NonZeroRational } from '../src/NonZeroRational'
import { some, none } from 'fp-ts/lib/Option'
import { Rational } from '../src/Rational'
import * as rational from '../src/Rational'
import * as integer from '../src/Integer'
import * as nonZeroInteger from '../src/NonZeroInteger'

const unsafe = ([n, d]: [number, number]): Rational => [integer.unsafeFromNumber(n), nonZeroInteger.unsafeFromNumber(d)]

const r1_3 = unsafe([1, 3])
const r2_3 = unsafe([2, 3])
const nzr2_3: NonZeroRational = [2, 3] as any

describe('Rational', () => {
  it('prism', () => {
    assert.deepEqual(rational.fromTuple([2, 1]), some([2, 1]))
    assert.deepEqual(rational.fromTuple([0, 1]), some([0, 1]))
    assert.deepEqual(rational.fromTuple([2.1, 1]), none)
    assert.deepEqual(rational.fromTuple([2, 1.1]), none)
    assert.deepEqual(rational.fromTuple([2, 0]), none)
  })

  it('simplify', () => {
    assert.deepEqual(rational.simplify(unsafe([4, 2])), [2, 1])
    assert.deepEqual(rational.simplify(unsafe([-4, 2])), [-2, 1])
    assert.deepEqual(rational.simplify(unsafe([2, 1])), [2, 1])
    assert.deepEqual(rational.simplify(unsafe([2, -1])), [2, -1])
    assert.deepEqual(rational.simplify(unsafe([0, 1])), [0, 1])
    assert.deepEqual(rational.simplify(unsafe([0, 0])), [0, 0])
    assert.deepEqual(rational.simplify(unsafe([1, 0])), [1, 0])
  })

  it('isZero', () => {
    assert.deepEqual(rational.isZero(rational.zero), true)
    assert.deepEqual(rational.isZero(rational.one), false)
  })

  it('numerator', () => {
    assert.strictEqual(rational.numerator(rational.zero), 0)
  })

  it('denominator', () => {
    assert.strictEqual(rational.denominator(rational.zero), 1)
  })

  it('add', () => {
    assert.deepEqual(rational.add(r1_3, r2_3), [9, 9])
  })

  it('sub', () => {
    assert.deepEqual(rational.sub(r1_3, r2_3), [-3, 9])
  })

  it('mul', () => {
    assert.deepEqual(rational.mul(r1_3, r2_3), [2, 9])
  })

  it('div', () => {
    assert.deepEqual(rational.div(r1_3, nzr2_3), [3, 6])
  })

  it('div_', () => {
    assert.deepEqual(rational.div_(r1_3, r2_3), some([3, 6]))
    assert.deepEqual(rational.div_(r1_3, rational.zero), none)
  })
})
