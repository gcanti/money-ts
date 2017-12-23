import { Option } from 'fp-ts/lib/Option'

export const fromSome = <A>(fa: Option<A>): A =>
  fa.getOrElse(() => {
    throw new Error('fromSome called with None')
  })
