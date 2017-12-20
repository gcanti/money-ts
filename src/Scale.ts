export interface Scale {}

export const scale: Scale = {} as any

export type Dimensions = keyof Scale

export type Units<Dimension extends Dimensions> = keyof Scale[Dimension]
