import { scale } from '../Scale'
import { Rational } from '../Rational'
import * as rational from '../Rational'
import { fromSome } from './fromSome'

declare module '../Scale' {
  interface Scale {
    /** United States dollar */
    USD: {
      USD: Rational
      dollar: Rational
      cent: Rational
    }
  }
}

scale['USD'] = {
  USD: fromSome(rational.fromInput([100, 1])),
  dollar: fromSome(rational.fromInput([1, 1])),
  cent: fromSome(rational.fromInput([100, 1]))
}
