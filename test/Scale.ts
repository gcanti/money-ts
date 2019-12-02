import * as assert from 'assert'
import { unsafePositiveRational } from '../src/scale/unsafePositiveRational'

it('unsafePositiveRational', () => {
  assert.throws(() => unsafePositiveRational([1, 0]))
})
