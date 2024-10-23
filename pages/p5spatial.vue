<template>
  <main class="w-full h-full flex justify-center items-center">
    <P5 id="hey" />
  </main>
  <button @click="playSound()">play</button>
</template>

<script setup>
let soundSource, spatializer;
const sketch1 = useP5((p5) => {
  p5.preload = () => {
    soundSource = p5.loadSound("/doorbell.mp3");
  };

  p5.setup = () => {
    p5.createCanvas(400, 400);
    spatializer = new p5.Panner3D();
    // soundSource.loop();
    // soundSource.disconnect();
    // soundSource.connect(spatializer);
    // spatializer.set(10, 0, 0);
  };

  p5.draw = () => {
    p5.background(0);
    p5.fill(255);
    p5.ellipse(p5.mouseX, p5.mouseY, 50, 50);
  };
}, "hey");

const playSound = () => soundSource.play();
</script>
