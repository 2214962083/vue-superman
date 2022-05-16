<script lang="ts">
export default defineComponent({
  name: 'Loading'
})
</script>
<script setup lang="ts">
import {defineComponent} from 'vue'
import {LoadingIcon} from './icon'
</script>
<template>
  <div class="vue-playground-loading">
    <LoadingIcon class="vue-playground-loading-icon" />
  </div>
</template>
<style scoped>
.vue-playground-loading {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--theme-color);
  background-color: var(--bg-color);
}
.vue-playground-loading-icon {
  width: 30%;
  max-width: 40px;
  height: 30%;
  max-height: 40px;
  animation: loadingCircle 1s infinite linear;
}

@keyframes loadingCircle {
  to {
    transform: rotate(360deg);
  }
}
</style>
