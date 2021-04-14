import * as O from 'fp-ts/Option'
import { PositiveRational } from '../PositiveRational'
import * as positiveRational from '../PositiveRational'
import * as bigInteger from '../BigInteger'
import * as natural from '../Natural'
import { pipe } from 'fp-ts/function'
import { sequenceT } from 'fp-ts/Apply'

const fromSome = <A>(fa: O.Option<A>): A =>
  pipe(
    fa,
    O.getOrElse<A>(() => {
      throw new Error('fromSome called with None')
    })
  )

const sequenceTO = sequenceT(O.Applicative)

export function unsafePositiveRational([x, y]: [number | string, number | string]): PositiveRational {
  const on = pipe(bigInteger.wrap(x), O.chain(natural.wrap))
  const od = pipe(bigInteger.wrap(y), O.chain(natural.wrap))
  return pipe(
    sequenceTO(on, od),
    O.map(([n, d]) => positiveRational.reduce(n, d)),
    fromSome
  )
}
