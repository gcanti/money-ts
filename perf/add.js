const Benchmark = require('benchmark')
const BigInteger = require('big-integer')
const integer = require('../lib/Integer')

const suite = new Benchmark.Suite()

const add = (x, y) => x + y

const x = 4
const y = 2

const bix = BigInteger(4)
const biy = BigInteger(2)

class BoxedInteger {
  constructor(value) {
    this.value = value
  }
  add(y) {
    return new BoxedInteger(this.value.add(y.value))
  }
}

const bx = new BoxedInteger(BigInteger(4))
const by = new BoxedInteger(BigInteger(2))

suite
  .add('native', function() {
    add(x, y)
  })
  .add('integer.add', function() {
    integer.add(bix, biy)
  })
  .add('BoxedInteger', function() {
    bx.add(by)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
