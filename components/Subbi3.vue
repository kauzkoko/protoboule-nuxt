<template>
  <TresPerspectiveCamera :position="[0, 1.7, 7]" :look-at="[0, 0, 0]" />
  <OrbitControls />
  <TresMesh ref="boxRef" @click="handleClick">
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="#8855ff" />
  </TresMesh>
  <TresAmbientLight :intensity="0.5" />
  <TresDirectionalLight :position="[5, 5, 5]" :intensity="1" />
</template>

<script setup>
import * as THREE from 'three'
import { useTresContext } from '@tresjs/core'

const { camera } = useTresContext()
const boxRef = ref()

watch(boxRef, (newVal, oldVal) => {
  console.log(newVal, oldVal)
})

const handleClick = async () => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: true })
    const listener = new THREE.AudioListener()
    camera.value.add(listener)

    // Create a positional audio source
    const positionalAudio = new THREE.PositionalAudio(listener)

    // Use the captured audio stream
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const source = audioContext.createMediaStreamSource(stream)
    positionalAudio.setNodeSource(source)
    positionalAudio.setRefDistance(1)

    boxRef.value.add(positionalAudio)

    // Stop the stream when it's no longer needed
    const stopAudio = () => {
      stream.getTracks().forEach(track => track.stop())
      positionalAudio.disconnect()
    }

    // You might want to call stopAudio() when appropriate, e.g., on component unmount
  } catch (error) {
    console.error('Error capturing audio:', error)
  }
}
</script>

<style scoped>
.strudel-editor-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 600px;
  height: 300px;
}
</style>
