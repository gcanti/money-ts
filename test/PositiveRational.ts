import { assertProperty, PositiveRationalGenerator } from './util'
import { property } from 'testcheck'
import * as positiveRational from '../src/PositiveRational'

describe('PositiveRational', () => {
  it('inverse', () => {
    assertProperty(
      property(PositiveRationalGenerator, r => {
        return positiveRational.setoid.equals(r)(positiveRational.inverse(positiveRational.inverse(r)))
      })
    )
  })
})
