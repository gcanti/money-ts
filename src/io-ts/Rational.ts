import * as t from 'io-ts'
import { Integer } from './Integer'
import { NonZeroInteger } from './NonZeroInteger'
import { Rational as RationalNewtype } from '../Rational'

export const Rational: t.Type<any, RationalNewtype> = t.tuple([Integer, NonZeroInteger])
