<script setup lang="ts">

import { onMounted, ref } from 'vue'
import axios from 'axios'
import PokemonCard from '@/components/PokemonCard.vue'
import { IconLoader2 } from '@tabler/icons-vue'

const totalCount = ref<number | null>(null)
const species = ref<Array<{ name: String, url: string }> | null>(null)

const pageLength = ref<number>(20)
const currentPageNumber = ref<number>(1)


onMounted(() => {
  loadSpecies()
})

async function loadSpecies() {
  species.value = null

  const offset = (currentPageNumber.value - 1) * (pageLength.value)

  const response = await axios.get(`pokemon-species?limit=${pageLength.value}&offset=${offset}`, {})
  let data = await response.data

  totalCount.value = data.count
  species.value = data.results
}

function pageCount(): number {
  if (totalCount.value == null || pageLength.value == null) return 0
  return Math.trunc(totalCount.value / pageLength.value) + (totalCount.value % pageLength.value > 0 ? 1 : 0)
}

</script>

<template>
  <div class="max-w-7xl m-auto">
    <div>
      Quantity: <select v-model="pageLength" @change="loadSpecies">
      <option v-for="i in 5" :value="20 * i" :key="i">{{ 20 * i }}</option>
    </select>
      Page: <select v-if="totalCount" v-model="currentPageNumber" @change="loadSpecies">
      <option v-for="i in pageCount()" :value="i" :key="i">{{ i }}</option>
    </select>
    </div>
    <div v-if="species" class="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      <PokemonCard v-for="(specie, index) in species" :key="index" :specie-id="specie.name.toString()" />
    </div>
    <IconLoader2 v-else :size="48" class="m-auto animate-spin" />
  </div>
</template>