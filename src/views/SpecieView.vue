<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Specie } from '@/models/Specie'
import axios from 'axios'
import { useRoute } from 'vue-router'
import NotFoundView from '@/views/NotFoundView.vue'
import {IconLoader2} from '@tabler/icons-vue'
import SpecieDisplay from '@/components/SpecieDisplay.vue'

const route = useRoute();

const specie = ref<Specie| null | 'not_found'>(null);

onMounted(async () => {
  await loadSpecie(route.params.id as string)
})

async function loadSpecie(id: Number|string) {
  try{
    const response = await axios.get(`pokemon-species/${id}`)
    specie.value = response.data
  }catch (error){
    specie.value = 'not_found'
  }
}

</script>

<template>
  <NotFoundView v-if="specie == 'not_found'"/>
  <IconLoader2 v-else-if="specie == null" class="animate-spin h-40 m-auto"/>
  <SpecieDisplay v-else :specie="specie" class="m-auto"/>
</template>

<style scoped>

</style>