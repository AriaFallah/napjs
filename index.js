#!/usr/bin/env node

const say = require('say')
const ora = require('ora')
const m = require('minimist')

function alarm(time, message) {
  let timer = time
  const spinner = ora(`${timer}s`).start();
  const messageInterval = Math.ceil(message.length / 10) * 1000
  const countDown = setInterval(() => spinner.text = `${--timer}s`, 1000)

  setTimeout(function() {
    clearInterval(countDown)
    spinner.text = message.toUpperCase()
    setInterval(() => say.speak(message), messageInterval);
  }, time * 1000)
}

const argv = m(process.argv.slice(2))
if (!argv.t || argv.t === true) {
  console.log('Need to provide -t flag specifying time!')
  process.exit(1)
}
alarm(argv.t, argv.m || 'wake up')
