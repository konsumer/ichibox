# hardware

## Raspberry pi 3

This is just a small & cheap computer that runs linux.


## [Google AIY voice kit](https://www.youtube.com/watch?v=9BmUNA1LBTw)

[purchase](https://www.amazon.com/GOOGLEAIY-V1-Google.../dp/B075SFLWKX )

Cheap way to add good audio (complete with mic & speaker) to pi. Comes in a cardboard box, which can be used as a template for plastic (3d printed) wood or metal enclosure.


# software

### current work

I made a [demo-project](https://github.com/konsumer/ichibox).

It can play mp3 files (for chimes and things) talk, and continuously listen. Currently it says what it thinks it heard you say, which is pretty inaccurate (it's using [deepspeech](https://github.com/mozilla/DeepSpeech)).


Here are some solutions for this part I tried out:

* [mycroft](https://mycroft.ai/get-started/) - looks cool, but the default setup uses google speech servers. It looks like it can run off [deepspeech](https://github.com/mozilla/DeepSpeech), but as noted, I didn't have great success with that engine.


## app

This is the main framework for the voice assistant software.

It needs to respond to a wake-word, load skills, and pass them parameters. It should listen all the time, and when it hears the primary wake word, turn on an indicator light and hand off commands to skills. When the command is understood, it should turn off light. It should also be triggerable by button-press, and configurable to not always listen for the wake-word.

I'd like to write it in javascript (nodejs) because I enjoy the language, and it has a lot of nice libraries for doing stuff, and I find it fast & easy to get things done. Python might also be a good choice, as all the AI stuff seems to be made in that.

## skills

They should have a name, trigger words, and actions that each trigger calls, and include possible paramters.

This should be mostly automatic once the other stuff is setup, just need to write code to actually do stuff.

## speech

I experimented with a few systems, but had various technical problems (or they report to servers)

* [deepspeech](https://github.com/mozilla/DeepSpeech) for generic on-device text-to-speech, but the generic models had very low success-rates. I might be able to tune it by only listening to a subset of words at a given time (more like wakewords.) This is what is currently in the [demo-project](https://github.com/konsumer/ichibox).
* [wit.ai](https://wit.ai/) looks cool & accurate, and doesn't use google/apple/microsoft/amazon, but it does use remote servers, so it's slower and you are sending what you say to someone else.
* [snowboy](https://snowboy.kitt.ai/) - couldn't install the node-bindings on my mac. Might be fine on a pi. This does wake-words, and allows you to train custom words, via the API, so we might be able to use it as a kind of tiered system "<WAKEWORD>, <COMMAND> <PARAMETER>" with pre-trained keywords
* [pocketsphinx](https://github.com/cmusphinx/pocketsphinx) - this looks very promising for wake-word and regular speech detection, but it's a bit complicated to setup. I didn't have time to get everything running, but tried to make it work in node and had some technical issues. It also requires CMU pronunciation for words it received, so for non-regular english words, it will require some hand-editing of grammars (it's just simple text, so not a super-big deal.) There are libraries that will work out regular english words, though, so a lot of the words can be worked out automatically.
* [porcupine](https://github.com/Picovoice/Porcupine) - very accurate, but for custom words in nodejs, we will need to buy a license. I may be able to compile our own word keyfiles, but only on a few target platforms (regular linux on a modern computer, but not rasbpi.)

