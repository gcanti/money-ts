const Benchmark = require('benchmark')
const BigInteger = require('big-integer')
const discrete = require('../lib/Discrete')

const suite = new Benchmark.Suite()

const x = BigInteger(3)
const y = BigInteger(4)

class BoxedDiscrete {
  constructor(currency, unit, value) {
    this.currency = currency
    this.unit = unit
    this.value = value
  }
  add(y) {
    return new BoxedDiscrete(this.currency, this.unit, discrete.add(this.value, y.value))
  }
}

const bx = new BoxedDiscrete('EUR', 'euro', x)
const by = new BoxedDiscrete('EUR', 'euro', y)

suite
  .add('discrete.add', function() {
    discrete.add(x, y)
  })
  .add('BoxedDiscrete', function() {
    bx.add(by)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
