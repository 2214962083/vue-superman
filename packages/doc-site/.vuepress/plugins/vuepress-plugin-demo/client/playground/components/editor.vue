<script lang="ts">
export default defineComponent({
  name: 'Editor'
})
</script>
<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import {ref, toRefs, defineComponent} from 'vue'
import {useMonaco} from '../hooks/useMonaco'

const props = defineProps({
  model: null
})

const {model = ref(null)} = toRefs(props)

const target = ref()
useMonaco(target, {model})
</script>

<template>
  <div ref="target" style="width: 100%; height: 600px"></div>
</template>
