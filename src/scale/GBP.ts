import { scale } from '../Scale'
import { PositiveRational } from '../PositiveRational'
import { unsafePositiveRational } from './unsafePositiveRational'

declare module '../Scale' {
  interface Scale {
    /** Pound sterling */
    GBP: {
      GBP: PositiveRational
      pound: PositiveRational
      penny: PositiveRational
    }
  }
}

scale['GBP'] = {
  GBP: unsafePositiveRational([100, 1]),
  pound: unsafePositiveRational([1, 1]),
  penny: unsafePositiveRational([100, 1])
}
