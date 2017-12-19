import { scale } from '../Scale'

declare module '../Scale' {
  interface Scale {
    /** United States dollar */
    USD: {
      USD: [100, 1]
      dollar: [1, 1]
      cent: [100, 1]
    }
  }
}

scale['USD'] = {
  USD: [100, 1],
  dollar: [1, 1],
  cent: [100, 1]
}
