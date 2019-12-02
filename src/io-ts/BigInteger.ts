import * as t from 'io-ts'
import * as BI from 'big-integer'
import * as bigInteger from '../BigInteger'
import * as E from 'fp-ts/lib/Either'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

const StringOrNumber = t.union([t.string, t.number])

/**
 * @since 0.1.2
 */
export const BigInteger = new t.Type<BI.BigInteger, string>(
  'BigInteger',
  (m): m is BI.BigInteger => m instanceof BI,
  (m, c) =>
    pipe(
      StringOrNumber.validate(m, c),
      E.chain(s =>
        pipe(
          bigInteger.wrap(s),
          O.fold(() => t.failure(s, c), t.success)
        )
      )
    ),
  a => a.toString()
)
