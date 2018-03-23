import { scale } from '../Scale'
import { PositiveRational } from '../PositiveRational'
import { unsafePositiveRational } from './unsafePositiveRational'

declare module '../Scale' {
  interface Scale {
    /** Bitcoin */
    BTC: {
      BTC: PositiveRational
      bitcoin: PositiveRational
      satoshi: PositiveRational
    }
  }
}

scale['BTC'] = {
  BTC: unsafePositiveRational([100000000, 1]),
  bitcoin: unsafePositiveRational([1, 1]),
  satoshi: unsafePositiveRational([100000000, 1])
}
