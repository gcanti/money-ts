import * as PR from '../PositiveRational'

import PositiveRational = PR.PositiveRational

/**
 * @since 0.2.0
 */
export function unsafePositiveRational([x, y]: [number, number]): PositiveRational {
  return PR.reduce(BigInt(x) as any, BigInt(y) as any)
}
