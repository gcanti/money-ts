const Benchmark = require('benchmark')
const integer = require('../lib/Integer')

const suite = new Benchmark.Suite()

const add = (x, y) => x + y

const x = 4
const y = 2

suite
  .add('native', function() {
    add(x, y)
  })
  .add('add', function() {
    integer.add(x, y)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
