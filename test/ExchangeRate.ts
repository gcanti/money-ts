import * as assert from 'assert'
import * as M from '../src'
import { ExchangeRate } from '../src/ExchangeRate'
import * as exchangeRate from '../src/ExchangeRate'
import { unsafePositiveRational } from '../src/scale/unsafePositiveRational'
import { unsafeInteger, assertEqualDense } from './helpers'

const S = M.exchangeRate.getSetoid<any, any>()

function assertEqual<S, D>(x: ExchangeRate<S, D>): (y: ExchangeRate<S, D>) => void {
  return y => {
    if (!S.equals(x, y)) {
      assert.fail(`${x} !== ${y}`)
    }
  }
}

describe('ExchangeRate', () => {
  it('exchange', () => {
    const jpybtc = exchangeRate.wrap<'JPY', 'BTC'>(unsafePositiveRational([3, 1000000]))
    const btc = M.dense.fromInteger('BTC', M.integer.one)
    const jpy = M.dense.fromInteger('JPY', unsafeInteger(2))
    const result = btc.add(exchangeRate.exchange(jpybtc)(jpy))
    assertEqualDense(result)(new M.dense.Dense('BTC', unsafePositiveRational([500003, 500000])))
  })

  it('compose', () => {
    const goldsmith = exchangeRate.wrap<'XAU', 'JPY'>(unsafePositiveRational([2, 1]))
    const fiatshop = exchangeRate.wrap<'JPY', 'EUR'>(unsafePositiveRational([3, 1]))
    const you = exchangeRate.compose(
      fiatshop,
      goldsmith
    )
    assertEqual(you)(exchangeRate.wrap<'XAU', 'EUR'>(unsafePositiveRational([6, 1])))
  })
})
