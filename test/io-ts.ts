import * as assert from 'assert'
import { some, none, fromEither } from 'fp-ts/Option'
import * as I from '../src/Integer'
import * as DC from '../src/Discrete'
import * as D from '../src/Dense'
import * as BI from 'big-integer'
import { unsafeRational } from './helpers'
import * as N from '../src/Natural'
import * as NZI from '../src/NonZeroInteger'
import * as R from '../src/Rational'
import * as NZR from '../src/NonZeroRational'
import * as PR from '../src/PositiveRational'
import * as iots from '../src/io-ts'

describe('io-ts types', () => {
  describe('BigInteger', () => {
    it('decode', () => {
      assert.deepEqual(fromEither(iots.BigInteger.decode(null)), none)
      assert.deepEqual(fromEither(iots.BigInteger.decode(1)), some(BI(1)))
      assert.deepEqual(fromEither(iots.BigInteger.decode(0)), some(BI(0)))
      assert.deepEqual(fromEither(iots.BigInteger.decode(1.1)), none)
      assert.deepEqual(fromEither(iots.BigInteger.decode('1')), some(BI(1)))
      assert.deepEqual(fromEither(iots.BigInteger.decode('0')), some(BI(0)))
      assert.deepEqual(fromEither(iots.BigInteger.decode('1.1')), none)
    })

    it('is', () => {
      assert.strictEqual(iots.BigInteger.is(BI(1)), true)
      assert.strictEqual(iots.BigInteger.is(1), false)
    })

    it('encode', () => {
      assert.strictEqual(iots.BigInteger.encode(BI(1)), '1')
    })
  })

  describe('Natural', () => {
    it('decode', () => {
      assert.deepEqual(fromEither(iots.Natural.decode('1')), some(BI(1)))
      assert.deepEqual(fromEither(iots.Natural.decode('0')), none)
      assert.deepEqual(fromEither(iots.Natural.decode('1.1')), none)
    })

    it('is', () => {
      assert.strictEqual(iots.Natural.is(BI(1)), true)
      assert.strictEqual(iots.Natural.is(1), false)
      assert.strictEqual(iots.Natural.is(BI(0)), false)
      assert.strictEqual(iots.Natural.is(BI(-1)), false)
    })

    it('encode', () => {
      assert.strictEqual(iots.Natural.encode(N.one), '1')
    })
  })

  describe('Integer', () => {
    it('decode', () => {
      assert.deepEqual(fromEither(iots.Integer.decode('1')), some(BI(1)))
      assert.deepEqual(fromEither(iots.Integer.decode('0')), some(BI(0)))
      assert.deepEqual(fromEither(iots.Integer.decode('1.1')), none)
    })

    it('is', () => {
      assert.strictEqual(iots.Integer.is(BI(1)), true)
      assert.strictEqual(iots.Integer.is(1), false)
      assert.strictEqual(iots.Integer.is(BI(0)), true)
      assert.strictEqual(iots.Integer.is(BI(-1)), true)
    })

    it('encode', () => {
      assert.strictEqual(iots.Integer.encode(I.one), '1')
    })
  })

  describe('NonZeroInteger', () => {
    it('decode', () => {
      assert.deepEqual(fromEither(iots.NonZeroInteger.decode('1')), some(BI(1)))
      assert.deepEqual(fromEither(iots.NonZeroInteger.decode('0')), none)
      assert.deepEqual(fromEither(iots.NonZeroInteger.decode('1.1')), none)
    })

    it('is', () => {
      assert.strictEqual(iots.NonZeroInteger.is(BI(1)), true)
      assert.strictEqual(iots.NonZeroInteger.is(1), false)
      assert.strictEqual(iots.NonZeroInteger.is(BI(0)), false)
      assert.strictEqual(iots.NonZeroInteger.is(BI(-1)), true)
    })

    it('encode', () => {
      assert.strictEqual(iots.NonZeroInteger.encode(NZI.one), '1')
    })
  })

  describe('Rational', () => {
    it('decode', () => {
      assert.deepEqual(fromEither(iots.Rational.decode(null)), none)
      assert.deepEqual(fromEither(iots.Rational.decode([1, 0])), none)
      assert.deepEqual(fromEither(iots.Rational.decode([1, 1])), some([BI(1), BI(1)]))
      assert.deepEqual(fromEither(iots.Rational.decode([0, 1])), some([BI(0), BI(1)]))
      assert.deepEqual(fromEither(iots.Rational.decode([2, 2])), some([BI(1), BI(1)]))
      assert.deepEqual(fromEither(iots.Rational.decode([-1, 1])), some([BI(1).multiply(-1), BI(1)]))
      assert.deepEqual(fromEither(iots.Rational.decode([1, -1])), none)
      assert.deepEqual(fromEither(iots.Rational.decode([1.1, 1])), none)
    })

    it('is', () => {
      assert.strictEqual(iots.Rational.is([BI(1), BI(2)]), true)
      assert.strictEqual(iots.Rational.is([BI(0), BI(1)]), true)
      assert.strictEqual(iots.Rational.is([BI(-1), BI(2)]), true)
      assert.strictEqual(iots.Rational.is([BI(1), BI(-2)]), false)
      assert.strictEqual(iots.Rational.is([BI(2), BI(2)]), true)
    })

    it('encode', () => {
      assert.deepEqual(iots.Rational.encode(R.one), ['1', '1'])
    })
  })

  describe('NonZeroRational', () => {
    it('decode', () => {
      assert.deepEqual(fromEither(iots.NonZeroRational.decode(null)), none)
      assert.deepEqual(fromEither(iots.NonZeroRational.decode([1, 0])), none)
      assert.deepEqual(fromEither(iots.NonZeroRational.decode([1, 1])), some([BI(1), BI(1)]))
      assert.deepEqual(fromEither(iots.NonZeroRational.decode([0, 1])), none)
      assert.deepEqual(fromEither(iots.NonZeroRational.decode([2, 2])), some([BI(1), BI(1)]))
      assert.deepEqual(fromEither(iots.NonZeroRational.decode([-1, 1])), some([BI(1).multiply(-1), BI(1)]))
      assert.deepEqual(fromEither(iots.NonZeroRational.decode([1, -1])), none)
      assert.deepEqual(fromEither(iots.NonZeroRational.decode([1.1, 1])), none)
    })

    it('is', () => {
      assert.strictEqual(iots.NonZeroRational.is([BI(1), BI(2)]), true)
      assert.strictEqual(iots.NonZeroRational.is([BI(0), BI(1)]), false)
      assert.strictEqual(iots.NonZeroRational.is([BI(-1), BI(2)]), true)
      assert.strictEqual(iots.NonZeroRational.is([BI(1), BI(-2)]), false)
      assert.strictEqual(iots.NonZeroRational.is([BI(2), BI(2)]), true)
    })

    it('encode', () => {
      assert.deepEqual(iots.NonZeroRational.encode(NZR.one), ['1', '1'])
    })
  })

  describe('PositiveRational', () => {
    it('decode', () => {
      assert.deepEqual(fromEither(iots.PositiveRational.decode(null)), none)
      assert.deepEqual(fromEither(iots.PositiveRational.decode([1, 0])), none)
      assert.deepEqual(fromEither(iots.PositiveRational.decode([1, 1])), some([BI(1), BI(1)]))
      assert.deepEqual(fromEither(iots.PositiveRational.decode([0, 1])), none)
      assert.deepEqual(fromEither(iots.PositiveRational.decode([2, 2])), some([BI(1), BI(1)]))
      assert.deepEqual(fromEither(iots.PositiveRational.decode([-1, 1])), none)
      assert.deepEqual(fromEither(iots.PositiveRational.decode([1, -1])), none)
      assert.deepEqual(fromEither(iots.PositiveRational.decode([1.1, 1])), none)
    })

    it('is', () => {
      assert.strictEqual(iots.PositiveRational.is([BI(1), BI(2)]), true)
      assert.strictEqual(iots.PositiveRational.is([BI(0), BI(1)]), false)
      assert.strictEqual(iots.PositiveRational.is([BI(-1), BI(2)]), false)
      assert.strictEqual(iots.PositiveRational.is([BI(1), BI(-2)]), false)
      assert.strictEqual(iots.PositiveRational.is([BI(2), BI(2)]), true)
    })

    it('encode', () => {
      assert.deepEqual(iots.PositiveRational.encode(PR.one), ['1', '1'])
    })
  })

  describe('Discrete', () => {
    it('decode', () => {
      const format: DC.Format<'EUR', 'cent'> = { dimension: 'EUR', unit: 'cent' }
      const one = DC.getOne(format)
      const zero = DC.getZero(format)
      const T = iots.getDiscrete('EUR', 'cent')
      assert.deepEqual(fromEither(T.decode(1)), some(one))
      assert.deepEqual(fromEither(T.decode(0)), some(zero))
      assert.deepEqual(fromEither(T.decode(1.1)), none)
    })

    it('is', () => {
      const format = { dimension: 'EUR', unit: 'cent' }
      const T = iots.getDiscrete('EUR', 'cent')
      assert.strictEqual(T.is(new DC.Discrete(format, I.wrap(BI(1)))), true)
      assert.strictEqual(T.is(new DC.Discrete(format, I.wrap(BI(0)))), true)
      assert.strictEqual(T.is(new DC.Discrete(format, I.wrap(BI(-1)))), true)
      assert.strictEqual(T.is(new DC.Discrete({ dimension: 'EUR', unit: 'euro' }, I.wrap(BI(1)))), false)
      assert.strictEqual(T.is(new DC.Discrete({ dimension: 'USD', unit: 'cent' }, I.wrap(BI(1)))), false)
    })

    it('encode', () => {
      const format: DC.Format<'EUR', 'cent'> = { dimension: 'EUR', unit: 'cent' }
      const T = iots.getDiscrete('EUR', 'cent')
      const d = new DC.Discrete(format, I.wrap(BI(100)))
      assert.strictEqual(T.encode(d), '100')
    })
  })

  describe('Dense', () => {
    it('decode', () => {
      const one = D.getOne('EUR')
      const zero = D.getZero('EUR')
      const T = iots.getDense('EUR')
      assert.deepEqual(fromEither(T.decode(1)), none)
      assert.deepEqual(fromEither(T.decode([1, 0])), none)
      assert.deepEqual(fromEither(T.decode([1, 1])), some(one))
      assert.deepEqual(fromEither(T.decode([0, 1])), some(zero))
      assert.deepEqual(fromEither(T.decode([1.1, 1])), none)
    })

    it('is', () => {
      const T = iots.getDense('EUR')
      assert.strictEqual(T.is(new D.Dense('EUR', unsafeRational([0, 1]))), true)
      assert.strictEqual(T.is(new D.Dense('EUR', unsafeRational([2, 1]))), true)
      assert.strictEqual(T.is(new D.Dense('EUR', unsafeRational([-2, 1]))), true)
      assert.strictEqual(T.is(new D.Dense('USD', unsafeRational([2, 1]))), false)
    })

    it('encode', () => {
      const T = iots.getDense('EUR')
      const d = new D.Dense('EUR', unsafeRational([2, 1]))
      assert.deepEqual(T.encode(d), ['2', '1'])
    })
  })
})
