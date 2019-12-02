import * as assert from 'assert'
import * as BI from 'big-integer'
import { fromEither, none, some } from 'fp-ts/lib/Option'
import * as D from '../src/Dense'
import * as DI from '../src/Discrete'
import * as I from '../src/Integer'
import { BigInteger } from '../src/io-ts/BigInteger'
import { getDense } from '../src/io-ts/Dense'
import { getDiscrete } from '../src/io-ts/Discrete'
import { Integer } from '../src/io-ts/Integer'
import { Natural } from '../src/io-ts/Natural'
import { NonZeroInteger } from '../src/io-ts/NonZeroInteger'
import { NonZeroRational } from '../src/io-ts/NonZeroRational'
import { PositiveRational } from '../src/io-ts/PositiveRational'
import { ExchangeRate } from '../src/io-ts/ExchangeRate'
import { Rational } from '../src/io-ts/Rational'
import * as N from '../src/Natural'
import * as NZI from '../src/NonZeroInteger'
import * as NZR from '../src/NonZeroRational'
import * as PR from '../src/PositiveRational'
import * as R from '../src/Rational'
import { unsafeRational } from './helpers'

describe('io-ts types', () => {
  describe('BigInteger', () => {
    it('decode', () => {
      assert.deepEqual(fromEither(BigInteger.decode(null)), none)
      assert.deepEqual(fromEither(BigInteger.decode(1)), some(BI(1)))
      assert.deepEqual(fromEither(BigInteger.decode(0)), some(BI(0)))
      assert.deepEqual(fromEither(BigInteger.decode(1.1)), none)
      assert.deepEqual(fromEither(BigInteger.decode('1')), some(BI(1)))
      assert.deepEqual(fromEither(BigInteger.decode('0')), some(BI(0)))
      assert.deepEqual(fromEither(BigInteger.decode('1.1')), none)
    })

    it('is', () => {
      assert.strictEqual(BigInteger.is(BI(1)), true)
      assert.strictEqual(BigInteger.is(1), false)
    })

    it('encode', () => {
      assert.strictEqual(BigInteger.encode(BI(1)), '1')
    })
  })

  describe('Natural', () => {
    it('decode', () => {
      assert.deepEqual(fromEither(Natural.decode('1')), some(BI(1)))
      assert.deepEqual(fromEither(Natural.decode('0')), none)
      assert.deepEqual(fromEither(Natural.decode('1.1')), none)
    })

    it('is', () => {
      assert.strictEqual(Natural.is(BI(1)), true)
      assert.strictEqual(Natural.is(1), false)
      assert.strictEqual(Natural.is(BI(0)), false)
      assert.strictEqual(Natural.is(BI(-1)), false)
    })

    it('encode', () => {
      assert.strictEqual(Natural.encode(N.one), '1')
    })
  })

  describe('Integer', () => {
    it('decode', () => {
      assert.deepEqual(fromEither(Integer.decode('1')), some(BI(1)))
      assert.deepEqual(fromEither(Integer.decode('0')), some(BI(0)))
      assert.deepEqual(fromEither(Integer.decode('1.1')), none)
    })

    it('is', () => {
      assert.strictEqual(Integer.is(BI(1)), true)
      assert.strictEqual(Integer.is(1), false)
      assert.strictEqual(Integer.is(BI(0)), true)
      assert.strictEqual(Integer.is(BI(-1)), true)
    })

    it('encode', () => {
      assert.strictEqual(Integer.encode(I.one), '1')
    })
  })

  describe('NonZeroInteger', () => {
    it('decode', () => {
      assert.deepEqual(fromEither(NonZeroInteger.decode('1')), some(BI(1)))
      assert.deepEqual(fromEither(NonZeroInteger.decode('0')), none)
      assert.deepEqual(fromEither(NonZeroInteger.decode('1.1')), none)
    })

    it('is', () => {
      assert.strictEqual(NonZeroInteger.is(BI(1)), true)
      assert.strictEqual(NonZeroInteger.is(1), false)
      assert.strictEqual(NonZeroInteger.is(BI(0)), false)
      assert.strictEqual(NonZeroInteger.is(BI(-1)), true)
    })

    it('encode', () => {
      assert.strictEqual(NonZeroInteger.encode(NZI.one), '1')
    })
  })

  describe('Rational', () => {
    it('decode', () => {
      assert.deepEqual(fromEither(Rational.decode(null)), none)
      assert.deepEqual(fromEither(Rational.decode([1, 0])), none)
      assert.deepEqual(fromEither(Rational.decode([1, 1])), some([BI(1), BI(1)]))
      assert.deepEqual(fromEither(Rational.decode([0, 1])), some([BI(0), BI(1)]))
      assert.deepEqual(fromEither(Rational.decode([2, 2])), some([BI(1), BI(1)]))
      assert.deepEqual(fromEither(Rational.decode([-1, 1])), some([BI(1).multiply(-1), BI(1)]))
      assert.deepEqual(fromEither(Rational.decode([1, -1])), none)
      assert.deepEqual(fromEither(Rational.decode([1.1, 1])), none)
    })

    it('is', () => {
      assert.strictEqual(Rational.is([BI(1), BI(2)]), true)
      assert.strictEqual(Rational.is([BI(0), BI(1)]), true)
      assert.strictEqual(Rational.is([BI(-1), BI(2)]), true)
      assert.strictEqual(Rational.is([BI(1), BI(-2)]), false)
      assert.strictEqual(Rational.is([BI(2), BI(2)]), true)
    })

    it('encode', () => {
      assert.deepEqual(Rational.encode(R.one), ['1', '1'])
    })
  })

  describe('NonZeroRational', () => {
    it('decode', () => {
      assert.deepEqual(fromEither(NonZeroRational.decode(null)), none)
      assert.deepEqual(fromEither(NonZeroRational.decode([1, 0])), none)
      assert.deepEqual(fromEither(NonZeroRational.decode([1, 1])), some([BI(1), BI(1)]))
      assert.deepEqual(fromEither(NonZeroRational.decode([0, 1])), none)
      assert.deepEqual(fromEither(NonZeroRational.decode([2, 2])), some([BI(1), BI(1)]))
      assert.deepEqual(fromEither(NonZeroRational.decode([-1, 1])), some([BI(1).multiply(-1), BI(1)]))
      assert.deepEqual(fromEither(NonZeroRational.decode([1, -1])), none)
      assert.deepEqual(fromEither(NonZeroRational.decode([1.1, 1])), none)
    })

    it('is', () => {
      assert.strictEqual(NonZeroRational.is([BI(1), BI(2)]), true)
      assert.strictEqual(NonZeroRational.is([BI(0), BI(1)]), false)
      assert.strictEqual(NonZeroRational.is([BI(-1), BI(2)]), true)
      assert.strictEqual(NonZeroRational.is([BI(1), BI(-2)]), false)
      assert.strictEqual(NonZeroRational.is([BI(2), BI(2)]), true)
    })

    it('encode', () => {
      assert.deepEqual(NonZeroRational.encode(NZR.one), ['1', '1'])
    })
  })

  describe('PositiveRational', () => {
    it('decode', () => {
      assert.deepEqual(fromEither(PositiveRational.decode(null)), none)
      assert.deepEqual(fromEither(PositiveRational.decode([1, 0])), none)
      assert.deepEqual(fromEither(PositiveRational.decode([1, 1])), some([BI(1), BI(1)]))
      assert.deepEqual(fromEither(PositiveRational.decode([0, 1])), none)
      assert.deepEqual(fromEither(PositiveRational.decode([2, 2])), some([BI(1), BI(1)]))
      assert.deepEqual(fromEither(PositiveRational.decode([-1, 1])), none)
      assert.deepEqual(fromEither(PositiveRational.decode([1, -1])), none)
      assert.deepEqual(fromEither(PositiveRational.decode([1.1, 1])), none)
    })

    it('is', () => {
      assert.strictEqual(PositiveRational.is([BI(1), BI(2)]), true)
      assert.strictEqual(PositiveRational.is([BI(0), BI(1)]), false)
      assert.strictEqual(PositiveRational.is([BI(-1), BI(2)]), false)
      assert.strictEqual(PositiveRational.is([BI(1), BI(-2)]), false)
      assert.strictEqual(PositiveRational.is([BI(2), BI(2)]), true)
    })

    it('encode', () => {
      assert.deepEqual(PositiveRational.encode(PR.one), ['1', '1'])
    })
  })

  describe('ExchangeRate', () => {
    it('decode', () => {
      assert.deepEqual(fromEither(ExchangeRate().decode(null)), none)
      assert.deepEqual(fromEither(ExchangeRate().decode([1, 0])), none)
      assert.deepEqual(fromEither(ExchangeRate().decode([1, 1])), some([BI(1), BI(1)]))
      assert.deepEqual(fromEither(ExchangeRate().decode([0, 1])), none)
      assert.deepEqual(fromEither(ExchangeRate().decode([2, 2])), some([BI(1), BI(1)]))
      assert.deepEqual(fromEither(ExchangeRate().decode([-1, 1])), none)
      assert.deepEqual(fromEither(ExchangeRate().decode([1, -1])), none)
      assert.deepEqual(fromEither(ExchangeRate().decode([1.1, 1])), none)
    })

    it('is', () => {
      assert.strictEqual(ExchangeRate().is([BI(1), BI(2)]), true)
      assert.strictEqual(ExchangeRate().is([BI(0), BI(1)]), false)
      assert.strictEqual(ExchangeRate().is([BI(-1), BI(2)]), false)
      assert.strictEqual(ExchangeRate().is([BI(1), BI(-2)]), false)
      assert.strictEqual(ExchangeRate().is([BI(2), BI(2)]), true)
    })

    it('encode', () => {
      assert.deepEqual(ExchangeRate().encode(PR.one as any), ['1', '1'])
    })
  })

  describe('Discrete', () => {
    it('decode', () => {
      const format: DI.Format<'EUR', 'cent'> = { dimension: 'EUR', unit: 'cent' }
      const one = DI.getOne(format)
      const zero = DI.getZero(format)
      const T = getDiscrete('EUR', 'cent')
      assert.deepEqual(fromEither(T.decode(1)), some(one))
      assert.deepEqual(fromEither(T.decode(0)), some(zero))
      assert.deepEqual(fromEither(T.decode(1.1)), none)
    })

    it('is', () => {
      const format = { dimension: 'EUR', unit: 'cent' }
      const T = getDiscrete('EUR', 'cent')
      assert.strictEqual(T.is(new DI.Discrete(format, I.wrap(BI(1)))), true)
      assert.strictEqual(T.is(new DI.Discrete(format, I.wrap(BI(0)))), true)
      assert.strictEqual(T.is(new DI.Discrete(format, I.wrap(BI(-1)))), true)
      assert.strictEqual(T.is(new DI.Discrete({ dimension: 'EUR', unit: 'euro' }, I.wrap(BI(1)))), false)
      assert.strictEqual(T.is(new DI.Discrete({ dimension: 'USD', unit: 'cent' }, I.wrap(BI(1)))), false)
    })

    it('encode', () => {
      const format: DI.Format<'EUR', 'cent'> = { dimension: 'EUR', unit: 'cent' }
      const T = getDiscrete('EUR', 'cent')
      const d = new DI.Discrete(format, I.wrap(BI(100)))
      assert.strictEqual(T.encode(d), '100')
    })
  })

  describe('Dense', () => {
    it('decode', () => {
      const one = D.getOne('EUR')
      const zero = D.getZero('EUR')
      const T = getDense('EUR')
      assert.deepEqual(fromEither(T.decode(1)), none)
      assert.deepEqual(fromEither(T.decode([1, 0])), none)
      assert.deepEqual(fromEither(T.decode([1, 1])), some(one))
      assert.deepEqual(fromEither(T.decode([0, 1])), some(zero))
      assert.deepEqual(fromEither(T.decode([1.1, 1])), none)
    })

    it('is', () => {
      const T = getDense('EUR')
      assert.strictEqual(T.is(new D.Dense('EUR', unsafeRational([0, 1]))), true)
      assert.strictEqual(T.is(new D.Dense('EUR', unsafeRational([2, 1]))), true)
      assert.strictEqual(T.is(new D.Dense('EUR', unsafeRational([-2, 1]))), true)
      assert.strictEqual(T.is(new D.Dense('USD', unsafeRational([2, 1]))), false)
    })

    it('encode', () => {
      const T = getDense('EUR')
      const d = new D.Dense('EUR', unsafeRational([2, 1]))
      assert.deepEqual(T.encode(d), ['2', '1'])
    })
  })
})
