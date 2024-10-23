<template>
  <div>
    <h1>Howler.js 3D Spatial Audio Player</h1>
    <button @click="playAudio">Play</button>
    <button @click="pauseAudio">Pause</button>
    <button @click="stopAudio">Stop</button>
  </div>
</template>

<script setup>
import { Howl, Howler } from 'howler'
import { onMounted, onUnmounted } from 'vue'

let sound

onMounted(() => {
  sound = new Howl({
    src: ['/stainedglass.mp3'],
    html5: true,
  })

  // Position the sound source far to the right
  sound.pos(3, 19, 0)

  // Set the orientation of the listener (optional, but can enhance the 3D effect)
  // Howler.orientation(0, 0, -1, 0, 1, 0)
})

onUnmounted(() => {
  if (sound) {
    sound.unload()
  }
})

const playAudio = () => {
  if (sound) {
    sound.play()
  }
}

const pauseAudio = () => {
  if (sound) {
    sound.pause()
  }
}

const stopAudio = () => {
  if (sound) {
    sound.stop()
  }
}
</script>
