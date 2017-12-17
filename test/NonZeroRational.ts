import * as assert from 'assert'
import * as rational from '../src/Rational'
import * as nonZeroRational from '../src/NonZeroRational'
import { some, none } from 'fp-ts/lib/Option'

const nzr2: nonZeroRational.NonZeroRational = [2, 1] as any
const nzr3: nonZeroRational.NonZeroRational = [3, 1] as any

describe('NonZeroRational', () => {
  it('fromRational', () => {
    assert.deepEqual(nonZeroRational.fromRational(rational.one), some([1, 1]))
    assert.deepEqual(nonZeroRational.fromRational(rational.zero), none)
  })

  it('add', () => {
    assert.deepEqual(nonZeroRational.add(nzr2, nzr3), [5, 1])
  })

  it('mul', () => {
    assert.deepEqual(nonZeroRational.mul(nzr2, nzr3), [6, 1])
  })

  it('one', () => {
    assert.deepEqual(nonZeroRational.one, [1, 1])
  })

  it('sub', () => {
    assert.deepEqual(nonZeroRational.sub(nzr2, nzr3), some([-1, 1]))
    assert.deepEqual(nonZeroRational.sub(nzr2, nzr2), none)
  })
})
