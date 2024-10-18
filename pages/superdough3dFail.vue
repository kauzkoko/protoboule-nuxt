<template>
  <div>
    <h1>Superdough Minimal Example</h1>
    <button @click="playLoop" :disabled="isPlaying">Play Loop</button>
    <button @click="stopLoop" :disabled="!isPlaying">Stop Loop</button>
    <button @click="startRecording" :disabled="isRecording">Start Recording</button>
    <button @click="stopRecording" :disabled="!isRecording">Stop Recording</button>
    <audio ref="audioElement" autoplay></audio>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { superdough, samples, initAudioOnFirstClick, registerSynthSounds, getAudioContext } from 'superdough';

const isPlaying = ref(false);
const isRecording = ref(false);
let loopInterval;
const audioElement = ref(null);
let mediaRecorder;
let recordedChunks = [];

onMounted(async () => {
  await Promise.all([
    initAudioOnFirstClick(),
    samples('github:tidalcycles/dirt-samples'),
    registerSynthSounds(),
  ]);

  const audioContext = getAudioContext();

// Step 2: Create a MediaStreamAudioDestinationNode
const destination = audioContext.createMediaStreamDestination();

// Step 3: Connect your existing audio nodes to the destination
// Assuming you have a source node (e.g., a buffer, media element source, etc.)
const sourceNode = audioContext.createBufferSource(); // Example: Replace with your real source
sourceNode.connect(destination);

// Step 4: Configure the existing <audio> element
audioElement.value.srcObject = destination.stream;
audioElement.value.controls = true; // Optional: Display controls

// Step 5: Start the audio source if needed
sourceNode.start(); // Optional: Replace with your real control logic

// Set up MediaRecorder
mediaRecorder = new MediaRecorder(destination.stream);
mediaRecorder.ondataavailable = handleDataAvailable;
mediaRecorder.onstop = handleStop;
});

const handleDataAvailable = (event) => {
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
  }
};

const handleStop = () => {
  const blob = new Blob(recordedChunks, {
    type: 'audio/webm; codecs=opus'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  a.href = url;
  a.download = 'superdough-recording.webm';
  a.click();
  window.URL.revokeObjectURL(url);
};

const startRecording = () => {
  recordedChunks = [];
  mediaRecorder.start();
  isRecording.value = true;
};

const stopRecording = () => {
  mediaRecorder.stop();
  isRecording.value = false;
};

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
