import * as assert from 'assert'
import * as M from '../src'
import { Dense, fromDiscrete } from '../src/Dense'
import * as dense from '../src/Dense'
import { Discrete } from '../src/Discrete'
import '../src/scale/EUR'
import '../src/scale/XAU'
import * as BigInteger from 'big-integer'
import { unsafePositiveRational } from '../src/scale/unsafePositiveRational'
import { unsafeRational, assertEqualDense, assertEqualDiscrete, assertProperty, getDenseGenerator } from './helpers'
import { property } from 'testcheck'

describe('Dense', () => {
  it('fromDiscrete', () => {
    assertEqualDense(dense.fromDiscrete(new Discrete({ dimension: 'EUR', unit: 'cent' }, M.integer.one)))(
      new Dense('EUR', unsafePositiveRational([1, 100]))
    )
    assertEqualDense(dense.fromDiscrete(new Discrete({ dimension: 'EUR', unit: 'euro' }, M.integer.one)))(
      new Dense('EUR', unsafePositiveRational([1, 1]))
    )
    assertEqualDense(dense.fromDiscrete(new Discrete({ dimension: 'XAU', unit: 'gram' }, M.integer.one)))(
      new Dense('XAU', unsafePositiveRational([1000000, 31103477]))
    )
  })

  it('mul', () => {
    assertEqualDense(new Dense('EUR', unsafePositiveRational([3, 1])).mul(unsafePositiveRational([4, 1])))(
      new Dense('EUR', unsafePositiveRational([12, 1]))
    )
  })

  it('div', () => {
    assertEqualDense(new Dense('EUR', unsafePositiveRational([4, 1])).div(unsafePositiveRational([4, 1])))(
      new Dense('EUR', M.rational.one)
    )
  })

  it('toString', () => {
    assert.strictEqual(new Dense('EUR', unsafePositiveRational([4, 1])).toString(), 'EUR 4 / 1')
  })

  it('floor', () => {
    const [d1, rest1] = dense.floor('cent', new Dense('EUR', unsafePositiveRational([124, 100])))
    assertEqualDiscrete(d1)(new Discrete({ dimension: 'EUR', unit: 'cent' }, M.integer.wrap(BigInteger(124))))
    assertEqualDense(rest1)(dense.getZero('EUR'))
    assertProperty(
      property(getDenseGenerator('EUR'), (euro) => {
        const [cent, rest] = dense.floor('cent', euro)
        return dense.getEq<'EUR'>().equals(fromDiscrete(cent).add(rest), euro)
      })
    )
  })

  it('round', () => {
    const [d1, rest1] = dense.round('euro', new Dense('EUR', unsafePositiveRational([124, 100])))
    assertEqualDiscrete(d1)(new Discrete({ dimension: 'EUR', unit: 'euro' }, M.integer.wrap(BigInteger(1))))
    assertEqualDense(rest1)(new Dense('EUR', unsafePositiveRational([24, 100])))
    assertProperty(
      property(getDenseGenerator('EUR'), (euro) => {
        const [cent, rest] = dense.round('cent', euro)
        return dense.getEq<'EUR'>().equals(fromDiscrete(cent).add(rest), euro)
      })
    )
  })

  it('ceil', () => {
    const [d1, rest1] = dense.ceil('euro', new Dense('EUR', unsafePositiveRational([124, 100])))
    assertEqualDiscrete(d1)(new Discrete({ dimension: 'EUR', unit: 'euro' }, M.integer.wrap(BigInteger(2))))
    assertEqualDense(rest1)(new Dense('EUR', unsafeRational([-76, 100])))
    assertProperty(
      property(getDenseGenerator('EUR'), (euro) => {
        const [cent, rest] = dense.ceil('cent', euro)
        return dense.getEq<'EUR'>().equals(fromDiscrete(cent).add(rest), euro)
      })
    )
  })

  it('trunc', () => {
    const [d1, rest1] = dense.trunc('euro', new Dense('EUR', unsafePositiveRational([124, 100])))
    assertEqualDiscrete(d1)(new Discrete({ dimension: 'EUR', unit: 'euro' }, M.integer.wrap(BigInteger(1))))
    assertEqualDense(rest1)(new Dense('EUR', unsafePositiveRational([24, 100])))

    const [d2, rest2] = dense.trunc('euro', new Dense('EUR', unsafeRational([-124, 100])))
    assertEqualDiscrete(d2)(new Discrete({ dimension: 'EUR', unit: 'euro' }, M.integer.wrap(BigInteger(-1))))
    assertEqualDense(rest2)(new Dense('EUR', unsafeRational([-24, 100])))

    assertProperty(
      property(getDenseGenerator('EUR'), (euro) => {
        const [cent, rest] = dense.trunc('cent', euro)
        return dense.getEq<'EUR'>().equals(fromDiscrete(cent).add(rest), euro)
      })
    )
  })
})
