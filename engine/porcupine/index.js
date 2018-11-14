const { readFile } = require('fs')
const { promisify } = require('util')
const porcupine = require('./pv_porcupine')

const read = promisify(readFile)

class Porcupine {
  async init (keywordFiles, sensitivities) {
    this.keywordFiles = keywordFiles
    const keywordIDs = await Promise.all(Object.values(keywordFiles).map(f => read(f)))
    this.obj = porcupine.create(keywordIDs, sensitivities)
  }

  process (buff) {
    return Object.keys(this.keywordFiles)[this.obj.process(buff)]
  }

  release () {
    this.obj.release()
  }
}

module.exports = Porcupine
