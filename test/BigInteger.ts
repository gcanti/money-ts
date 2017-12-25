import * as bigInteger from '../src/BigInteger'
import { gen, property } from 'testcheck'
import { assertProperty, checkOrdLaws, checkRingLaws, BigIntegerGenerator } from './util'
import * as BigInteger from 'big-integer'

describe('BigInteger', () => {
  it('wrap', () => {
    assertProperty(
      property(gen.number, n => {
        return bigInteger.wrap(n).fold(() => n % 1 !== 0, b => b.equals(BigInteger(n)))
      })
    )
  })

  it('Ord', () => {
    checkOrdLaws(BigIntegerGenerator, bigInteger.setoid, bigInteger.ord)
  })

  it('Ring', () => {
    checkRingLaws(BigIntegerGenerator, bigInteger.setoid, bigInteger.ring)
  })
})
