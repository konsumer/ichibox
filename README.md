# ichibox

My friend Ichi wanted a AI personal assistant (kinda like Alexa or Google Home) that doesn't call back to a server.  This is an attempt at writing a custom assistant in nodejs, that runs locally, and only uses external services to accomplish goals (make requests.)

## prerequisites

You will need a pre-trained model for speech-to-text. To get that, run this:

```
wget -O - https://github.com/mozilla/DeepSpeech/releases/download/v0.3.0/deepspeech-0.3.0-models.tar.gz | tar xvfz -
```

You can also use curl (on mac):

```
curl -Ls https://github.com/mozilla/DeepSpeech/releases/download/v0.3.0/deepspeech-0.3.0-models.tar.gz | tar xvfz -
```


## usage

After you have installed the prerequisites, you can use it like a regular node-app:

Download the project, and run `npm install`, then `npm start`.

Now say "ichibox" (wait for beep) "change your name" to instruct it to listenm to a new wake-word. You can also chnage it in `.env`.

## how it works

It uses pocketsphinx to detect a wake-word, then deepspeech to work out the rest of what you said and send it to the correct skill.