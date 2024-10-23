<template>
  <div>
    <h1>Welcome to My Nuxt 3 App with Strudel</h1>
    <button @click="startPattern">Start</button>
    <button @click="stopPattern">Stop</button>
    <div>
      <label for="pattern-input">Enter a Strudel pattern:</label>
      <input id="pattern-input" v-model="patternInput" @keyup.enter="updatePattern" />
      <button @click="updatePattern">Update Pattern</button>
    </div>
    <div>
      <label for="bpm-input">BPM:</label>
      <input id="bpm-input" type="number" v-model="bpm" @change="updateBPM" />
    </div>
  </div>
</template>

<script setup>
import { repl, note, s } from "@strudel/core";
import { initAudioOnFirstClick, getAudioContext, webaudioOutput } from "@strudel/webaudio";

const patternInput = ref('note("c3", ["eb3", "g3"]).s("sawtooth")');
const bpm = ref(120);
let scheduler;

onMounted(() => {
  initAudioOnFirstClick();
  const ctx = getAudioContext();

  ({ scheduler } = repl({
    defaultOutput: webaudioOutput,
    getTime: () => ctx.currentTime
  }));

  updatePattern();
});

const startPattern = () => {
  scheduler.start();
};

const stopPattern = () => {
  scheduler.stop();
};

const updatePattern = () => {
  try {
    const pattern = eval(patternInput.value);
    scheduler.setPattern(pattern);
  } catch (error) {
    console.error("Invalid pattern:", error);
  }
};

const updateBPM = () => {
  scheduler.setTempo(bpm.value);
};
</script>

<style scoped>
div {
  margin-bottom: 1rem;
}
button {
  margin-right: 0.5rem;
}
input {
  margin-right: 0.5rem;
}
</style>
