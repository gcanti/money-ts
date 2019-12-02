import { unsafeCoerce } from 'fp-ts/lib/function'

/**
 * @since 0.1.2
 */
export interface Scale {}

/**
 * @since 0.1.2
 */
export const scale: Scale = unsafeCoerce({})

/**
 * @since 0.1.2
 */
export type Dimensions = keyof Scale

/**
 * @since 0.1.2
 */
export type Units<Dimension extends Dimensions> = keyof Scale[Dimension]
