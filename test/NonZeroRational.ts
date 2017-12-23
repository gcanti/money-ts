import * as assert from 'assert'
import { NonZeroRational } from '../src/NonZeroRational'
import * as nonZeroRational from '../src/NonZeroRational'
import { n1, n2 } from './Integer'
import { Option, some, none, getSetoid } from 'fp-ts/lib/Option'

// function assertEqual(x: NonZeroRational, y: NonZeroRational): void {
//   if (!nonZeroRational.setoid.equals(x)(y)) {
//     assert.fail(`${x} !== ${y}`)
//   }
// }

const S = getSetoid(nonZeroRational.setoid)

function assertEqualOption(x: Option<NonZeroRational>, y: Option<NonZeroRational>): void {
  if (!S.equals(x)(y)) {
    assert.fail(`${x} !== ${y}`)
  }
}

describe('NonZeroRational', () => {
  it('fromInput', () => {
    assertEqualOption(nonZeroRational.fromInput([2, 1]), some([n2, n1] as NonZeroRational))
    assert.deepEqual(nonZeroRational.fromInput([0, 1]), none)
  })
})
