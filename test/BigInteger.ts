import * as assert from 'assert'
import * as bigInteger from '../src/BigInteger'
import { some, none } from 'fp-ts/lib/Option'

describe('BigInteger', () => {
  it('wrap', () => {
    assert.deepEqual(bigInteger.wrap(1), some(bigInteger.one))
    assert.deepEqual(bigInteger.wrap(1.1), none)
  })
})
