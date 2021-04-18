import * as t from 'io-ts'
import * as NZI from './NonZeroInteger'
import * as I from './Integer'
import * as ER from './ExchangeRate'
import * as D from './Discrete'
import * as BI from './BigInteger'
import * as N from './Natural'
import * as NZR from './NonZeroRational'
import * as PR from './PositiveRational'
import * as RTN from './Rational'
import * as bigInteger from 'big-integer'
import { pipe, unsafeCoerce } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { Dense } from './Dense'

const StringOrNumber = t.union([t.string, t.number])

export const BigInteger = new t.Type<bigInteger.BigInteger, string>(
  'BigInteger',
  (m): m is bigInteger.BigInteger => m instanceof bigInteger,
  (m, c) =>
    pipe(
      StringOrNumber.validate(m, c),
      E.chain((s) =>
        pipe(
          BI.wrap(s),
          O.fold(() => t.failure(s, c), t.success)
        )
      )
    ),
  (a) => a.toString()
)

export const getDense = <D extends string>(dimension: D): t.Type<Dense<D>, [string, string], t.mixed> =>
  new t.Type(
    'Dense',
    (m): m is Dense<D> => m instanceof Dense && m.dimension === dimension,
    (m, c) =>
      pipe(
        Rational.validate(m, c),
        E.map((r) => new Dense(dimension, r))
      ),
    (a) => Rational.encode(a.value)
  )

export const getDiscrete = <D extends string, U extends string>(
  dimension: D,
  unit: U
): t.Type<D.Discrete<D, U>, string, t.mixed> => {
  const format = { dimension, unit }
  return new t.Type(
    'Discrete',
    (m): m is D.Discrete<D, U> => m instanceof D.Discrete && m.format.dimension === dimension && m.format.unit === unit,
    (m, c) =>
      pipe(
        Integer.validate(m, c),
        E.map((r) => new D.Discrete(format, r))
      ),
    (a) => Integer.encode(a.value)
  )
}

export const ExchangeRate = <S, D>(): t.Type<ER.ExchangeRate<S, D>, [string, string], t.mixed> =>
  unsafeCoerce(PositiveRational)

export const Integer: t.Type<I.Integer, string, t.mixed> = unsafeCoerce(BigInteger)

export const Natural: t.Type<N.Natural, string, t.mixed> = unsafeCoerce(
  t.refinement(BigInteger, (bi) => bi.isPositive(), 'Natural')
)

export const NonZeroInteger: t.Type<NZI.NonZeroInteger, string, t.mixed> = unsafeCoerce(
  t.refinement(BigInteger, (bi) => !bi.isZero(), 'NonZeroInteger')
)

const NonZeroRationalC = t.tuple([NonZeroInteger, Natural])

export const NonZeroRational: t.Type<NZR.NonZeroRational, [string, string], t.mixed> = new t.Type(
  'NonZeroRational',
  NonZeroRationalC.is,
  (m, c) =>
    pipe(
      NonZeroRationalC.validate(m, c),
      E.map(([n, d]) => NZR.reduce(n, d))
    ),
  NonZeroRationalC.encode
)

const PositiveRationalC = t.tuple([Natural, Natural])

export const PositiveRational: t.Type<PR.PositiveRational, [string, string], t.mixed> = new t.Type(
  'PositiveRational',
  PositiveRationalC.is,
  (m, c) =>
    pipe(
      PositiveRationalC.validate(m, c),
      E.map(([n, d]) => PR.reduce(n, d))
    ),
  PositiveRationalC.encode
)

const RationalC = t.tuple([Integer, Natural])

export const Rational: t.Type<RTN.Rational, [string, string], t.mixed> = new t.Type(
  'Rational',
  RationalC.is,
  (m, c) =>
    pipe(
      RationalC.validate(m, c),
      E.map(([n, d]) => RTN.reduce(n, d))
    ),
  RationalC.encode
)
