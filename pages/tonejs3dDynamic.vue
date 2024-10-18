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

let oscillator;
let panner;
const isPlaying = ref(false);

const { x } = useMouse();

onMounted(() => {
  // Create the panner
  panner = new Tone.Panner3D({
    positionX: 10,
    positionY: 0,
    positionZ: -1,
  }).toDestination();

  // Create the oscillator and connect it to the panner
  oscillator = new Tone.Oscillator({
    type: "sine",
    frequency: 440,
    volume: -10
  }).connect(panner);

  // Watch for changes in mouse X position
  watch(x, (newX) => {
    // Calculate the panner position based on mouse X
    // Map the mouse X position (0 to window.innerWidth) to the range (-10 to 10)
    const panPosition = (newX / window.innerWidth) * 20 - 10;
    panner.positionX.value = panPosition;
  });
});

const toggleSound = async () => {
  await Tone.start();
  if (isPlaying.value) {
    oscillator.stop();
    isPlaying.value = false;
  } else {
    oscillator.start();
    isPlaying.value = true;
  }
};
</script>
