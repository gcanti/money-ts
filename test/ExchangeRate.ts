import * as assert from 'assert'
import { Integer, one } from '../src/Integer'
import * as dense from '../src/Dense'
import * as exchangeRate from '../src/ExchangeRate'

const i2: Integer = 2 as any

describe('ExchangeRate', () => {
  it('exchange', () => {
    const jpybtc = exchangeRate.fromNonZeroRational<'JPY', 'BTC'>([3, 1000000] as any)
    const btc = dense.fromInteger<'BTC'>(one)
    const jpy = dense.fromInteger<'JPY'>(i2)
    const result = dense.add(btc, exchangeRate.exchange(jpybtc)(jpy))
    assert.deepEqual(dense.simplify(result), [500003, 500000])
  })

  it('compose', () => {
    const goldsmith = exchangeRate.fromNonZeroRational<'XAU', 'JPY'>([2, 1] as any)
    const fiatshop = exchangeRate.fromNonZeroRational<'JPY', 'EUR'>([3, 1] as any)
    const you = exchangeRate.compose(fiatshop, goldsmith)
    assert.deepEqual(you, [6, 1])
  })
})
