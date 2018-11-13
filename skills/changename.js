const say = require('say')

module.exports = [
  {
    triggers: ['change your name'],
    action: () => {
      say.speak('What would you like to call me?')
    }
  }
]
