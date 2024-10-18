<template>
  <div>
    <h1>Tone.js Example</h1>
    <button @click="playSound">Play Sound</button>
  </div>
</template>

<script setup>
import * as Tone from 'tone';

let synth;

onMounted(() => {
  synth = new Tone.Synth().toDestination();
});

const playSound = () => {
  synth.triggerAttackRelease('C4', 20);
};
</script>
