import { scale } from '../Scale'

declare module '../Scale' {
  interface Scale {
    XAU: {
      'troy-ounce': [1, 1]
      grain: [480, 1]
      milligrain: [480000, 1]
      micrograin: [480000000, 1]
      kilogram: [31103477, 1000000000]
      gram: [31103477, 1000000]
      milligram: [31103477, 1000]
      microgram: [31103477, 1]
    }
  }
}

scale['XAU'] = {
  'troy-ounce': [1, 1],
  grain: [480, 1],
  milligrain: [480000, 1],
  micrograin: [480000000, 1],
  kilogram: [31103477, 1000000000],
  gram: [31103477, 1000000],
  milligram: [31103477, 1000],
  microgram: [31103477, 1]
}
