import * as assert from 'assert'
import * as M from '../src'
import * as ER from '../src/ExchangeRate'
import * as PR from '../src/PositiveRational'
import { assertEqualDense, unsafeInteger } from './helpers'

const S = M.exchangeRate.getOrd<any, any>()

import PositiveRational = PR.PositiveRational

function unsafePositiveRational(x: number, y: number): PositiveRational {
  return PR.reduce(BigInt(x) as any, BigInt(y) as any)
}

function assertEqual<S, D>(x: ER.ExchangeRate<S, D>): (y: ER.ExchangeRate<S, D>) => void {
  return y => {
    if (!S.equals(x, y)) {
      assert.fail(`${x} !== ${y}`)
    }
  }
}

describe('ExchangeRate', () => {
  it('exchange', () => {
    const jpybtc = ER.wrap<'JPY', 'BTC'>(unsafePositiveRational(3, 1000000))
    const btc = M.dense.fromInteger('BTC', M.integer.one)
    const jpy = M.dense.fromInteger('JPY', unsafeInteger('2'))
    const result = btc.add(ER.exchange(jpybtc)(jpy))
    assertEqualDense(result)(new M.dense.Dense('BTC', unsafePositiveRational(500003, 500000)))
  })

  it('compose', () => {
    const goldsmith = ER.wrap<'XAU', 'JPY'>(unsafePositiveRational(2, 1))
    const fiatshop = ER.wrap<'JPY', 'EUR'>(unsafePositiveRational(3, 1))
    const you = ER.compose(fiatshop, goldsmith)
    assertEqual(you)(ER.wrap<'XAU', 'EUR'>(unsafePositiveRational(6, 1)))
  })
})
