<template>
  <div>
    <h1>Tone.js 3D Sound Example</h1>
    <button @click="toggleSound">{{ isPlaying ? 'Stop Sound' : 'Start Sound' }}</button>
    <p>Move your mouse horizontally to change the sound position</p>
    <div>{{ panX }}</div>
  </div>
</template>

<script setup>
import * as Tone from 'tone';
import { ref, onMounted, watch } from 'vue';

let noiseSource;
let panner;
const isPlaying = ref(false);

const { x, y } = useMouse();

onMounted(() => {
  // Create the panner
  panner = new Tone.Panner3D({
    positionX: 10,
    positionY: 0,
    positionZ: -1,
  }).toDestination();

  // Create the noise source and connect it to the panner
  noiseSource = new Tone.Noise({
    type: "white",
    volume: -20
  }).connect(panner);

  // Watch for changes in mouse X position
  watch([x, y], ([newX, newY]) => {
    // Calculate the panner position based on mouse X
    // Map the mouse X position (0 to window.innerWidth) to the range (-10 to 10)
    const panPosition = (newX / window.innerWidth) * 20 - 10;
    const panPositionY = (newY / window.innerHeight) * 20 - 10;
    panner.positionX.value = panPosition;
    panner.positionY.value = panPositionY;
  });
});

const toggleSound = async () => {
  await Tone.start();
  if (isPlaying.value) {
    noiseSource.stop();
    isPlaying.value = false;
  } else {
    noiseSource.start();
    isPlaying.value = true;
  }
};
</script>
