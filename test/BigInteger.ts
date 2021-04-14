import * as bigInteger from '../src/BigInteger'
import { gen, property } from 'testcheck'
import { assertProperty, checkOrdLaws, checkRingLaws, BigIntegerGenerator } from './helpers'
import * as BigInteger from 'big-integer'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

describe('BigInteger', () => {
  it('wrap', () => {
    assertProperty(
      property(gen.number, (n) =>
        pipe(
          bigInteger.wrap(n),
          O.fold(
            () => n % 1 !== 0,
            (b) => b.equals(BigInteger(n))
          )
        )
      )
    )
  })

  it('Ord', () => {
    checkOrdLaws(BigIntegerGenerator, bigInteger.eq, bigInteger.ord)
  })

  it('Ring', () => {
    checkRingLaws(BigIntegerGenerator, bigInteger.eq, bigInteger.ring)
  })
})
