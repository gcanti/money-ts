import { Option } from 'fp-ts/lib/Option'
import { PositiveRational } from '../PositiveRational'
import { Natural } from '../Natural'
import * as positiveRational from '../PositiveRational'
import * as bigInteger from '../BigInteger'
import * as natural from '../Natural'

const fromSome = <A>(fa: Option<A>): A =>
  fa.getOrElse(() => {
    throw new Error('fromSome called with None')
  })

export function unsafePositiveRational([x, y]: [number | string, number | string]): PositiveRational {
  const on = bigInteger.wrap(x).chain(natural.wrap)
  const od = bigInteger.wrap(y).chain(natural.wrap)
  return fromSome(od.ap(on.map(n => (d: Natural) => positiveRational.reduce(n, d))))
}
