<template>
  <div>
    <h1>Tone.js 3D Sound Example</h1>
    <button @click="toggleSound">{{ isPlaying ? 'Stop Sound' : 'Start Sound' }}</button>
    <p>Move your mouse horizontally to change the sound position</p>
    <div>
      <label for="volume1">Volume 1:</label>
      <input type="range" id="volume1" v-model="volume1" min="-60" max="0" step="1">
      <span>{{ volume1 }} dB</span>
      <button @click="resetVolume(1)">Reset</button>
    </div>
    <div>
      <label for="volume2">Volume 2:</label>
      <input type="range" id="volume2" v-model="volume2" min="-60" max="0" step="1">
      <span>{{ volume2 }} dB</span>
      <button @click="resetVolume(2)">Reset</button>
    </div>
    <div class="grid">
      <div class="panner-indicator" :style="panner1Style"></div>
      <div class="panner-indicator panner2" :style="panner2Style"></div>
    </div>
  </div>
</template>

<script setup>
import * as Tone from 'tone';
import { ref, onMounted, watch, computed } from 'vue';

let noiseSource1;
let noiseSource2;
let panner1;
let panner2;
const isPlaying = ref(false);
const volume1 = ref(-20);
const volume2 = ref(-20);
const panner1X = ref(0);
const panner1Y = ref(0);
const panner2X = ref(-10);
const panner2Y = ref(10);

const { x, y } = useMouse();

const panner1Style = computed(() => {
  const left = ((panner1X.value + 10) / 20) * 100;
  const top = ((panner1Y.value + 10) / 20) * 100;
  return {
    left: `${left}%`,
    top: `${top}%`
  };
});

const panner2Style = computed(() => {
  const left = ((panner2X.value + 10) / 20) * 100;
  const top = ((panner2Y.value + 10) / 20) * 100;
  return {
    left: `${left}%`,
    top: `${top}%`
  };
});

onMounted(() => {
  // Create the panners
  panner1 = new Tone.Panner3D({
    positionX: panner1X.value,
    positionY: panner1Y.value,
    positionZ: 0,
  }).toDestination();

  panner2 = new Tone.Panner3D({
    positionX: panner2X.value,
    positionY: panner2Y.value,
    positionZ: 0,
  }).toDestination();

  // Create the first noise source (original)
  noiseSource1 = new Tone.Noise({
    type: "white",
    volume: volume1.value
  }).connect(panner1);

  // Create the second noise source
  noiseSource2 = new Tone.Noise({
    type: "white",
    volume: volume2.value
  }).connect(panner2);

  // Watch for changes in mouse X position
  watch([x, y], ([newX, newY]) => {
    panner1X.value = (newX / window.innerWidth) * 20 - 10;
    panner1Y.value = (newY / window.innerHeight) * 20 - 10;
    panner1.positionX.value = panner1X.value;
    panner1.positionY.value = panner1Y.value;
  });

  // Watch for changes in volume
  watch(volume1, (newVolume) => {
    noiseSource1.volume.rampTo(newVolume, 0.1);
  });

  watch(volume2, (newVolume) => {
    noiseSource2.volume.rampTo(newVolume, 0.1);
  });
});

const toggleSound = async () => {
  await Tone.start();
  if (isPlaying.value) {
    noiseSource1.stop();
    noiseSource2.stop();
    isPlaying.value = false;
  } else {
    noiseSource1.start();
    noiseSource2.start();
    isPlaying.value = true;
  }
};

const resetVolume = (sourceNumber) => {
  if (sourceNumber === 1) {
    volume1.value = -20;
  } else if (sourceNumber === 2) {
    volume2.value = -20;
  }
};
</script>

<style scoped>
.grid {
  width: 300px;
  height: 300px;
  border: 1px solid #000;
  position: relative;
  margin-top: 20px;
}

.panner-indicator {
  width: 20px;
  height: 20px;
  background-color: black;
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}

.panner2 {
  background-color: blue;
}
</style>
