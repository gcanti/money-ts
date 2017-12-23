import * as assert from 'assert'
import { ExchangeRate } from '../src/ExchangeRate'
import * as integer from '../src/Integer'
import * as dense from '../src/Dense'
import * as exchangeRate from '../src/ExchangeRate'
import * as nonZeroRational from '../src/NonZeroRational'
import { fromSome } from '../src/scale/fromSome'
import { n2 } from './Integer'
import { assertEqual as assertEqualDense } from './Dense'

const S = exchangeRate.getSetoid<any, any>()

export function assertEqual<S, D>(x: ExchangeRate<S, D>): (y: ExchangeRate<S, D>) => void {
  return y => {
    if (!S.equals(x)(y)) {
      assert.fail(`${x} !== ${y}`)
    }
  }
}

describe('ExchangeRate', () => {
  it('exchange', () => {
    const jpybtc = exchangeRate.wrap<'JPY', 'BTC'>(fromSome(nonZeroRational.fromInput([3, 1000000])))
    const btc = dense.fromInteger('BTC', integer.one)
    const jpy = dense.fromInteger('JPY', n2)
    const result = btc.add(exchangeRate.exchange(jpybtc)(jpy))
    assertEqualDense(result)(new dense.Dense('BTC', fromSome(nonZeroRational.fromInput([500003, 500000]))))
  })

  it('compose', () => {
    const goldsmith = exchangeRate.wrap<'XAU', 'JPY'>(fromSome(nonZeroRational.fromInput([2, 1])))
    const fiatshop = exchangeRate.wrap<'JPY', 'EUR'>(fromSome(nonZeroRational.fromInput([3, 1])))
    const you = exchangeRate.compose(fiatshop, goldsmith)
    assertEqual(you)(exchangeRate.wrap<'XAU', 'EUR'>(fromSome(nonZeroRational.fromInput([6, 1]))))
  })
})
