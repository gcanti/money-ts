import { assertProperty, NonZeroRationalGenerator } from './util'
import { property } from 'testcheck'
import * as nonZeroRational from '../src/NonZeroRational'

describe('NonZeroRational', () => {
  it('inverse', () => {
    assertProperty(
      property(NonZeroRationalGenerator, r => {
        return nonZeroRational.setoid.equals(r, nonZeroRational.inverse(nonZeroRational.inverse(r)))
      })
    )
  })
})
