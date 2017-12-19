const Benchmark = require('benchmark')
const { scale } = require('../lib/Scale')
require('../lib/scale/EUR')

const suite = new Benchmark.Suite()

const fromDiscrete1 = (d, currency, unit) => {
  const [sn, sd] = scale[currency][unit]
  return [d * sd, sn]
}

const fromDiscrete2 = (d, cu) => {
  const [sn, sd] = scale[cu.currency][cu.unit]
  return [d * sd, sn]
}

const cu = {
  currency: 'EUR',
  unit: 'cent'
}

suite
  .add('fromDiscrete1', function() {
    fromDiscrete1(1, 'EUR', 'cent')
  })
  .add('fromDiscrete2', function() {
    fromDiscrete2(1, cu)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
