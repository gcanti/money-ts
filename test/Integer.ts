import * as assert from 'assert'
import * as integer from '../src/Integer'
import * as nonZeroInteger from '../src/NonZeroInteger'
import { some, none } from 'fp-ts/lib/Option'

const i2: integer.Integer = 2 as any
const i3: integer.Integer = 3 as any

describe('Integer', () => {
  it('prism', () => {
    assert.deepEqual(integer.prism.getOption(1), some(1))
    assert.deepEqual(integer.prism.getOption(0), some(0))
    assert.deepEqual(integer.prism.getOption(2.1), none)
  })

  it('fromNonZeroInteger', () => {
    assert.strictEqual(integer.fromNonZeroInteger(nonZeroInteger.one), 1)
  })

  it('add', () => {
    assert.strictEqual(integer.add(i2, i3), 5)
  })

  it('mul', () => {
    assert.strictEqual(integer.mul(i2, i3), 6)
  })

  it('one', () => {
    assert.strictEqual(integer.one, 1)
  })

  it('sub', () => {
    assert.strictEqual(integer.sub(i2, i3), -1)
  })

  it('zero', () => {
    assert.strictEqual(integer.zero, 0)
  })
})
