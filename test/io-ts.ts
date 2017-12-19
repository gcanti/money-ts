import * as assert from 'assert'
import * as t from 'io-ts'
import { some, none } from 'fp-ts/lib/Option'
import { Integer } from '../src/io-ts/Integer'
import { NonZeroInteger } from '../src/io-ts/NonZeroInteger'
import { Rational } from '../src/io-ts/Rational'
import { NonZeroRational } from '../src/io-ts/NonZeroRational'
import { ExchangeRate } from '../src/io-ts/ExchangeRate'
import { Discrete } from '../src/io-ts/Discrete'
import { Dense } from '../src/io-ts/Dense'

describe('io-ts types', () => {
  describe('Integer', () => {
    it('validate', () => {
      assert.deepEqual(t.validate(1, Integer).toOption(), some(1))
      assert.deepEqual(t.validate(0, Integer).toOption(), some(0))
      assert.deepEqual(t.validate(1.1, Integer).toOption(), none)
    })
  })

  describe('NonZeroInteger', () => {
    it('validate', () => {
      assert.deepEqual(t.validate(1, NonZeroInteger).toOption(), some(1))
      assert.deepEqual(t.validate(0, NonZeroInteger).toOption(), none)
      assert.deepEqual(t.validate(1.1, NonZeroInteger).toOption(), none)
    })
  })

  describe('Rational', () => {
    it('validate', () => {
      assert.deepEqual(t.validate(1, Rational).toOption(), none)
      assert.deepEqual(t.validate([1, 0], Rational).toOption(), none)
      assert.deepEqual(t.validate([1, 1], Rational).toOption(), some([1, 1]))
      assert.deepEqual(t.validate([0, 1], Rational).toOption(), some([0, 1]))
      assert.deepEqual(t.validate([1.1, 1], Rational).toOption(), none)
    })
  })

  describe('NonZeroRational', () => {
    it('validate', () => {
      assert.deepEqual(t.validate(1, NonZeroRational).toOption(), none)
      assert.deepEqual(t.validate([1, 0], NonZeroRational).toOption(), none)
      assert.deepEqual(t.validate([1, 1], NonZeroRational).toOption(), some([1, 1]))
      assert.deepEqual(t.validate([0, 1], NonZeroRational).toOption(), none)
      assert.deepEqual(t.validate([1.1, 1], NonZeroRational).toOption(), none)
    })
  })

  describe('ExchangeRate', () => {
    it('validate', () => {
      assert.deepEqual(t.validate(1, ExchangeRate()).toOption(), none)
      assert.deepEqual(t.validate([1, 0], ExchangeRate()).toOption(), none)
      assert.deepEqual(t.validate([1, 1], ExchangeRate()).toOption(), some([1, 1]))
      assert.deepEqual(t.validate([0, 1], ExchangeRate()).toOption(), none)
      assert.deepEqual(t.validate([1.1, 1], ExchangeRate()).toOption(), none)
    })
  })

  describe('Discrete', () => {
    it('validate', () => {
      assert.deepEqual(t.validate(1, Discrete()).toOption(), some(1))
      assert.deepEqual(t.validate(0, Discrete()).toOption(), some(0))
      assert.deepEqual(t.validate(1.1, Discrete()).toOption(), none)
    })
  })

  describe('Dense', () => {
    it('validate', () => {
      assert.deepEqual(t.validate(1, Dense()).toOption(), none)
      assert.deepEqual(t.validate([1, 0], Dense()).toOption(), none)
      assert.deepEqual(t.validate([1, 1], Dense()).toOption(), some([1, 1]))
      assert.deepEqual(t.validate([0, 1], Dense()).toOption(), some([0, 1]))
      assert.deepEqual(t.validate([1.1, 1], Dense()).toOption(), none)
    })
  })
})
