import { unsafeCoerce } from 'fp-ts/function'

export interface Scale {}

export const scale: Scale = unsafeCoerce({})

export type Dimensions = keyof Scale

export type Units<Dimension extends Dimensions> = keyof Scale[Dimension]
