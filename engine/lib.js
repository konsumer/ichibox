const rec = require('node-record-lpcm16')
const say = require('say')
const Ds = require('deepspeech')
const PlaySound = require('play-sound')

const {
  DEEP_MODEL,
  DEEP_N_FEATURES,
  DEEP_N_CONTEXT,
  DEEP_ALPHABET,
  DEEP_BEAM_WIDTH,
  DEEP_LM,
  DEEP_TRIE,
  DEEP_LM_WEIGHT,
  DEEP_VALID_WORD_COUNT_WEIGHT
} = process.env

console.log({
  DEEP_MODEL,
  DEEP_N_FEATURES,
  DEEP_N_CONTEXT,
  DEEP_ALPHABET,
  DEEP_BEAM_WIDTH,
  DEEP_LM,
  DEEP_TRIE,
  DEEP_LM_WEIGHT,
  DEEP_VALID_WORD_COUNT_WEIGHT
})

process.chdir(`${__dirname}/..`)
var model = new Ds.Model(DEEP_MODEL, parseInt(DEEP_N_FEATURES), parseInt(DEEP_N_CONTEXT), DEEP_ALPHABET, parseInt(DEEP_BEAM_WIDTH))
model.enableDecoderWithLM(DEEP_ALPHABET, DEEP_LM, DEEP_TRIE, parseFloat(DEEP_LM_WEIGHT), parseFloat(DEEP_VALID_WORD_COUNT_WEIGHT))

const player = PlaySound()

// listen till silence, resolve promise with data
module.exports.listen = () => {
  return new Promise((resolve, reject) => {
    let buff = Buffer.from([])
    const recorder = rec.start()
    recorder.on('data', chunk => {
      buff = Buffer.concat([buff, chunk])
    })
    recorder.on('end', () => resolve(buff))
    recorder.on('error', reject)
  })
}

// play one of the built-in MP3's
module.exports.play = (name) => new Promise((resolve, reject) => {
  player.play(`${__dirname}/../mp3/${name}.mp3`, (err) => {
    if (err) {
      return reject(err)
    }
    resolve()
  })
})

// get text for an audio-buffer
module.exports.stt = buff => {
  return model.stt(buff.slice(0, buff.length / 2), 16000)
}

// say some text
module.exports.say = text => new Promise((resolve, reject) => {
  say.speak(text, null, null, err => {
    if (err) {
      console.error('ERROR', err)
      return reject(err)
    }
    resolve()
  })
})
