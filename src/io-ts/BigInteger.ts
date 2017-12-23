import * as t from 'io-ts'
import * as BI from 'big-integer'
import * as bigInteger from '../BigInteger'

const StringOrNumber = t.union([t.string, t.number])

export const BigInteger = new t.Type<any, BI.BigInteger>(
  'BigInteger',
  (v): v is BI.BigInteger => v instanceof BI,
  (v, c) => StringOrNumber.validate(v, c).chain(s => bigInteger.wrap(s).fold(() => t.failure(s, c), t.success)),
  a => a.toString()
)
