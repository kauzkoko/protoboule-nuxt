<template>
  <div>
    <h1>Howler.js Audio Player</h1>
    <button @click="playAudio">Play</button>
    <button @click="pauseAudio">Pause</button>
    <button @click="stopAudio">Stop</button>
  </div>
</template>

<script setup>
import { Howl } from 'howler'

const sound = ref(null)

onMounted(() => {
  sound.value = new Howl({
    src: ['/stainedglass.mp3'],
    html5: true
  })
})

onUnmounted(() => {
  if (sound.value) {
    sound.value.unload()
  }
})

const playAudio = () => {
  if (sound.value) {
    sound.value.play()
  }
}

const pauseAudio = () => {
  if (sound.value) {
    sound.value.pause()
  }
}

const stopAudio = () => {
  if (sound.value) {
    sound.value.stop()
  }
}
</script>

