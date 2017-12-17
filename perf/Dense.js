const Benchmark = require('benchmark')
const dense = require('../lib/Dense')

const suite = new Benchmark.Suite()

const x = [4, 1]
const y = [2, 1]
const dx = dense.fromRational(x)
const dy = dense.fromRational(y)

suite
  .add('native', function() {
    ;[4 * 1, 1 * 2]
  })
  .add('dense.div', function() {
    dense.div(dy, dx)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
