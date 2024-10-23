<template>
  <div id="strudel">
  </div>
</template>

<script setup>
useScriptNpm({
  packageName: '@strudel/embed',
  file: 'embed.js',
  version: '1.1.0',
})
onMounted(() => {
	let editor = document.createElement('strudel-repl');
  editor.setAttribute(
    'code',
    `setcps(1)
n("<0 1 2 3 4>*8").scale('G4 minor')
.s("gm_lead_6_voice")
.clip(sine.range(.2,.8).slow(8))
.jux(rev)
.room(2)
.sometimes(add(note("12")))
.lpf(perlin.range(200,20000).slow(4))`,
  );
  document.getElementById('strudel').append(editor);
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
