<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import type { Specie } from '@/models/Specie'
import type { Pokemon } from '@/models/Pokemon'
import {IconLoader2} from '@tabler/icons-vue'

const props = defineProps({
  'specieId': { required: true, type: [Number,String] }
})

let specie = ref<Specie | null>(null)
let pokemon = ref<Pokemon | null>(null)

onMounted(async () => {
  await loadSpecie(props.specieId)
  await loadPokemon(specie.value)
})

async function loadSpecie(id: Number|string) {
  const response = await axios.get<Specie>(`pokemon-species/${id}`)
  specie.value = await response.data
}

async function loadPokemon(specie: Specie|null) {
  if(specie == null) return;

  const response = await axios.get(specie.varieties[0].pokemon.url)
  pokemon.value = await response.data
}

</script>

<template>
  <div class="text-center border rounded">
    <div v-if="specie && pokemon">{{ specie.name }}
      <img :src="pokemon.sprites.front_default" alt="{{pokemon.name}} sprite" class="m-auto"/>
    </div>
    <IconLoader2 v-else :size="48" class="m-auto animate-spin"/>
  </div>
</template>

<style scoped>

</style>