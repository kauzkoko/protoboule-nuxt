<template>
  <main class="ml-2px m-0 p-0 transform-gpu scale-90">
    <P5 id="p5canvas" />
  </main>
</template>

<script setup>
definePageMeta({
  layout: "custom",
});

let motion = false;
onMounted(() => {
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
});

const sketch1 = useP5((p5) => {
  let heads = [];

  class Dude {
    constructor(x = 0, y = 0) {
      this.x = x;
      this.y = y;
    }

    debug() {
      let safeMouseX = p5.constrain(p5.mouseX, 0, 400);
      console.log(safeMouseX);
    }

    display() {
      let safeMouseX, safeMouseY;
      if (motion && typeof p5.rotationY !== "undefined") {
        safeMouseY = p5.map(p5.rotationY, -30, 30, 0, p5.height);
      } else {
        safeMouseY = p5.constrain(p5.mouseY, 0, p5.height);
      }
      if (motion && typeof p5.rotationX !== "undefined") {
        safeMouseX = p5.map(p5.rotationX, -30, 30, 0, p5.width);
      } else {
        safeMouseX = p5.constrain(p5.mouseX, 0, p5.width);
      }
      p5.push();
      p5.strokeWeight(7);
      p5.rectMode(p5.CENTER);
      p5.translate(this.x - 25, this.y - 25);
      p5.scale(1 / 6);

      //head
      p5.fill(
        p5.map(safeMouseX, 0, p5.width, 255, 0),
        p5.map(safeMouseY, 0, p5.height, 255, 0),
        0
      );
      p5.ellipse(p5.width / 2, p5.height / 2, p5.width, p5.height);

      //left eye
      p5.fill(0);
      p5.rect(p5.width / 4, p5.map(safeMouseX, 0, p5.width, 100, 60), 50);
      p5.fill(255);
      p5.ellipse(p5.width / 4, p5.map(safeMouseX, 0, p5.width, 50, 10), 50);
      p5.fill(0);
      p5.ellipse(p5.width / 4, p5.map(safeMouseX, 0, p5.width, 50, 20), 20);

      p5.rect((p5.width / 4) * 3, 100, 50);
      p5.fill(255);
      p5.ellipse((p5.width / 4) * 3, 75, 75);
      p5.fill(0);
      p5.ellipse(
        (p5.width / 4) * 3,
        70,
        p5.map(safeMouseX, 0, p5.width, 50, 20)
      );

      p5.noFill();
      p5.bezier(
        (p5.width / 8) * 3,
        (p5.height / 8) * 3,
        p5.width / 16,
        p5.height / p5.map(safeMouseX, 0, p5.width, 16, 8),
        p5.width / p5.map(safeMouseX, 0, p5.width, 16, 8),
        p5.height / p5.map(safeMouseX, 0, p5.width, 1, 2),
        p5.width / 2,
        (p5.height / 8) * 3
      );

      p5.fill(0);
      p5.rect(
        p5.width / 2,
        (p5.height / 4) * p5.map(safeMouseX, 0, p5.width, 3, 2),
        300,
        50
      );
      p5.fill(255);
      p5.rect(
        p5.width / 2,
        (p5.height / 4) * p5.map(safeMouseX, 0, p5.width, 3, 2.5) - 10,
        250,
        20
      );
      p5.pop();
    }
  }

  p5.setup = () => {
    p5.angleMode(p5.DEGREES);
    p5.createCanvas(400, 400);
    for (let stepper = 10; stepper > 0; stepper--) {
      for (let xIndex = 1; xIndex < stepper; xIndex++) {
        for (let yIndex = 1; yIndex < stepper; yIndex++) {
          heads.push(
            new Dude(
              (xIndex * p5.width) / stepper,
              (yIndex * p5.height) / stepper
            )
          );
        }
      }
    }
  };

  p5.draw = () => {
    p5.background(255);
    p5.push();
    p5.translate(-10, -10);
    heads.forEach((head) => head.display());
    p5.pop();
  };
}, "p5canvas");
</script>

<style lang="scss">
html,
body,
#__nuxt {
  margin: 0 !important;
  padding: 0 !important;
}
</style>
