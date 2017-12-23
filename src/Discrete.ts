import { Integer } from './Integer'
import { NonZeroInteger } from './NonZeroInteger'
import * as integer from './Integer'
import { Setoid } from 'fp-ts/lib/Setoid'
import { Ord } from 'fp-ts/lib/Ord'

export interface Format<D extends string, U extends string> {
  dimension: D
  unit: U
}

export class Discrete<D extends string, U extends string> {
  constructor(readonly format: Format<D, U>, readonly value: Integer) {}
  add(y: Discrete<D, U>): Discrete<D, U> {
    return new Discrete(this.format, integer.add(this.value, y.value))
  }
  mul(y: Integer): Discrete<D, U> {
    return new Discrete(this.format, integer.mul(this.value, y))
  }
  negate(): Discrete<D, U> {
    return new Discrete(this.format, integer.negate(this.value))
  }
  sub(y: Discrete<D, U>): Discrete<D, U> {
    return new Discrete(this.format, integer.sub(this.value, y.value))
  }
  div(y: NonZeroInteger): Discrete<D, U> {
    return new Discrete(this.format, integer.div(this.value, y))
  }
  isZero(): boolean {
    return integer.isZero(this.value)
  }
}

export const getOne = <D extends string, U extends string>(format: Format<D, U>): Discrete<D, U> =>
  new Discrete(format, integer.one)

export const getZero = <D extends string, U extends string>(format: Format<D, U>): Discrete<D, U> =>
  new Discrete(format, integer.zero)

export const getSetoid = <D extends string, U extends string>(): Setoid<Discrete<D, U>> => ({
  equals: x => y => integer.setoid.equals(x.value)(y.value)
})

export const getOrd = <D extends string, U extends string>(): Ord<Discrete<D, U>> => ({
  ...getSetoid(),
  compare: x => y => integer.ord.compare(x.value)(y.value)
})
