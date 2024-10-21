<template>
  <div>
    <h1>Welcome to My Nuxt 3 App with Strudel</h1>
    <button @click="playPattern">Play</button>
    <button @click="stopPattern">Stop</button>
    <button @click="startRecording" :disabled="isRecording">Start Recording</button>
    <button @click="stopRecording" :disabled="!isRecording">Stop Recording</button>
    <a v-if="recordingUrl" :href="recordingUrl" download="recording.webm">Download Recording</a>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { initStrudel, evaluate, hush } from '@strudel/web/dist/index.mjs';

const audioContext = ref(null);
const audioStream = ref(null);
const mediaRecorder = ref(null);
const recordedChunks = ref([]);
const isRecording = ref(false);
const recordingUrl = ref(null);

onMounted(() => {
  audioContext.value = new (window.AudioContext || window.webkitAudioContext)();
  initStrudel({
    prebake: () => samples('github:tidalcycles/dirt-samples'),
  });

  // Create a custom audio node to capture Strudel's output
  const captureNode = audioContext.value.createGain();
  captureNode.connect(audioContext.value.destination);

  // Create a MediaStreamDestination to capture the audio
  const destination = audioContext.value.createMediaStreamDestination();
  captureNode.connect(destination);
  audioStream.value = destination.stream;

  // Monkey-patch the audioContext.createGain method to intercept Strudel's output
  const originalCreateGain = audioContext.value.createGain;
  audioContext.value.createGain = function() {
    const gainNode = originalCreateGain.apply(this, arguments);
    const originalConnect = gainNode.connect;
    gainNode.connect = function(destination) {
      originalConnect.call(this, captureNode);
      return originalConnect.apply(this, arguments);
    };
    return gainNode;
  };
});

const playPattern = () => {
  evaluate('note("c a f e").jux(rev)');
};

const stopPattern = () => {
  hush();
};

const startRecording = () => {
  recordedChunks.value = [];
  mediaRecorder.value = new MediaRecorder(audioStream.value);
  
  mediaRecorder.value.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.value.push(event.data);
    }
  };

  mediaRecorder.value.onstop = () => {
    const blob = new Blob(recordedChunks.value, { type: 'audio/webm' });
    recordingUrl.value = URL.createObjectURL(blob);
  };

  mediaRecorder.value.start();
  isRecording.value = true;
};

const stopRecording = () => {
  if (mediaRecorder.value && isRecording.value) {
    mediaRecorder.value.stop();
    isRecording.value = false;
  }
};
</script>
