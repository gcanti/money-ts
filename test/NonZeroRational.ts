import { assertProperty, NonZeroRationalGenerator } from './helpers'
import { property } from 'testcheck'
import * as nonZeroRational from '../src/NonZeroRational'

describe('NonZeroRational', () => {
  it('inverse', () => {
    assertProperty(
      property(NonZeroRationalGenerator, r => {
        return nonZeroRational.ord.equals(r, nonZeroRational.inverse(nonZeroRational.inverse(r)))
      })
    )
  })
})
