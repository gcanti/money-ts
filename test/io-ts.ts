import * as assert from 'assert'
import * as t from 'io-ts'
import { some, none } from 'fp-ts/lib/Option'
import { BigInteger } from '../src/io-ts/BigInteger'
import { Integer } from '../src/io-ts/Integer'
import { NonZeroInteger } from '../src/io-ts/NonZeroInteger'
import { Rational } from '../src/io-ts/Rational'
import { NonZeroRational } from '../src/io-ts/NonZeroRational'
import { ExchangeRate } from '../src/io-ts/ExchangeRate'
import { Discrete } from '../src/io-ts/Discrete'
import { Dense } from '../src/io-ts/Dense'
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
      assert.deepEqual(t.validate(1, Discrete()).toOption(), some(bigInteger.one))
      assert.deepEqual(t.validate(0, Discrete()).toOption(), some(bigInteger.zero))
      assert.deepEqual(t.validate(1.1, Discrete()).toOption(), none)
    })
  })

  describe('Dense', () => {
    it('validate', () => {
      assert.deepEqual(t.validate(1, Dense()).toOption(), none)
      assert.deepEqual(t.validate([1, 0], Dense()).toOption(), none)
      assert.deepEqual(t.validate([1, 1], Dense()).toOption(), some([bigInteger.one, bigInteger.one]))
      assert.deepEqual(t.validate([0, 1], Dense()).toOption(), some([bigInteger.zero, bigInteger.one]))
      assert.deepEqual(t.validate([1.1, 1], Dense()).toOption(), none)
    })
  })
})
