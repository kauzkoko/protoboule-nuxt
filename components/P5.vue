<template>
  <ClientOnly>
    <div class="m-0 p-0 transform-gpu scale-80" :id="id"></div>
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  id: String,
});
</script>
