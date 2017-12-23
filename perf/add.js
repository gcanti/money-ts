const Benchmark = require('benchmark')
const BigInteger = require('big-integer')
const integer = require('../lib/Integer')

const suite = new Benchmark.Suite()

const add = (x, y) => x + y

const x = 4
const y = 2

const bx = BigInteger(4)
const by = BigInteger(2)

suite
  .add('native', function() {
    add(x, y)
  })
  .add('big-integer', function() {
    integer.add(bx, by)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
