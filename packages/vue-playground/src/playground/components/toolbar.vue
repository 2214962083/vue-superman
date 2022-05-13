<script lang="ts">
export default defineComponent({
  name: 'Toolbar'
})
</script>
<script setup lang="ts">
import {defineComponent, PropType} from 'vue'
import {LayoutDirection} from '../utils/types-helper'
import ControlButton from './control-button.vue'
import {
  EditorBottomPreviewTopIcon,
  EditorLeftPreviewRightIcon,
  EditorRightPreviewLeftIcon,
  EditorTopPreviewBottomIcon,
  HideCodeIcon,
  ShowCodeIcon,
  ExitFullscreenIcon,
  FullscreenIcon
} from './icon'

const props = defineProps({
  title: {
    type: String,
    default: 'Demo'
  },
  showCode: {
    type: Boolean,
    default: true
  },
  fullScreen: {
    type: Boolean,
    default: false
  },
  layoutDirection: {
    type: String as PropType<LayoutDirection>,
    default: 'EditorBottomPreviewTop' as LayoutDirection
  }
})

interface Emits {
  (e: 'update:layoutDirection', value: LayoutDirection): void
  (e: 'update:showCode', value: boolean): void
  (e: 'update:fullScreen', value: boolean): void
}

const emit = defineEmits<Emits>()

const layoutDirections: LayoutDirection[] = [
  'EditorBottomPreviewTop',
  'EditorRightPreviewLeft',
  'EditorTopPreviewBottom',
  'EditorLeftPreviewRight'
]

function handleDirectionIconClick(direction: LayoutDirection) {
  emit('update:layoutDirection', direction)
}

function handleVisibleCodeIconClick() {
  emit('update:showCode', !props.showCode)
}

function handleFullscreenIconClick() {
  emit('update:fullScreen', !props.fullScreen)
}
</script>
<template>
  <div class="vue-playground-toolbar">
    <div class="vue-playground-toolbar-title">{{ title }}</div>
    <div class="vue-playground-toolbar-spacer"></div>
    <div class="vue-playground-toolbar-actions">
      <ControlButton
        v-for="direction in layoutDirections"
        :key="direction"
        title="Toggle Layout"
        :active="layoutDirection === direction"
        @click="handleDirectionIconClick(direction)"
      >
        <EditorBottomPreviewTopIcon v-if="direction === 'EditorBottomPreviewTop'"></EditorBottomPreviewTopIcon>
        <EditorRightPreviewLeftIcon v-if="direction === 'EditorRightPreviewLeft'"></EditorRightPreviewLeftIcon>
        <EditorTopPreviewBottomIcon v-if="direction === 'EditorTopPreviewBottom'"></EditorTopPreviewBottomIcon>
        <EditorLeftPreviewRightIcon v-if="direction === 'EditorLeftPreviewRight'"></EditorLeftPreviewRightIcon>
      </ControlButton>
      <ControlButton title="Show/Hide Code Editor" @click="handleVisibleCodeIconClick">
        <HideCodeIcon v-if="showCode" />
        <ShowCodeIcon v-else />
      </ControlButton>
      <ControlButton title="Toggle fullscreen" @click="handleFullscreenIconClick">
        <ExitFullscreenIcon v-if="fullScreen" />
        <FullscreenIcon v-else />
      </ControlButton>
    </div>
  </div>
</template>

<style scoped>
.vue-playground-toolbar {
  top: 0;
  left: 0;
  z-index: 20;
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 15px;
  overflow: hidden;
  background-color: #f7f8f8;
  border-bottom: 1px solid #e5e7eb;
}

.vue-playground-toolbar-title {
  font-size: 12px;
  font-weight: 600;
}

.vue-playground-toolbar-spacer {
  flex: 1;
}

.vue-playground-toolbar-actions {
  display: flex;
  flex-shrink: 0;
  white-space: nowrap;
}

.vue-playground-toolbar-actions::v-deep .vue-playground-control-btn {
  margin-left: 8px;
}
</style>
