import * as assert from 'assert'
import * as discrete from '../src/Discrete'
import { Integer } from '../src/Integer'

const d2: discrete.Discrete<'EUR', 'cent'> = 2 as any
const d3: discrete.Discrete<'EUR', 'cent'> = 3 as any
const i3: Integer = 3 as any

describe('Discrete', () => {
  it('add', () => {
    assert.strictEqual(discrete.add(d2, d3), 5)
  })

  it('mul', () => {
    assert.strictEqual(discrete.mul(d2, i3), 6)
  })

  it('one', () => {
    assert.strictEqual(discrete.one, 1)
  })

  it('sub', () => {
    assert.strictEqual(discrete.sub(d2, d3), -1)
  })

  it('zero', () => {
    assert.strictEqual(discrete.zero, 0)
  })
})
