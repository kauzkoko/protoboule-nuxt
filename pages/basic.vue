<template>
  <div>
    <h1>Welcome to My Nuxt 3 App with Strudel</h1>
    <button @click="playPattern">Play</button>
    <button @click="stopPattern">Stop</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { initStrudel, evaluate, hush } from '@strudel/web';

onMounted(() => {
  initStrudel({
    prebake: () => samples('github:tidalcycles/dirt-samples'),
  });
});

const playPattern = () => {
  evaluate('note("c a f e").jux(rev)');
};

const stopPattern = () => {
  hush();
};
</script>

