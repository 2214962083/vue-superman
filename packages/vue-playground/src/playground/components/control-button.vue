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
  color: var(--toolbar-icon-color);
  cursor: pointer;
  background-color: var(--toolbar-icon-bg-color);
  border: 1px solid var(--toolbar-icon-color);
  border-radius: 4px;
  box-shadow: 0 4px 6px -1px rgb(0, 0, 0, 0.1), 0 2px 4px -2px rgb(0, 0, 0, 0.1);
}

.vue-playground-control-btn.vue-playground-toolbar-direction-active {
  color: var(--toolbar-icon-active-color);
  border: 1px solid var(--toolbar-icon-active-color);
}
</style>
