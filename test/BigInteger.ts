import * as bigInteger from '../src/BigInteger'
import { gen, property } from 'testcheck'
import { assertProperty, checkOrdLaws, checkRingLaws, BigIntegerGenerator } from './helpers'
import * as BigInteger from 'big-integer'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

describe('BigInteger', () => {
  it('wrap', () => {
    assertProperty(
      property(gen.number, n => {
        return pipe(
          bigInteger.wrap(n),
          O.fold(
            () => n % 1 !== 0,
            b => b.equals(BigInteger(n))
          )
        )
      })
    )
  })

  it('Ord', () => {
    checkOrdLaws(BigIntegerGenerator, bigInteger.ord, bigInteger.ord)
  })

  it('Ring', () => {
    checkRingLaws(BigIntegerGenerator, bigInteger.ord, bigInteger.ring)
  })
})
