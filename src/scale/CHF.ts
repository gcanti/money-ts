import { scale } from '../Scale'
import { PositiveRational } from '../PositiveRational'
import { unsafePositiveRational } from './unsafePositiveRational'

declare module '../Scale' {
  interface Scale {
    /** Swiss franc */
    CHF: {
      CHF: PositiveRational
      franc: PositiveRational
      rappen: PositiveRational
    }
  }
}

scale['CHF'] = {
  CHF: unsafePositiveRational([100, 1]),
  franc: unsafePositiveRational([1, 1]),
  rappen: unsafePositiveRational([100, 1])
}
