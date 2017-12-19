export interface Scale {}

export const scale: Scale = {} as any

export type Currencies = keyof Scale

export type Units<Currency extends Currencies> = keyof Scale[Currency]
