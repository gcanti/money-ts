import { scale } from '../Scale'
import { PositiveRational } from '../PositiveRational'
import * as positiveRational from '../PositiveRational'
import { fromSome } from './fromSome'

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
  USD: fromSome(positiveRational.fromInput([100, 1])),
  dollar: fromSome(positiveRational.fromInput([1, 1])),
  cent: fromSome(positiveRational.fromInput([100, 1]))
}
