import * as t from 'io-ts'
import * as BI from 'big-integer'
import * as bigInteger from '../BigInteger'

const StringOrNumber = t.union([t.string, t.number])

export const BigInteger = new t.Type<BI.BigInteger, string>(
  'BigInteger',
  (m): m is BI.BigInteger => m instanceof BI,
  (m, c) => StringOrNumber.validate(m, c).chain(s => bigInteger.wrap(s).foldL(() => t.failure(s, c), t.success)),
  a => a.toString()
)
