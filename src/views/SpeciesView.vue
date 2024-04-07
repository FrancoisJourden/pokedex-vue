<script setup lang="ts">

import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import PokemonCard from '@/components/PokemonCard.vue'
import { IconLoader2 } from '@tabler/icons-vue'
import PageSelector from '@/components/PageSelector.vue'

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

watch(currentPageNumber, loadSpecies)

</script>

<template>
  <div class="max-w-7xl m-auto flex flex-col gap-2">
    <div>
      <select v-model="pageLength" @change="loadSpecies" class="px-2">
        <option v-for="i in 5" :value="20 * i" :key="i">{{ 20 * i }}</option>
      </select> Species per page
    </div>
    <div v-if="species" class="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      <PokemonCard v-for="(specie, index) in species" :key="index" :specie-id="specie.name.toString()" />
    </div>
    <IconLoader2 v-else :size="48" class="m-auto animate-spin" />
    <PageSelector v-if="totalCount" v-model="currentPageNumber" :max-page="pageCount()" />
  </div>
</template>