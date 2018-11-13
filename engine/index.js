#!/usr/bin/env node

require('dotenv/config')
const { say, play, listen, stt } = require('./lib')

const { WAKEWORD, DEBUG } = process.env

const run = async () => {
  await play('bell')
  await say(`I'm alive. Say ${WAKEWORD} to get me to do stuff.`)

  while (true) {
    const buffer = await listen()
    if (DEBUG) {
      console.log('got speech', buffer)
    }
    console.log(stt(buffer))

    // TODO: do proper wake-word detection here, to switch between "open listening" and "parsing text" mode
  }
}
run()
