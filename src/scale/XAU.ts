import { scale } from '../Scale'
import { Rational } from '../Rational'
import * as rational from '../Rational'
import { fromSome } from './fromSome'

declare module '../Scale' {
  interface Scale {
    /** Gold. No canonical smallest unit */
    XAU: {
      'troy-ounce': Rational
      grain: Rational
      milligrain: Rational
      micrograin: Rational
      kilogram: Rational
      gram: Rational
      milligram: Rational
      microgram: Rational
    }
  }
}

scale['XAU'] = {
  'troy-ounce': fromSome(rational.fromInput([1, 1])),
  grain: fromSome(rational.fromInput([480, 1])),
  milligrain: fromSome(rational.fromInput([480000, 1])),
  micrograin: fromSome(rational.fromInput([480000000, 1])),
  kilogram: fromSome(rational.fromInput([31103477, 1000000000])),
  gram: fromSome(rational.fromInput([31103477, 1000000])),
  milligram: fromSome(rational.fromInput([31103477, 1000])),
  microgram: fromSome(rational.fromInput([31103477, 1]))
}
