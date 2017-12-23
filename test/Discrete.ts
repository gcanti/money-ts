import * as assert from 'assert'
import * as BigInteger from 'big-integer'
import { Discrete, getSetoid, getOne, getZero, getOrd } from '../src/Discrete'
import * as integer from '../src/Integer'
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

const format = { dimension: 'EUR', unit: 'cent' }
const dn0 = new Discrete(format, n0)
const dn1 = new Discrete(format, n1)
const dn2 = new Discrete(format, n2)
const dn3 = new Discrete(format, n3)
const dn5 = new Discrete(format, n5)
const dn6 = new Discrete(format, n6)
const dz1 = new Discrete(format, z1)

const S = getSetoid<any, any>()

function assertEqual<D extends string, U extends string>(x: Discrete<D, U>, y: Discrete<D, U>): void {
  if (!S.equals(x)(y)) {
    assert.fail(`${x} !== ${y}`)
  }
}

describe('Discrete', () => {
  it('add', () => {
    assertEqual(dn2.add(dn3), dn5)
  })

  it('mul', () => {
    assertEqual(dn2.mul(n3), dn6)
  })

  it('one', () => {
    assertEqual(getOne(format), dn1)
  })

  it('negate', () => {
    assertEqual(dn1.negate(), dz1)
  })

  it('sub', () => {
    assertEqual(dn2.sub(dn3), dz1)
  })

  it('zero', () => {
    assertEqual(getZero(format), dn0)
  })

  it('div', () => {
    assertEqual(dn6.div(nz2), dn3)
    assertEqual(dn6.div(nz4), dn1)
  })

  it('isZero', () => {
    assert.strictEqual(dn0.isZero(), true)
    assert.strictEqual(dn5.isZero(), false)
  })

  it('ord', () => {
    const O = getOrd()
    assert.strictEqual(O.compare(dn1)(dn2), 'LT')
    assert.strictEqual(O.compare(dn2)(dn1), 'GT')
    assert.strictEqual(O.compare(dn2)(dn2), 'EQ')
  })

  it('should handle big numbers', () => {
    assertEqual(
      new Discrete(format, integer.wrap(BigInteger(9007199254740992))).add(dn1),
      new Discrete(format, integer.wrap(BigInteger('9007199254740993')))
    )
  })
})
