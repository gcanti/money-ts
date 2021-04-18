import * as assert from 'assert'
import * as M from '../src'
import * as D from '../src/Dense'
import * as DC from '../src/Discrete'
import '../src/scale/EUR'
import '../src/scale/XAU'
import * as BigInteger from 'big-integer'
import { unsafePositiveRational } from '../src/scale/unsafePositiveRational'
import { unsafeRational, assertEqualDense, assertEqualDiscrete, assertProperty, getDenseGenerator } from './helpers'
import { property } from 'testcheck'

describe('Dense', () => {
  it('fromDiscrete', () => {
    assertEqualDense(D.fromDiscrete(new DC.Discrete({ dimension: 'EUR', unit: 'cent' }, M.integer.one)))(
      new D.Dense('EUR', unsafePositiveRational([1, 100]))
    )
    assertEqualDense(D.fromDiscrete(new DC.Discrete({ dimension: 'EUR', unit: 'euro' }, M.integer.one)))(
      new D.Dense('EUR', unsafePositiveRational([1, 1]))
    )
    assertEqualDense(D.fromDiscrete(new DC.Discrete({ dimension: 'XAU', unit: 'gram' }, M.integer.one)))(
      new D.Dense('XAU', unsafePositiveRational([1000000, 31103477]))
    )
  })

  it('mul', () => {
    assertEqualDense(new D.Dense('EUR', unsafePositiveRational([3, 1])).mul(unsafePositiveRational([4, 1])))(
      new D.Dense('EUR', unsafePositiveRational([12, 1]))
    )
  })

  it('div', () => {
    assertEqualDense(new D.Dense('EUR', unsafePositiveRational([4, 1])).div(unsafePositiveRational([4, 1])))(
      new D.Dense('EUR', M.rational.one)
    )
  })

  it('toString', () => {
    assert.strictEqual(new D.Dense('EUR', unsafePositiveRational([4, 1])).toString(), 'EUR 4 / 1')
  })

  it('floor', () => {
    const [d1, rest1] = D.floor('cent', new D.Dense('EUR', unsafePositiveRational([124, 100])))
    assertEqualDiscrete(d1)(new DC.Discrete({ dimension: 'EUR', unit: 'cent' }, M.integer.wrap(BigInteger(124))))
    assertEqualDense(rest1)(D.getZero('EUR'))
    assertProperty(
      property(getDenseGenerator('EUR'), (euro) => {
        const [cent, rest] = D.floor('cent', euro)
        return D.getEq<'EUR'>().equals(D.fromDiscrete(cent).add(rest), euro)
      })
    )
  })

  it('round', () => {
    const [d1, rest1] = D.round('euro', new D.Dense('EUR', unsafePositiveRational([124, 100])))
    assertEqualDiscrete(d1)(new DC.Discrete({ dimension: 'EUR', unit: 'euro' }, M.integer.wrap(BigInteger(1))))
    assertEqualDense(rest1)(new D.Dense('EUR', unsafePositiveRational([24, 100])))
    assertProperty(
      property(getDenseGenerator('EUR'), (euro) => {
        const [cent, rest] = D.round('cent', euro)
        return D.getEq<'EUR'>().equals(D.fromDiscrete(cent).add(rest), euro)
      })
    )
  })

  it('ceil', () => {
    const [d1, rest1] = D.ceil('euro', new D.Dense('EUR', unsafePositiveRational([124, 100])))
    assertEqualDiscrete(d1)(new DC.Discrete({ dimension: 'EUR', unit: 'euro' }, M.integer.wrap(BigInteger(2))))
    assertEqualDense(rest1)(new D.Dense('EUR', unsafeRational([-76, 100])))
    assertProperty(
      property(getDenseGenerator('EUR'), (euro) => {
        const [cent, rest] = D.ceil('cent', euro)
        return D.getEq<'EUR'>().equals(D.fromDiscrete(cent).add(rest), euro)
      })
    )
  })

  it('trunc', () => {
    const [d1, rest1] = D.trunc('euro', new D.Dense('EUR', unsafePositiveRational([124, 100])))
    assertEqualDiscrete(d1)(new DC.Discrete({ dimension: 'EUR', unit: 'euro' }, M.integer.wrap(BigInteger(1))))
    assertEqualDense(rest1)(new D.Dense('EUR', unsafePositiveRational([24, 100])))

    const [d2, rest2] = D.trunc('euro', new D.Dense('EUR', unsafeRational([-124, 100])))
    assertEqualDiscrete(d2)(new DC.Discrete({ dimension: 'EUR', unit: 'euro' }, M.integer.wrap(BigInteger(-1))))
    assertEqualDense(rest2)(new D.Dense('EUR', unsafeRational([-24, 100])))

    assertProperty(
      property(getDenseGenerator('EUR'), (euro) => {
        const [cent, rest] = D.trunc('cent', euro)
        return D.getEq<'EUR'>().equals(D.fromDiscrete(cent).add(rest), euro)
      })
    )
  })
})
