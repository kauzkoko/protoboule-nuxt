<template>
  <div id="strudel">
    <button id="play">play</button>
<button id="stop">stop</button>
  </div>
</template>

<script setup>
const { onLoaded } = useScriptNpm({
  packageName: '@strudel/web/dist/index.mjs',
  file: '/dist/index.js',
  version: '1.0.3',
})

onLoaded(() => {
  initStrudel({
  prebake: () => samples('github:tidalcycles/dirt-samples'),
});

document.getElementById('play').addEventListener('click', 
  () => s("bd sd").play()
)
})
</script>

<style scoped>
#strudel {
  width: 100%;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading {
  font-size: 1.2em;
  color: #666;
}
</style>
