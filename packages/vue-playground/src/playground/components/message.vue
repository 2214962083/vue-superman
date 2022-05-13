<script lang="ts">
export default defineComponent({
  name: 'Message'
})
</script>
<script setup lang="ts">
import {defineComponent, ref, watch} from 'vue'
import {CompilerError} from 'vue/compiler-sfc'

const props = defineProps({
  err: null,
  warn: null
})

const dismissed = ref(false)

watch(
  () => [props.err, props.warn],
  () => {
    dismissed.value = false
  }
)

function formatMessage(err: string | Error): string {
  if (typeof err === 'string') {
    return err
  } else {
    let msg = err.message
    const loc = (err as CompilerError).loc
    if (loc && loc.start) {
      msg = `(${loc.start.line}:${loc.start.column}) ` + msg
    }
    return msg
  }
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="!dismissed && (err || warn)"
      class="vue-playground-msg"
      :class="err ? 'vue-playground-msg-err' : 'vue-playground-msg-warn'"
    >
      <pre>{{ formatMessage(err || warn) }}</pre>
      <button class="vue-playground-dismiss" @click="dismissed = true">✕</button>
    </div>
  </Transition>
</template>

<style scoped>
.vue-playground-msg {
  position: absolute;
  right: 8px;
  bottom: 0;
  left: 8px;
  z-index: 10;
  display: flex;
  align-items: stretch;
  min-height: 40px;
  max-height: calc(100% - 300px);
  margin-bottom: 8px;
  font-family: var(--font-code);
  white-space: pre-wrap;
  border: 2px solid transparent;
  border-radius: 6px;
}

.vue-playground-msg pre {
  padding: 12px 20px;
  margin: 0;
  overflow: scroll;
}

.vue-playground-dismiss {
  position: absolute;
  top: 2px;
  right: 2px;
  display: block;
  width: 18px;
  height: 18px;
  padding: 0;
  font-size: 9px;
  line-height: 18px;
  color: #fff;
  text-align: center;
  background-color: red;
  border-radius: 9px;
}

@media (max-width: 720px) {
  .vue-playground-dismiss {
    top: -9px;
    right: -9px;
  }
  .vue-playground-msg {
    bottom: 50px;
  }
}

.vue-playground-msg-err {
  color: red;
  background-color: #ffd7d7;
  border-color: red;
}

.vue-playground-msg-warn {
  --color: rgb(105, 95, 27);
  color: var(--color);
  background-color: rgb(247, 240, 205);
  border-color: var(--color);
}

.vue-playground-msg-warn .vue-playground-dismiss {
  background-color: var(--color);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.15s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(0, 10px);
}
</style>
