import { scale } from '../Scale'
import { PositiveRational } from '../PositiveRational'
import { unsafePositiveRational } from './unsafePositiveRational'

declare module '../Scale' {
  interface Scale {
    /** United States dollar */
    USD: {
      USD: PositiveRational
      dollar: PositiveRational
      cent: PositiveRational
    }
  }
}

scale['USD'] = {
  USD: unsafePositiveRational([100, 1]),
  dollar: unsafePositiveRational([1, 1]),
  cent: unsafePositiveRational([100, 1])
}
