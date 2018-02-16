import * as assert from 'assert'
import { some, none, fromEither } from 'fp-ts/lib/Option'
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
import { Discrete, Format } from '../src/Discrete'
import { Dense } from '../src/Dense'
import { unsafeRational } from './util'
import * as natural from '../src/Natural'
import * as nonZeroInteger from '../src/NonZeroInteger'
import * as rational from '../src/Rational'
import * as nonZeroRational from '../src/NonZeroRational'
import * as positiveRational from '../src/PositiveRational'

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
      assert.strictEqual(Natural.encode(natural.one), '1')
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
      assert.strictEqual(Integer.encode(integer.one), '1')
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
      assert.strictEqual(NonZeroInteger.encode(nonZeroInteger.one), '1')
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
      assert.deepEqual(Rational.encode(rational.one), ['1', '1'])
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
      assert.deepEqual(NonZeroRational.encode(nonZeroRational.one), ['1', '1'])
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
      assert.deepEqual(PositiveRational.encode(positiveRational.one), ['1', '1'])
    })
  })

  describe('Discrete', () => {
    it('decode', () => {
      const format: Format<'EUR', 'cent'> = { dimension: 'EUR', unit: 'cent' }
      const one = discrete.getOne(format)
      const zero = discrete.getZero(format)
      const T = getDiscrete('EUR', 'cent')
      assert.deepEqual(fromEither(T.decode(1)), some(one))
      assert.deepEqual(fromEither(T.decode(0)), some(zero))
      assert.deepEqual(fromEither(T.decode(1.1)), none)
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

    it('encode', () => {
      const format: Format<'EUR', 'cent'> = { dimension: 'EUR', unit: 'cent' }
      const T = getDiscrete('EUR', 'cent')
      const d = new Discrete(format, integer.wrap(BI(100)))
      assert.strictEqual(T.encode(d), '100')
    })
  })

  describe('Dense', () => {
    it('decode', () => {
      const one = dense.getOne('EUR')
      const zero = dense.getZero('EUR')
      const T = getDense('EUR')
      assert.deepEqual(fromEither(T.decode(1)), none)
      assert.deepEqual(fromEither(T.decode([1, 0])), none)
      assert.deepEqual(fromEither(T.decode([1, 1])), some(one))
      assert.deepEqual(fromEither(T.decode([0, 1])), some(zero))
      assert.deepEqual(fromEither(T.decode([1.1, 1])), none)
    })

    it('is', () => {
      const T = getDense('EUR')
      assert.strictEqual(T.is(new Dense('EUR', unsafeRational([0, 1]))), true)
      assert.strictEqual(T.is(new Dense('EUR', unsafeRational([2, 1]))), true)
      assert.strictEqual(T.is(new Dense('EUR', unsafeRational([-2, 1]))), true)
      assert.strictEqual(T.is(new Dense('USD', unsafeRational([2, 1]))), false)
    })

    it('encode', () => {
      const T = getDense('EUR')
      const d = new Dense('EUR', unsafeRational([2, 1]))
      assert.deepEqual(T.encode(d), ['2', '1'])
    })
  })
})
