import * as t from 'io-ts'
import * as BI from '../bigint'
import * as E from 'fp-ts/lib/Either'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

/**
 * @since 0.2.0
 */
export const bigint = new t.Type<bigint, string>(
  'bigint',
  // tslint:disable-next-line
  (u): u is bigint => typeof u === 'bigint',
  (u, c) =>
    pipe(
      t.string.validate(u, c),
      E.chain(s =>
        pipe(
          BI.make(s),
          O.fold(() => t.failure(s, c), t.success)
        )
      )
    ),
  a => a.toString()
)
