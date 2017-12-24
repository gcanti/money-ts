import * as assert from 'assert'
import { NonZeroRational } from '../src/NonZeroRational'
import * as nonZeroRational from '../src/NonZeroRational'
import { i1, i2 } from './Integer'
import { Option, some, none, getSetoid } from 'fp-ts/lib/Option'

const S = getSetoid(nonZeroRational.setoid)

function assertEqualOption(x: Option<NonZeroRational>, y: Option<NonZeroRational>): void {
  if (!S.equals(x)(y)) {
    assert.fail(`${x} !== ${y}`)
  }
}

describe('NonZeroRational', () => {
  it('fromInput', () => {
    assertEqualOption(nonZeroRational.fromInput([2, 1]), some([i2, i1] as NonZeroRational))
    assertEqualOption(nonZeroRational.fromInput([0, 1]), none)
  })
})
