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
import { initStrudel, getAudioContext } from '@strudel/web'

const { camera } = useTresContext()
const boxRef = ref()

watch(boxRef, (newVal, oldVal) => {
  console.log(newVal, oldVal)
})

onMounted(async () => {
  await initStrudel({
    prebake: () => samples('github:tidalcycles/dirt-samples'),
  })
})

const handleClick = async () => {
  s('bd sd').play()

  setTimeout(() => {
    const listener = new THREE.AudioListener()
    camera.value.add(listener) // Attach listener to the camera

    // Step 1: Get the existing AudioContext from Strudel
    const audioContext = getAudioContext()

    // Step 2: Create a MediaStreamDestination to capture the audio output
    const mediaStreamDestination = audioContext.createMediaStreamDestination()

    // Step 3: Ensure the audio from the AudioContext flows into the MediaStream
    const sourceNode = audioContext.createGain() // Use a gain node as the connection point
    sourceNode.connect(mediaStreamDestination) // Route the gain node to the media stream

    // Step 4: Create a MediaStreamSource from the media stream
    const mediaStreamSource = listener.context.createMediaStreamSource(
      mediaStreamDestination.stream
    )

    // Step 5: Set up the PositionalAudio with the captured media stream
    const positionalAudio = new THREE.PositionalAudio(listener)
    positionalAudio.setNodeSource(mediaStreamSource) // Set the source of the positional audio
    positionalAudio.setRefDistance(1) // Set reference distance for attenuation
    positionalAudio.setDistanceModel('inverse') // Use inverse distance model for realistic falloff

    // Step 6: Attach the PositionalAudio to the box mesh
    boxRef.value.add(positionalAudio)

    // Step 7: Start the audio routing properly
    positionalAudio.play() // Start playing positional audio (if needed)
  }, 2000)
}
</script>