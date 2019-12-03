import * as PR from './PositiveRational'

import PositiveRational = PR.PositiveRational

function unsafePositiveRational(x: number, y: number): PositiveRational {
  return PR.reduce(BigInt(x) as any, BigInt(y) as any)
}

/**
 * @since 0.1.2
 */
export interface Scale {
  /** Australian dollar */
  AUD: {
    AUD: PositiveRational
    dollar: PositiveRational
    cent: PositiveRational
  }
  /** Bitcoin */
  BTC: {
    BTC: PositiveRational
    bitcoin: PositiveRational
    satoshi: PositiveRational
  }
  /** Swiss franc */
  CHF: {
    CHF: PositiveRational
    franc: PositiveRational
    rappen: PositiveRational
  }
  /** Chinese Renminbi */
  CNY: {
    CNY: PositiveRational
    yuan: PositiveRational
    fen: PositiveRational
  }
  /** European euro */
  EUR: {
    EUR: PositiveRational
    euro: PositiveRational
    cent: PositiveRational
  }
  /** Pound sterling */
  GBP: {
    GBP: PositiveRational
    pound: PositiveRational
    penny: PositiveRational
  }
  /** Indian rupee */
  INR: {
    INR: PositiveRational
    rupee: PositiveRational
    paisa: PositiveRational
  }
  /** Japanese yen */
  JPY: {
    JPY: PositiveRational
    yen: PositiveRational
    sen: PositiveRational
  }
  /** South Korean won */
  KRW: {
    KRW: PositiveRational
    won: PositiveRational
    jeon: PositiveRational
  }
  /** Russian ruble */
  RUB: {
    RUB: PositiveRational
    ruble: PositiveRational
    kopek: PositiveRational
  }
  /** United States dollar */
  USD: {
    USD: PositiveRational
    dollar: PositiveRational
    cent: PositiveRational
  }
  /** Silver. No canonical smallest unit */
  XAG: {
    'troy-ounce': PositiveRational
    grain: PositiveRational
    milligrain: PositiveRational
    micrograin: PositiveRational
    kilogram: PositiveRational
    gram: PositiveRational
    milligram: PositiveRational
    microgram: PositiveRational
  }
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
  /** Palladium. No canonical smallest unit */
  XPD: {
    'troy-ounce': PositiveRational
    grain: PositiveRational
    milligrain: PositiveRational
    micrograin: PositiveRational
    kilogram: PositiveRational
    gram: PositiveRational
    milligram: PositiveRational
    microgram: PositiveRational
  }
  /** Platinum. No canonical smallest unit */
  XPT: {
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

/**
 * @since 0.1.2
 */
export const scale: Scale = {
  AUD: {
    AUD: unsafePositiveRational(100, 1),
    dollar: unsafePositiveRational(1, 1),
    cent: unsafePositiveRational(100, 1)
  },
  BTC: {
    BTC: unsafePositiveRational(100000000, 1),
    bitcoin: unsafePositiveRational(1, 1),
    satoshi: unsafePositiveRational(100000000, 1)
  },
  CHF: {
    CHF: unsafePositiveRational(100, 1),
    franc: unsafePositiveRational(1, 1),
    rappen: unsafePositiveRational(100, 1)
  },
  CNY: {
    CNY: unsafePositiveRational(100, 1),
    yuan: unsafePositiveRational(1, 1),
    fen: unsafePositiveRational(100, 1)
  },
  EUR: {
    EUR: unsafePositiveRational(100, 1),
    euro: unsafePositiveRational(1, 1),
    cent: unsafePositiveRational(100, 1)
  },
  GBP: {
    GBP: unsafePositiveRational(100, 1),
    pound: unsafePositiveRational(1, 1),
    penny: unsafePositiveRational(100, 1)
  },
  INR: {
    INR: unsafePositiveRational(100, 1),
    rupee: unsafePositiveRational(1, 1),
    paisa: unsafePositiveRational(100, 1)
  },
  JPY: {
    JPY: unsafePositiveRational(100, 1),
    yen: unsafePositiveRational(1, 1),
    sen: unsafePositiveRational(100, 1)
  },
  KRW: {
    KRW: unsafePositiveRational(100, 1),
    won: unsafePositiveRational(1, 1),
    jeon: unsafePositiveRational(100, 1)
  },
  RUB: {
    RUB: unsafePositiveRational(100, 1),
    ruble: unsafePositiveRational(1, 1),
    kopek: unsafePositiveRational(100, 1)
  },
  USD: {
    USD: unsafePositiveRational(100, 1),
    dollar: unsafePositiveRational(1, 1),
    cent: unsafePositiveRational(100, 1)
  },
  XAG: {
    'troy-ounce': unsafePositiveRational(1, 1),
    grain: unsafePositiveRational(480, 1),
    milligrain: unsafePositiveRational(480000, 1),
    micrograin: unsafePositiveRational(480000000, 1),
    kilogram: unsafePositiveRational(31103477, 1000000000),
    gram: unsafePositiveRational(31103477, 1000000),
    milligram: unsafePositiveRational(31103477, 1000),
    microgram: unsafePositiveRational(31103477, 1)
  },
  XAU: {
    'troy-ounce': unsafePositiveRational(1, 1),
    grain: unsafePositiveRational(480, 1),
    milligrain: unsafePositiveRational(480000, 1),
    micrograin: unsafePositiveRational(480000000, 1),
    kilogram: unsafePositiveRational(31103477, 1000000000),
    gram: unsafePositiveRational(31103477, 1000000),
    milligram: unsafePositiveRational(31103477, 1000),
    microgram: unsafePositiveRational(31103477, 1)
  },
  XPD: {
    'troy-ounce': unsafePositiveRational(1, 1),
    grain: unsafePositiveRational(480, 1),
    milligrain: unsafePositiveRational(480000, 1),
    micrograin: unsafePositiveRational(480000000, 1),
    kilogram: unsafePositiveRational(31103477, 1000000000),
    gram: unsafePositiveRational(31103477, 1000000),
    milligram: unsafePositiveRational(31103477, 1000),
    microgram: unsafePositiveRational(31103477, 1)
  },
  XPT: {
    'troy-ounce': unsafePositiveRational(1, 1),
    grain: unsafePositiveRational(480, 1),
    milligrain: unsafePositiveRational(480000, 1),
    micrograin: unsafePositiveRational(480000000, 1),
    kilogram: unsafePositiveRational(31103477, 1000000000),
    gram: unsafePositiveRational(31103477, 1000000),
    milligram: unsafePositiveRational(31103477, 1000),
    microgram: unsafePositiveRational(31103477, 1)
  }
}

/**
 * @since 0.1.2
 */
export type Dimensions = keyof Scale

/**
 * @since 0.1.2
 */
export type Units<Dimension extends Dimensions> = keyof Scale[Dimension]
