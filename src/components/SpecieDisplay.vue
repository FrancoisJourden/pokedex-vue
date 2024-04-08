<script setup lang="ts">
import type { Specie } from '@/models/Specie'
import { onMounted, type PropType, ref } from 'vue'
import axios, { type AxiosResponse } from 'axios'
import type { Pokemon } from '@/models/Pokemon'
import type { Form } from '@/models/Form'
import TypeIcon from '@/components/TypeIcon.vue'
import {IconLoader2} from '@tabler/icons-vue'

const props = defineProps({ 'specie': { required: true, type: Object as PropType<Specie> } })
const varieties = ref<{ pokemon: Pokemon, form: Form }[] | null>(null)

onMounted(async () => {
  await loadVarieties()
})

async function loadVarieties() {
  const requests: Array<Promise<AxiosResponse>> = []

  props.specie?.varieties.forEach(variety => {
    let request = axios.get(variety.pokemon.url)
    request.then(async result => {
      let pokemon: Pokemon = result.data

      const formRequest = await axios.get(pokemon.forms[0].url)
      let form: Form = formRequest.data

      if (varieties.value == null) varieties.value = []
      varieties.value?.push({ pokemon, form })

    })

    requests.push(request)
  })

  await Promise.all(requests)
}
</script>

<template>
  <div v-if="varieties" class="w-fit text-center">
    <h1 class="text-xl capitalize font-bold">{{ props.specie.name }}</h1>
    <div class="flex gap-4 text-center">
      <div v-for="variety in varieties" :key="variety.pokemon.id">
        <div class="m-auto flex flex-col gap-2">
          <img :src="variety.pokemon.sprites.front_default" :alt="variety.pokemon.name" />
          <p v-if="!variety.form.form_name" class="capitalize">default</p>
          <p v-else class="capitalize">{{ variety.form.form_name }}</p>
            <TypeIcon v-for="type in variety.pokemon.types" :key="type.type.name" :name="type.type.name" />
        </div>
      </div>
    </div>
  </div>
  <IconLoader2 v-else class="h-40"/>
</template>

<style scoped>

</style>