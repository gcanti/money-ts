import { scale } from '../Scale'
import { PositiveRational } from '../PositiveRational'
import * as positiveRational from '../PositiveRational'
import { fromSome } from './fromSome'

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
  EUR: fromSome(positiveRational.fromInput([100, 1])),
  euro: fromSome(positiveRational.fromInput([1, 1])),
  cent: fromSome(positiveRational.fromInput([100, 1]))
}
