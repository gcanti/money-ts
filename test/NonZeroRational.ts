import { assertProperty, NonZeroRationalGenerator } from './helpers'
import { property } from 'testcheck'
import * as NZR from '../src/NonZeroRational'
import * as R from '../src/Rational'
import * as assert from 'assert'
import * as O from 'fp-ts/lib/Option'

describe('NonZeroRational', () => {
  it('inverse', () => {
    assertProperty(
      property(NonZeroRationalGenerator, r => {
        return NZR.ord.equals(r, NZR.inverse(NZR.inverse(r)))
      })
    )
  })

  it('fromRational', () => {
    assert.deepStrictEqual(NZR.fromRational(R.one), O.some(R.one))
    assert.deepStrictEqual(NZR.fromRational(R.zero), O.none)
  })

  it('sub', () => {
    assert.deepStrictEqual(NZR.sub(NZR.add(NZR.one, NZR.one), NZR.one), O.some(NZR.one))
    assert.deepStrictEqual(NZR.sub(NZR.one, NZR.one), O.none)
  })
})
