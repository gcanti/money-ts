import { scale } from '../Scale'
import { PositiveRational } from '../PositiveRational'
import { unsafePositiveRational } from './unsafePositiveRational'

declare module '../Scale' {
  interface Scale {
    /** Japanese yen */
    JPY: {
      JPY: PositiveRational
      yen: PositiveRational
      sen: PositiveRational
    }
  }
}

scale['JPY'] = {
  JPY: unsafePositiveRational([100, 1]),
  yen: unsafePositiveRational([1, 1]),
  sen: unsafePositiveRational([100, 1])
}
