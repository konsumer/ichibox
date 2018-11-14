#!/usr/bin/env node

require('dotenv/config')
const { say, play, listen, stt } = require('./lib')

const { WAKEWORD } = process.env

const run = async () => {
  await play('bell')
  await say(`I'm alive. Eventually, you'll be able to say ${WAKEWORD} to get me to do stuff.`)

  // listen to everything, when it thinks you said something, it will repeat ti back
  while (true) {
    const buffer = await listen()
    await say(`I HEARD: ${stt(buffer)}`)
  }
}
run()
