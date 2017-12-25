import { scale } from '../Scale'
import { PositiveRational } from '../PositiveRational'
import { unsafePositiveRational } from './unsafePositiveRational'

declare module '../Scale' {
  interface Scale {
    /** European euro */
    EUR: {
      EUR: PositiveRational
      euro: PositiveRational
      cent: PositiveRational
    }
  }
}

scale['EUR'] = {
  EUR: unsafePositiveRational([100, 1]),
  euro: unsafePositiveRational([1, 1]),
  cent: unsafePositiveRational([100, 1])
}
