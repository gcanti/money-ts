const Benchmark = require('benchmark')
const dense = require('../lib/Dense')

const suite = new Benchmark.Suite()

const x = [1, 3]
const y = [1, 4]

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

const ox = { n: 1, d: 3 }
const oy = { n: 1, d: 4 }

suite
  .add('native with arrays', function() {
    ;[x[0] * y[1] + y[0] * x[1], x[1] * y[1]]
  })
  .add('native with objects', function() {
    ;[ox.n * oy.d + oy.n * ox.d, ox.d * oy.d]
  })
  .add('Dense.add', function() {
    dense.add(x, y)
  })
  .add('dense.div', function() {
    bx.add(by)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
