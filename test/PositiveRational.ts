import { assertProperty, PositiveRationalGenerator } from './helpers'
import { property } from 'testcheck'
import * as positiveRational from '../src/PositiveRational'

describe('PositiveRational', () => {
  it('inverse', () => {
    assertProperty(
      property(PositiveRationalGenerator, (r) => {
        return positiveRational.Eq.equals(r, positiveRational.inverse(positiveRational.inverse(r)))
      })
    )
  })
})
