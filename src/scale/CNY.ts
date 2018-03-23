import { scale } from '../Scale'
import { PositiveRational } from '../PositiveRational'
import { unsafePositiveRational } from './unsafePositiveRational'

declare module '../Scale' {
  interface Scale {
    /** Chinese Renminbi */
    CNY: {
      CNY: PositiveRational
      yuan: PositiveRational
      fen: PositiveRational
    }
  }
}

scale['CNY'] = {
  CNY: unsafePositiveRational([100, 1]),
  yuan: unsafePositiveRational([1, 1]),
  fen: unsafePositiveRational([100, 1])
}
