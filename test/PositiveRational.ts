import * as assert from 'assert'
import { PositiveRational } from '../src/PositiveRational'
import * as positiveRational from '../src/PositiveRational'
import { n1, n2 } from './Natural'
import { Option, some, none, getSetoid } from 'fp-ts/lib/Option'

const S = getSetoid(positiveRational.setoid)

function assertEqualOption(x: Option<PositiveRational>, y: Option<PositiveRational>): void {
  if (!S.equals(x)(y)) {
    assert.fail(`${x} !== ${y}`)
  }
}

describe('PositiveRational', () => {
  it('fromInput', () => {
    assertEqualOption(positiveRational.fromInput([2, 1]), some([n2, n1] as PositiveRational))
    assertEqualOption(positiveRational.fromInput([0, 1]), none)
    assertEqualOption(positiveRational.fromInput([-1, 1]), none)
  })
})
