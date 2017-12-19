import { scale } from '../Scale'

declare module '../Scale' {
  interface Scale {
    EUR: {
      EUR: [100, 1]
      cent: [100, 1]
      euro: [1, 1]
    }
  }
}

scale['EUR'] = {
  EUR: [100, 1],
  cent: [100, 1],
  euro: [1, 1]
}
