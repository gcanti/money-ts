import * as t from 'io-ts'
import * as BI from 'big-integer'
import * as bigInteger from '../BigInteger'
import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'

const StringOrNumber = t.union([t.string, t.number])

export const BigInteger = new t.Type<BI.BigInteger, string>(
  'BigInteger',
  (m): m is BI.BigInteger => m instanceof BI,
  (m, c) =>
    pipe(
      StringOrNumber.validate(m, c),
      E.chain((s) =>
        pipe(
          bigInteger.wrap(s),
          O.fold(() => t.failure(s, c), t.success)
        )
      )
    ),
  (a) => a.toString()
)
