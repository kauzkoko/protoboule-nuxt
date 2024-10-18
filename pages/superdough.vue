<template>
  <div>
    <h1>Superdough Minimal Example</h1>
    <button @click="playLoop" :disabled="isPlaying">Play Loop</button>
    <button @click="stopLoop" :disabled="!isPlaying">Stop Loop</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { superdough, samples, initAudioOnFirstClick, registerSynthSounds } from 'superdough';

const isPlaying = ref(false);
let loopInterval;

onMounted(async () => {
  await Promise.all([
    initAudioOnFirstClick(),
    samples('github:tidalcycles/dirt-samples'),
    registerSynthSounds(),
  ]);
});

const loop = (t = 0) => {
  // Kick drum
  superdough({ s: 'bd' }, t);
  // Snare
  superdough({ s: 'sd', room: 0.5 }, t + 0.5);
  // Hi-hat
  superdough({ s: 'hh' }, t + 0.25);
  superdough({ s: 'hh' }, t + 0.75);
  // Sawtooth synth
  superdough({ note: 'g2', s: 'sawtooth', cutoff: 600, resonance: 8 }, t, 0.125);
  superdough({ note: 'c3', s: 'sawtooth', cutoff: 600, resonance: 8 }, t + 0.5, 0.125);
};

const playLoop = () => {
  if (isPlaying.value) return;
  isPlaying.value = true;
  let t = 0;
  loopInterval = setInterval(() => {
    loop(t);
    t += 1;
  }, 1000); // 1 second interval (60 BPM)
};

const stopLoop = () => {
  if (!isPlaying.value) return;
  isPlaying.value = false;
  clearInterval(loopInterval);
};
</script>
