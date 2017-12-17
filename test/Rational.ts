import * as assert from 'assert'
import * as rational from '../src/Rational'
import { NonZeroRational } from '../src/NonZeroRational'

const unsafeFromTuple = (t: [number, number]): rational.Rational => t as any
const r1_3 = unsafeFromTuple([1, 3])
const r2_3 = unsafeFromTuple([2, 3])
const nzr2_3: NonZeroRational = [2, 3] as any

describe('Rational', () => {
  it('simplify', () => {
    assert.deepEqual(rational.simplify(unsafeFromTuple([4, 2])), [2, 1])
    assert.deepEqual(rational.simplify(unsafeFromTuple([-4, 2])), [-2, 1])
    assert.deepEqual(rational.simplify(unsafeFromTuple([2, 1])), [2, 1])
    assert.deepEqual(rational.simplify(unsafeFromTuple([2, -1])), [2, -1])
  })

  it('isZero', () => {
    assert.deepEqual(rational.isZero(rational.zero), true)
    assert.deepEqual(rational.isZero(rational.one), false)
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

  it('mod', () => {
    assert.deepEqual(rational.mod(unsafeFromTuple([5, 1]), unsafeFromTuple([2, 1])), [1, 1])
    assert.deepEqual(rational.mod(unsafeFromTuple([-5, 1]), unsafeFromTuple([2, 1])), [-1, 1])
  })
})
