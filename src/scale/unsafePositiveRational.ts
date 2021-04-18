import * as O from 'fp-ts/Option'
import * as PR from '../PositiveRational'
import * as BI from '../BigInteger'
import * as N from '../Natural'
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

export function unsafePositiveRational([x, y]: [number | string, number | string]): PR.PositiveRational {
  const on = pipe(BI.wrap(x), O.chain(N.wrap))
  const od = pipe(BI.wrap(y), O.chain(N.wrap))
  return pipe(
    sequenceTO(on, od),
    O.map(([n, d]) => PR.reduce(n, d)),
    fromSome
  )
}
