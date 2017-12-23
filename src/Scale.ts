import { unsafeCoerce } from 'newtype-ts'

export interface Scale {}

export const scale: Scale = unsafeCoerce({})

export type Dimensions = keyof Scale

export type Units<Dimension extends Dimensions> = keyof Scale[Dimension]
