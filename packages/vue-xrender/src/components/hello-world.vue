<template>
  <div class="current-page">
    <h1>vue3 setup 例子</h1>
    <div>time：{{ time }}s</div>
    <br />
    <stop-button stop-text="停止计时器" @stop="handleStopClick"></stop-button>
    <br />
    <a target="blank" href="https://v3.cn.vuejs.org/api/sfc-script-setup.html#%E5%9F%BA%E6%9C%AC%E8%AF%AD%E6%B3%95">
      查看 setup 语法文档
    </a>
  </div>
</template>
<script lang="ts" setup>
import {ref, getCurrentInstance} from 'vue-demi'

const instance = getCurrentInstance()?.proxy

const time = ref(0)
const _timeId = setInterval(() => {
  time.value++
}, 1000)

function handleStopClick() {
  console.log('stop', instance)
  clearInterval(_timeId)
}
</script>
