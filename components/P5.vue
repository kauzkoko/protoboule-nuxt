<template>
  <ClientOnly>
    <div class="m-0 p-0" :id="id"></div>
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  id: String,
});
</script>
