<script setup lang="ts">
import {usePageFrontmatter} from '@vuepress/client'
import {isArray} from '@vuepress/shared'
import {DefaultThemeHomePageFrontmatter} from '@vuepress/theme-default'
import {computed} from 'vue'
import AutoLink from '@vuepress/theme-default/lib/client/components/AutoLink.vue'

interface HomePageFormatter extends DefaultThemeHomePageFrontmatter {
  features?: {
    title: string
    details: string
    link: string
  }[]
}

const frontmatter = usePageFrontmatter<HomePageFormatter>()
const features = computed(() => {
  if (isArray(frontmatter.value.features)) {
    return frontmatter.value.features
  }
  return []
})
</script>

<template>
  <div v-if="features.length" class="features">
    <div v-for="feature in features" :key="feature.title" class="feature">
      <AutoLink
        :item="{
          text: feature.title,
          link: feature.link || './'
        }"
      >
        <h2>{{ feature.title }}2</h2>
      </AutoLink>
      <p>{{ feature.details }}</p>
    </div>
  </div>
</template>
