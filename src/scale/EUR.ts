import { scale } from '../Scale'
import { Rational } from '../Rational'
import * as rational from '../Rational'
import { fromSome } from './fromSome'

declare module '../Scale' {
  interface Scale {
    /** European euro */
    EUR: {
      EUR: Rational
      euro: Rational
      cent: Rational
    }
  }
}

scale['EUR'] = {
  EUR: fromSome(rational.fromInput([100, 1])),
  euro: fromSome(rational.fromInput([1, 1])),
  cent: fromSome(rational.fromInput([100, 1]))
}
