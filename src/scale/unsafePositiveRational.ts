import { sequenceT } from 'fp-ts/lib/Apply'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import * as BI from '../BigInteger'
import * as N from '../Natural'
import * as PR from '../PositiveRational'

import PositiveRational = PR.PositiveRational

const fromSome = <A>(fa: O.Option<A>): A =>
  pipe(
    fa,
    O.getOrElse<A>(() => {
      throw new Error('fromSome called with None')
    })
  )

/**
 * @since 0.1.2
 */
export function unsafePositiveRational([x, y]: [number | string, number | string]): PositiveRational {
  const on = pipe(BI.wrap(x), O.chain(N.wrap))
  const od = pipe(BI.wrap(y), O.chain(N.wrap))
  return fromSome(
    pipe(
      sequenceT(O.option)(on, od),
      O.map(([n, d]) => PR.reduce(n, d))
    )
  )
}
