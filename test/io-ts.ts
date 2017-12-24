import * as assert from 'assert'
import * as t from 'io-ts'
import { some, none } from 'fp-ts/lib/Option'
import { BigInteger } from '../src/io-ts/BigInteger'
import { Integer } from '../src/io-ts/Integer'
import { NonZeroInteger } from '../src/io-ts/NonZeroInteger'
import { Rational } from '../src/io-ts/Rational'
import { NonZeroRational } from '../src/io-ts/NonZeroRational'
import { ExchangeRate } from '../src/io-ts/ExchangeRate'
import { getDiscrete } from '../src/io-ts/Discrete'
import * as discrete from '../src/Discrete'
import * as dense from '../src/Dense'
import { getDense } from '../src/io-ts/Dense'
import * as bigInteger from '../src/BigInteger'

describe('io-ts types', () => {
  describe('BigInteger', () => {
    it('validate', () => {
      assert.deepEqual(t.validate(null, BigInteger).toOption(), none)
      assert.deepEqual(t.validate(1, BigInteger).toOption(), some(bigInteger.one))
      assert.deepEqual(t.validate(0, BigInteger).toOption(), some(bigInteger.zero))
      assert.deepEqual(t.validate(1.1, BigInteger).toOption(), none)
      assert.deepEqual(t.validate('1', BigInteger).toOption(), some(bigInteger.one))
      assert.deepEqual(t.validate('0', BigInteger).toOption(), some(bigInteger.zero))
      assert.deepEqual(t.validate('1.1', BigInteger).toOption(), none)
    })
  })

  describe('Integer', () => {
    it('validate', () => {
      assert.deepEqual(t.validate('1', Integer).toOption(), some(bigInteger.one))
      assert.deepEqual(t.validate('0', Integer).toOption(), some(bigInteger.zero))
      assert.deepEqual(t.validate('1.1', Integer).toOption(), none)
    })
  })

  describe('NonZeroInteger', () => {
    it('validate', () => {
      assert.deepEqual(t.validate('1', NonZeroInteger).toOption(), some(bigInteger.one))
      assert.deepEqual(t.validate('0', NonZeroInteger).toOption(), none)
      assert.deepEqual(t.validate('1.1', NonZeroInteger).toOption(), none)
    })
  })

  describe('Rational', () => {
    it('validate', () => {
      assert.deepEqual(t.validate(null, Rational).toOption(), none)
      assert.deepEqual(t.validate([1, 0], Rational).toOption(), none)
      assert.deepEqual(t.validate([1, 1], Rational).toOption(), some([bigInteger.one, bigInteger.one]))
      assert.deepEqual(t.validate([0, 1], Rational).toOption(), some([bigInteger.zero, bigInteger.one]))
      assert.deepEqual(t.validate([2, 2], Rational).toOption(), some([bigInteger.one, bigInteger.one]))
      assert.deepEqual(t.validate([-1, 1], Rational).toOption(), some([bigInteger.one.multiply(-1), bigInteger.one]))
      assert.deepEqual(t.validate([1, -1], Rational).toOption(), some([bigInteger.one.multiply(-1), bigInteger.one]))
      assert.deepEqual(t.validate([1.1, 1], Rational).toOption(), none)
    })
  })

  describe('NonZeroRational', () => {
    it('validate', () => {
      assert.deepEqual(t.validate(null, NonZeroRational).toOption(), none)
      assert.deepEqual(t.validate([1, 0], NonZeroRational).toOption(), none)
      assert.deepEqual(t.validate([1, 1], NonZeroRational).toOption(), some([bigInteger.one, bigInteger.one]))
      assert.deepEqual(t.validate([0, 1], NonZeroRational).toOption(), none)
      assert.deepEqual(t.validate([2, 2], NonZeroRational).toOption(), some([bigInteger.one, bigInteger.one]))
      assert.deepEqual(
        t.validate([-1, 1], NonZeroRational).toOption(),
        some([bigInteger.one.multiply(-1), bigInteger.one])
      )
      assert.deepEqual(
        t.validate([1, -1], NonZeroRational).toOption(),
        some([bigInteger.one.multiply(-1), bigInteger.one])
      )
      assert.deepEqual(t.validate([1.1, 1], NonZeroRational).toOption(), none)
    })
  })

  describe('ExchangeRate', () => {
    it('validate', () => {
      assert.deepEqual(t.validate(1, ExchangeRate()).toOption(), none)
      assert.deepEqual(t.validate([1, 0], ExchangeRate()).toOption(), none)
      assert.deepEqual(t.validate([1, 1], ExchangeRate()).toOption(), some([bigInteger.one, bigInteger.one]))
      assert.deepEqual(t.validate([0, 1], ExchangeRate()).toOption(), none)
      assert.deepEqual(t.validate([1.1, 1], ExchangeRate()).toOption(), none)
    })
  })

  describe('Discrete', () => {
    it('validate', () => {
      const format = { dimension: 'EUR', unit: 'cent' }
      const one = discrete.getOne(format)
      const zero = discrete.getZero(format)
      assert.deepEqual(t.validate(1, getDiscrete('EUR', 'cent')).toOption(), some(one))
      assert.deepEqual(t.validate(0, getDiscrete('EUR', 'cent')).toOption(), some(zero))
      assert.deepEqual(t.validate(1.1, getDiscrete('EUR', 'cent')).toOption(), none)
    })
  })

  describe('Dense', () => {
    it('validate', () => {
      const one = dense.getOne('EUR')
      const zero = dense.getZero('EUR')
      assert.deepEqual(t.validate(1, getDense('EUR')).toOption(), none)
      assert.deepEqual(t.validate([1, 0], getDense('EUR')).toOption(), none)
      assert.deepEqual(t.validate([1, 1], getDense('EUR')).toOption(), some(one))
      assert.deepEqual(t.validate([0, 1], getDense('EUR')).toOption(), some(zero))
      assert.deepEqual(t.validate([1.1, 1], getDense('EUR')).toOption(), none)
    })
  })
})
