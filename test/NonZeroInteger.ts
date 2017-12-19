import * as assert from 'assert'
import * as integer from '../src/Integer'
import * as nonZeroInteger from '../src/NonZeroInteger'
import { some, none } from 'fp-ts/lib/Option'

const nzi2: nonZeroInteger.NonZeroInteger = 2 as any
const nzi3: nonZeroInteger.NonZeroInteger = 3 as any

describe('NonZeroInteger', () => {
  it('prism', () => {
    assert.deepEqual(nonZeroInteger.prism.getOption(1), some(1))
    assert.deepEqual(nonZeroInteger.prism.getOption(0), none)
    assert.deepEqual(nonZeroInteger.prism.getOption(2.1), none)
  })

  it('fromInteger', () => {
    assert.deepEqual(nonZeroInteger.fromInteger(integer.one), some(1))
    assert.deepEqual(nonZeroInteger.fromInteger(integer.zero), none)
  })

  it('add', () => {
    assert.strictEqual(nonZeroInteger.add(nzi2, nzi3), 5)
  })

  it('mul', () => {
    assert.strictEqual(nonZeroInteger.mul(nzi2, nzi3), 6)
  })

  it('one', () => {
    assert.strictEqual(nonZeroInteger.one, 1)
  })

  it('sub', () => {
    assert.deepEqual(nonZeroInteger.sub(nzi2, nzi3), some(-1))
    assert.deepEqual(nonZeroInteger.sub(nzi2, nzi2), none)
  })
})
