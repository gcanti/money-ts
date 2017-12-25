import * as assert from 'assert'
import * as t from 'io-ts'
import { some, none } from 'fp-ts/lib/Option'
import { BigInteger } from '../src/io-ts/BigInteger'
import { Natural } from '../src/io-ts/Natural'
import { Integer } from '../src/io-ts/Integer'
import { NonZeroInteger } from '../src/io-ts/NonZeroInteger'
import { Rational } from '../src/io-ts/Rational'
import { NonZeroRational } from '../src/io-ts/NonZeroRational'
import { PositiveRational } from '../src/io-ts/PositiveRational'
import { getDiscrete } from '../src/io-ts/Discrete'
import * as integer from '../src/Integer'
import * as discrete from '../src/Discrete'
import * as dense from '../src/Dense'
import { getDense } from '../src/io-ts/Dense'
import * as BI from 'big-integer'
import { Discrete } from '../src/Discrete'
import { Dense } from '../src/Dense'
import { unsafeRational } from './util'

describe('io-ts types', () => {
  describe('BigInteger', () => {
    it('validate', () => {
      assert.deepEqual(t.validate(null, BigInteger).toOption(), none)
      assert.deepEqual(t.validate(1, BigInteger).toOption(), some(BI(1)))
      assert.deepEqual(t.validate(0, BigInteger).toOption(), some(BI(0)))
      assert.deepEqual(t.validate(1.1, BigInteger).toOption(), none)
      assert.deepEqual(t.validate('1', BigInteger).toOption(), some(BI(1)))
      assert.deepEqual(t.validate('0', BigInteger).toOption(), some(BI(0)))
      assert.deepEqual(t.validate('1.1', BigInteger).toOption(), none)
    })

    it('is', () => {
      assert.strictEqual(BigInteger.is(BI(1)), true)
      assert.strictEqual(BigInteger.is(1), false)
    })
  })

  describe('Natural', () => {
    it('validate', () => {
      assert.deepEqual(t.validate('1', Natural).toOption(), some(BI(1)))
      assert.deepEqual(t.validate('0', Natural).toOption(), none)
      assert.deepEqual(t.validate('1.1', Natural).toOption(), none)
    })

    it('is', () => {
      assert.strictEqual(Natural.is(BI(1)), true)
      assert.strictEqual(Natural.is(1), false)
      assert.strictEqual(Natural.is(BI(0)), false)
      assert.strictEqual(Natural.is(BI(-1)), false)
    })
  })

  describe('Integer', () => {
    it('validate', () => {
      assert.deepEqual(t.validate('1', Integer).toOption(), some(BI(1)))
      assert.deepEqual(t.validate('0', Integer).toOption(), some(BI(0)))
      assert.deepEqual(t.validate('1.1', Integer).toOption(), none)
    })

    it('is', () => {
      assert.strictEqual(Integer.is(BI(1)), true)
      assert.strictEqual(Integer.is(1), false)
      assert.strictEqual(Integer.is(BI(0)), true)
      assert.strictEqual(Integer.is(BI(-1)), true)
    })
  })

  describe('NonZeroInteger', () => {
    it('validate', () => {
      assert.deepEqual(t.validate('1', NonZeroInteger).toOption(), some(BI(1)))
      assert.deepEqual(t.validate('0', NonZeroInteger).toOption(), none)
      assert.deepEqual(t.validate('1.1', NonZeroInteger).toOption(), none)
    })

    it('is', () => {
      assert.strictEqual(NonZeroInteger.is(BI(1)), true)
      assert.strictEqual(NonZeroInteger.is(1), false)
      assert.strictEqual(NonZeroInteger.is(BI(0)), false)
      assert.strictEqual(NonZeroInteger.is(BI(-1)), true)
    })
  })

  describe('Rational', () => {
    it('validate', () => {
      assert.deepEqual(t.validate(null, Rational).toOption(), none)
      assert.deepEqual(t.validate([1, 0], Rational).toOption(), none)
      assert.deepEqual(t.validate([1, 1], Rational).toOption(), some([BI(1), BI(1)]))
      assert.deepEqual(t.validate([0, 1], Rational).toOption(), some([BI(0), BI(1)]))
      assert.deepEqual(t.validate([2, 2], Rational).toOption(), some([BI(1), BI(1)]))
      assert.deepEqual(t.validate([-1, 1], Rational).toOption(), some([BI(1).multiply(-1), BI(1)]))
      assert.deepEqual(t.validate([1, -1], Rational).toOption(), none)
      assert.deepEqual(t.validate([1.1, 1], Rational).toOption(), none)
    })

    it('is', () => {
      assert.strictEqual(Rational.is([BI(1), BI(2)]), true)
      assert.strictEqual(Rational.is([BI(0), BI(1)]), true)
      assert.strictEqual(Rational.is([BI(-1), BI(2)]), true)
      assert.strictEqual(Rational.is([BI(1), BI(-2)]), false)
      assert.strictEqual(Rational.is([BI(2), BI(2)]), true)
    })
  })

  describe('NonZeroRational', () => {
    it('validate', () => {
      assert.deepEqual(t.validate(null, NonZeroRational).toOption(), none)
      assert.deepEqual(t.validate([1, 0], NonZeroRational).toOption(), none)
      assert.deepEqual(t.validate([1, 1], NonZeroRational).toOption(), some([BI(1), BI(1)]))
      assert.deepEqual(t.validate([0, 1], NonZeroRational).toOption(), none)
      assert.deepEqual(t.validate([2, 2], NonZeroRational).toOption(), some([BI(1), BI(1)]))
      assert.deepEqual(t.validate([-1, 1], NonZeroRational).toOption(), some([BI(1).multiply(-1), BI(1)]))
      assert.deepEqual(t.validate([1, -1], NonZeroRational).toOption(), none)
      assert.deepEqual(t.validate([1.1, 1], NonZeroRational).toOption(), none)
    })

    it('is', () => {
      assert.strictEqual(NonZeroRational.is([BI(1), BI(2)]), true)
      assert.strictEqual(NonZeroRational.is([BI(0), BI(1)]), false)
      assert.strictEqual(NonZeroRational.is([BI(-1), BI(2)]), true)
      assert.strictEqual(NonZeroRational.is([BI(1), BI(-2)]), false)
      assert.strictEqual(NonZeroRational.is([BI(2), BI(2)]), true)
    })
  })

  describe('PositiveRational', () => {
    it('validate', () => {
      assert.deepEqual(t.validate(null, PositiveRational).toOption(), none)
      assert.deepEqual(t.validate([1, 0], PositiveRational).toOption(), none)
      assert.deepEqual(t.validate([1, 1], PositiveRational).toOption(), some([BI(1), BI(1)]))
      assert.deepEqual(t.validate([0, 1], PositiveRational).toOption(), none)
      assert.deepEqual(t.validate([2, 2], PositiveRational).toOption(), some([BI(1), BI(1)]))
      assert.deepEqual(t.validate([-1, 1], PositiveRational).toOption(), none)
      assert.deepEqual(t.validate([1, -1], PositiveRational).toOption(), none)
      assert.deepEqual(t.validate([1.1, 1], PositiveRational).toOption(), none)
    })

    it('is', () => {
      assert.strictEqual(PositiveRational.is([BI(1), BI(2)]), true)
      assert.strictEqual(PositiveRational.is([BI(0), BI(1)]), false)
      assert.strictEqual(PositiveRational.is([BI(-1), BI(2)]), false)
      assert.strictEqual(PositiveRational.is([BI(1), BI(-2)]), false)
      assert.strictEqual(PositiveRational.is([BI(2), BI(2)]), true)
    })
  })

  describe('Discrete', () => {
    it('validate', () => {
      const format = { dimension: 'EUR', unit: 'cent' }
      const one = discrete.getOne(format)
      const zero = discrete.getZero(format)
      const T = getDiscrete('EUR', 'cent')
      assert.deepEqual(t.validate(1, T).toOption(), some(one))
      assert.deepEqual(t.validate(0, T).toOption(), some(zero))
      assert.deepEqual(t.validate(1.1, T).toOption(), none)
    })

    it('is', () => {
      const format = { dimension: 'EUR', unit: 'cent' }
      const T = getDiscrete('EUR', 'cent')
      assert.strictEqual(T.is(new Discrete(format, integer.wrap(BI(1)))), true)
      assert.strictEqual(T.is(new Discrete(format, integer.wrap(BI(0)))), true)
      assert.strictEqual(T.is(new Discrete(format, integer.wrap(BI(-1)))), true)
      assert.strictEqual(T.is(new Discrete({ dimension: 'EUR', unit: 'euro' }, integer.wrap(BI(1)))), false)
      assert.strictEqual(T.is(new Discrete({ dimension: 'USD', unit: 'cent' }, integer.wrap(BI(1)))), false)
    })
  })

  describe('Dense', () => {
    it('validate', () => {
      const one = dense.getOne('EUR')
      const zero = dense.getZero('EUR')
      const T = getDense('EUR')
      assert.deepEqual(t.validate(1, T).toOption(), none)
      assert.deepEqual(t.validate([1, 0], T).toOption(), none)
      assert.deepEqual(t.validate([1, 1], T).toOption(), some(one))
      assert.deepEqual(t.validate([0, 1], T).toOption(), some(zero))
      assert.deepEqual(t.validate([1.1, 1], T).toOption(), none)
    })

    it('is', () => {
      const T = getDense('EUR')
      assert.strictEqual(T.is(new Dense('EUR', unsafeRational([0, 1]))), true)
      assert.strictEqual(T.is(new Dense('EUR', unsafeRational([2, 1]))), true)
      assert.strictEqual(T.is(new Dense('EUR', unsafeRational([-2, 1]))), true)
      assert.strictEqual(T.is(new Dense('USD', unsafeRational([2, 1]))), false)
    })
  })
})
