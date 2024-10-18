<template>
  <div>
    <NuxtLink to="/" class="home-link">
      <div class="ellipse"></div>
    </NuxtLink>
    <div class="content">
      <NuxtPage />
    </div>
  </div>
</template>

<style scoped>
.home-link {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1000;
}

.ellipse {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ffcccb;
}

.content {
  padding-top: 50px;
  padding-left: 50px;
}
</style>
