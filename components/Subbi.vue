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

const handleClick = () => {
	const listener = new THREE.AudioListener()
  camera.value.add(listener)
  const positionalAudio = new THREE.PositionalAudio(listener)

  const audioLoader = new THREE.AudioLoader()
  audioLoader.load('/stainedglass.mp3', (buffer) => {
    positionalAudio.setBuffer(buffer)
    positionalAudio.setLoop(true) // Optional: Loop the audio
    positionalAudio.setRefDistance(1) // Distance at which sound is 100% volume
    positionalAudio.play()
  })

  boxRef.value.add(positionalAudio)
}
</script>