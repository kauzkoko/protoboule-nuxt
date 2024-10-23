<template>
  <button @click="resize()">show</button>
  <P5 id="hey" />
  <P5 id="goblin" />
</template>

<script setup>
let motion = false;
const sketch1 = useP5((p5) => {
  p5.setup = () => {
    p5.createCanvas(400, 400);
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      document.body.addEventListener("click", function () {
        DeviceMotionEvent.requestPermission()
          .then(function () {
            console.log("DeviceMotionEvent enabled");

            motion = true;
          })
          .catch(function (error) {
            console.warn("DeviceMotionEvent not enabled", error);
          });
      });
    }
  };

  p5.draw = () => {
    p5.background(0);
    p5.fill(255);
    p5.ellipse(p5.mouseX, p5.mouseY, 50, 50);
    if (motion) {
      console.log(p5.rotationX, p5.rotationY);
    }
  };
}, "hey");

const resize = () => {
  sketch1.value.resizeCanvas(500, 500);
};
</script>
