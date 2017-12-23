const Benchmark = require('benchmark')
const BigInteger = require('big-integer')
const dense = require('../lib/Dense')

const suite = new Benchmark.Suite()

const x = [BigInteger(1), BigInteger(3)]
const y = [BigInteger(1), BigInteger(4)]

class BoxedDense {
  constructor(currency, value) {
    this.currency = currency
    this.value = value
  }
  add(y) {
    return new BoxedDense(this.currency, dense.add(this.value, y.value))
  }
}

const bx = new BoxedDense('EUR', x)
const by = new BoxedDense('EUR', y)

suite
  .add('dense.add', function() {
    dense.add(x, y)
  })
  .add('BoxedDense', function() {
    bx.add(by)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
