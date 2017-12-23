import * as assert from 'assert'
import * as BigInteger from 'big-integer'
import { Discrete } from '../src/Discrete'
import * as integer from '../src/Integer'
import * as discrete from '../src/Discrete'
import * as nonZeroInteger from '../src/NonZeroInteger'
import { fromSome } from '../src/scale/fromSome'

const n0 = integer.wrap(BigInteger(0))
const n1 = integer.wrap(BigInteger(1))
const n2 = integer.wrap(BigInteger(2))
const n3 = integer.wrap(BigInteger(3))
const n5 = integer.wrap(BigInteger(5))
const n6 = integer.wrap(BigInteger(6))
const z1 = integer.wrap(BigInteger(-1))
const nz2 = fromSome(nonZeroInteger.wrap(BigInteger(2)))
const nz4 = fromSome(nonZeroInteger.wrap(BigInteger(4)))

const dn0 = discrete.wrap<'EUR', 'cent'>(n0)
const dn1 = discrete.wrap<'EUR', 'cent'>(n1)
const dn2 = discrete.wrap<'EUR', 'cent'>(n2)
const dn3 = discrete.wrap<'EUR', 'cent'>(n3)
const dn5 = discrete.wrap<'EUR', 'cent'>(n5)
const dn6 = discrete.wrap<'EUR', 'cent'>(n6)
const dz1 = discrete.wrap<'EUR', 'cent'>(z1)

const S = discrete.getSetoid<any, any>()

function assertEqual<D, U>(x: Discrete<D, U>, y: Discrete<D, U>): void {
  if (!S.equals(x)(y)) {
    assert.fail(`${x} !== ${y}`)
  }
}

describe('Discrete', () => {
  it('add', () => {
    assertEqual(discrete.add(dn2, dn3), dn5)
  })

  it('mul', () => {
    assertEqual(discrete.mul(dn2, n3), dn6)
  })

  it('one', () => {
    assertEqual(discrete.one, dn1)
  })

  it('negate', () => {
    assertEqual(discrete.negate(discrete.one), dz1)
  })

  it('sub', () => {
    assertEqual(discrete.sub(dn2, dn3), dz1)
  })

  it('zero', () => {
    assertEqual(discrete.zero, dn0)
  })

  it('div', () => {
    assertEqual(discrete.div(dn6, nz2), dn3)
    assertEqual(discrete.div(dn6, nz4), dn1)
  })

  it('isZero', () => {
    assert.strictEqual(discrete.isZero(dn0), true)
    assert.strictEqual(discrete.isZero(dn5), false)
  })

  it('ord', () => {
    const O = discrete.getOrd<'EUR', 'cent'>()
    assert.strictEqual(O.compare(dn1)(dn2), 'LT')
    assert.strictEqual(O.compare(dn2)(dn1), 'GT')
    assert.strictEqual(O.compare(dn2)(dn2), 'EQ')
  })

  it('should handle big numbers', () => {
    assertEqual(
      discrete.add(discrete.wrap(integer.wrap(BigInteger(9007199254740992))), discrete.one),
      discrete.wrap(integer.wrap(BigInteger('9007199254740993')))
    )
  })
})
