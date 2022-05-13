<script lang="ts">
export default defineComponent({
  name: 'ControlButton'
})
</script>
<script setup lang="ts">
import {defineComponent} from 'vue'

defineProps({
  title: {
    type: String
  },
  active: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <div
    role="button"
    :title="title"
    class="vue-playground-control-btn"
    :class="{'vue-playground-toolbar-direction-active': active}"
  >
    <slot></slot>
  </div>
</template>
<style scoped>
.vue-playground-control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  font-size: 12px;
  color: #656666;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #c5c7c8;
  border-radius: 4px;
  box-shadow: 0 4px 6px -1px rgb(0, 0, 0, 0.1), 0 2px 4px -2px rgb(0, 0, 0, 0.1);
}

.vue-playground-control-btn.vue-playground-toolbar-direction-active {
  color: #584984;
  border: 1px solid #584984;
}
</style>
