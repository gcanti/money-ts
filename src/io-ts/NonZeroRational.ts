import * as t from 'io-ts'
import { NonZeroInteger } from './NonZeroInteger'
import { NonZeroRational as NonZeroRationalNewtype } from '../NonZeroRational'

export const NonZeroRational: t.Type<any, NonZeroRationalNewtype> = t.tuple([NonZeroInteger, NonZeroInteger])
