<template>
  <div>
    <h1>Audio Player with Recording</h1>
    <button @click="handlePlayPause">
      {{ isPlaying ? 'Pause' : 'Play' }}
    </button>
    <button @click="startRecording" :disabled="isRecording">Start Recording</button>
    <button @click="stopRecording" :disabled="!isRecording">Stop Recording</button>
    <audio ref="audioElement" controls></audio>
  </div>
</template>

<script setup lang="ts">
import { initStrudel, getAudioContext } from '@strudel/web'
import { ref, onMounted } from 'vue'

const audioContextRef = ref<AudioContext | null>(null);
const isPlaying = ref(false);
const audioElement = ref<HTMLAudioElement | null>(null);
const isRecording = ref(false);
let mediaRecorder: MediaRecorder | null = null;
let audioChunks: Blob[] = [];

const initializeAudio = () => {
  audioContextRef.value = getAudioContext();
};

const handlePlayPause = () => {
  if (isPlaying.value) {
    hush()
  } else {
    s('bd sd').play()
  }
  isPlaying.value = !isPlaying.value
};

const startRecording = () => {
  if (!audioContextRef.value) return;

  const dest = audioContextRef.value.createMediaStreamDestination();

  // Create a GainNode to act as an intermediate node for recording
  const recordingGain = audioContextRef.value.createGain();
  recordingGain.gain.value = 5;

  // Connect the recording gain node to both the main output and the recording destination
  recordingGain.connect(audioContextRef.value.destination);
  recordingGain.connect(dest);

  // You'll need to connect your audio source to this recordingGain node
  // For example: yourAudioSource.connect(recordingGain);

  mediaRecorder = new MediaRecorder(dest.stream);
  mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    const audioURL = URL.createObjectURL(audioBlob);
    if (audioElement.value) {
      audioElement.value.src = audioURL;
    }
    isRecording.value = false;
    audioChunks = [];

    // Disconnect the recording gain node when stopping
    recordingGain.disconnect();
  };

  mediaRecorder.start();
  isRecording.value = true;
  console.log('Recording started...');
};

const stopRecording = () => {
  if (mediaRecorder && isRecording.value) {
    mediaRecorder.stop();
    console.log('Recording stopped.');
  }
};

onMounted(async () => {
  await initStrudel({
    prebake: () => samples('github:tidalcycles/dirt-samples'),
  })
  initializeAudio();
});
</script>
