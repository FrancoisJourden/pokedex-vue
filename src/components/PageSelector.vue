<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  'maxPage': { required: true, type: Number },
  'modelValue': { required: true, type: Number, default: 1 }
})

const emit = defineEmits(['update:modelValue',])

const pages = computed(() => {
  const res: Array<number | '...'> = []
  for (let i: number = 1; i <= props.maxPage; i++) {
    if (i == 1) res.push(i)
    else if (i == props.maxPage) res.push(i)
    else if ((i > props.modelValue - 2 && i < props.modelValue + 2)) res.push(i)
    else if (i == 2) res.push('...')
    else if (i == props.maxPage - 1) res.push('...')
  }
  return res
})

</script>

<template>
  <div class="flex gap-2 m-auto w-fit">
    <button v-if="modelValue != 1" class="text-blue-600 hover:underline" @click="
  emit('update:modelValue', modelValue-1);">&lt;&lt;</button>
    <div v-for="page in pages" :key="page">
      <div v-if="page == '...' || page == props.modelValue">{{ page }}</div>
      <button v-else class="text-blue-600 hover:underline" @click="
  emit('update:modelValue', page);">{{ page }}</button>
    </div>
    <button v-if="modelValue != maxPage" class="text-blue-600 hover:underline" @click="
  emit('update:modelValue', modelValue+1);">&gt;&gt;</button>
  </div>
</template>

<style scoped>

</style>