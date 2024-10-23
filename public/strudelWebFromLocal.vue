<template>
  <div id="strudel">
    <button id="play">Play</button>
    <button id="stop">Stop</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { initStrudel, getAudioContext } from '@strudel/web';
import * as Tone from 'tone';

onMounted(() => {
  initStrudel({
    prebake: () => samples('github:tidalcycles/dirt-samples'),
  });

  document.getElementById('play').addEventListener('click', () => {
    s("bd sd").play();
    let audioContext = getAudioContext();
    // Mute the listener
    audioContext.listener.setPosition(0, 0, 0);
    audioContext.listener.setOrientation(0, 0, -1, 0, 1, 0);
    audioContext.listener.upX.setValueAtTime(0, audioContext.currentTime);
    audioContext.listener.upY.setValueAtTime(0, audioContext.currentTime);
    audioContext.listener.upZ.setValueAtTime(0, audioContext.currentTime);

    console.log('Listener muted');
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
