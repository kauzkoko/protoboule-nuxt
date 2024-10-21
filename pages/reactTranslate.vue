<template>
	  <div>
		<h1>3D Audio Player</h1>
		<audio 
		  ref="audioRef" 
		  src="/doorbell.mp3" 
		  preload="auto" 
		  crossOrigin="anonymous"
		/>
		<button @click="handlePlayPause">
		  {{ isPlaying ? 'Pause' : 'Play' }}
		</button>
	  </div>
  </template>
  
  <script setup lang="ts">  
  const audioRef = ref<HTMLAudioElement | null>(null);
  const audioContextRef = ref<AudioContext | null>(null);
  const pannerRef = ref<PannerNode | null>(null);
  const isPlaying = ref(false);
  
  const initializeAudio = () => {
	const audioElement = audioRef.value;
	if (!audioElement) return;
  
	const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
	const audioContext = new AudioContext();
	const source = audioContext.createMediaElementSource(audioElement);
  
	const panner = audioContext.createPanner();
	panner.panningModel = 'HRTF';
	panner.distanceModel = 'inverse';
  
	panner.positionX.setValueAtTime(10, audioContext.currentTime);
	panner.positionY.setValueAtTime(0, audioContext.currentTime);
	panner.positionZ.setValueAtTime(2, audioContext.currentTime);
  
	source.connect(panner);
	panner.connect(audioContext.destination);
  
	audioContextRef.value = audioContext;
	pannerRef.value = panner;
  };
  
  const handlePlayPause = () => {
	const audioElement = audioRef.value;
	const audioContext = audioContextRef.value;
  
	if (audioElement && audioContext) {
	  if (audioContext.state === 'suspended') {
		audioContext.resume();
	  }
  
	  if (isPlaying.value) {
		audioElement.pause();
	  } else {
		audioElement.play();
	  }
	  isPlaying.value = !isPlaying.value;
	}
  };
  
  onMounted(() => {
	initializeAudio();
  });
  
  onBeforeUnmount(() => {
	if (audioContextRef.value) {
	  audioContextRef.value.close();
	}
  });
  </script>