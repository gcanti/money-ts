import { scale } from '../Scale'
import { PositiveRational } from '../PositiveRational'
import { unsafePositiveRational } from './unsafePositiveRational'

declare module '../Scale' {
  interface Scale {
    /** South Korean won */
    KRW: {
      KRW: PositiveRational
      won: PositiveRational
      jeon: PositiveRational
    }
  }
}

scale['KRW'] = {
  KRW: unsafePositiveRational([100, 1]),
  won: unsafePositiveRational([1, 1]),
  jeon: unsafePositiveRational([100, 1])
}
