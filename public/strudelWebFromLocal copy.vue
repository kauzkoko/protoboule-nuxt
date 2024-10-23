<template>
  <div id="strudel">
    <button id="play">Play</button>
    <button id="stop">Stop</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { initStrudel, getAudioContext } from '@strudel/web';


onMounted(() => {
  initStrudel({
    prebake: () => samples('github:tidalcycles/dirt-samples'),
  });

  document.getElementById('play').addEventListener('click', () => {
    s("bd sd").play();
    console.log(getAudioContext());
  });

  document.getElementById('stop').addEventListener('click', () => {
    hush();
  });

  console.log(getAudioContext());
});
</script>

<style scoped>
#strudel {
  width: 100%;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.loading {
  font-size: 1.2em;
  color: #666;
}
</style>
