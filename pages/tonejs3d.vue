<template>
  <div>
    <h1>Tone.js 3D Sound Example</h1>
    <button @click="playSound">Play 3D Sound</button>
  </div>
</template>

<script setup>
import * as Tone from 'tone';
import { onMounted } from 'vue';

let synth;
let panner;

onMounted(() => {
  // Create the panner
  panner = new Tone.Panner3D({
    positionX: 1, // 1 is right, -1 would be left
    positionY: 0, // 0 is level with the listener
    positionZ: -1, // Negative values are in front, positive are behind
  }).toDestination();

  // Create the synth and connect it to the panner
  synth = new Tone.Synth().connect(panner);
});

const playSound = () => {
  synth.triggerAttackRelease('C4', 0.5);
};
</script>
