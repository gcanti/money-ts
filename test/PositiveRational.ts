import { assertProperty, PositiveRationalGenerator } from './helpers'
import { property } from 'testcheck'
import * as PR from '../src/PositiveRational'
import * as assert from 'assert'
import * as O from 'fp-ts/lib/Option'
import * as R from '../src/Rational'

describe('PositiveRational', () => {
  it('inverse', () => {
    assertProperty(
      property(PositiveRationalGenerator, r => {
        return PR.ord.equals(r, PR.inverse(PR.inverse(r)))
      })
    )
  })

  it('fromRational', () => {
    assert.deepStrictEqual(PR.fromRational(R.one), O.some(R.one))
    assert.deepStrictEqual(PR.fromRational(R.zero), O.none)
  })

  it('sub', () => {
    assert.deepStrictEqual(PR.sub(PR.add(PR.one, PR.one), PR.one), O.some(PR.one))
    assert.deepStrictEqual(PR.sub(PR.one, PR.one), O.none)
  })
})
