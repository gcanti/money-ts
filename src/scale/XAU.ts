import { scale } from '../Scale'
import { PositiveRational } from '../PositiveRational'
import * as positiveRational from '../PositiveRational'
import { fromSome } from './fromSome'

declare module '../Scale' {
  interface Scale {
    /** Gold. No canonical smallest unit */
    XAU: {
      'troy-ounce': PositiveRational
      grain: PositiveRational
      milligrain: PositiveRational
      micrograin: PositiveRational
      kilogram: PositiveRational
      gram: PositiveRational
      milligram: PositiveRational
      microgram: PositiveRational
    }
  }
}

scale['XAU'] = {
  'troy-ounce': fromSome(positiveRational.fromInput([1, 1])),
  grain: fromSome(positiveRational.fromInput([480, 1])),
  milligrain: fromSome(positiveRational.fromInput([480000, 1])),
  micrograin: fromSome(positiveRational.fromInput([480000000, 1])),
  kilogram: fromSome(positiveRational.fromInput([31103477, 1000000000])),
  gram: fromSome(positiveRational.fromInput([31103477, 1000000])),
  milligram: fromSome(positiveRational.fromInput([31103477, 1000])),
  microgram: fromSome(positiveRational.fromInput([31103477, 1]))
}
