<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios'
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

axios.defaults.baseURL = 'https://pokeapi.co/api/v2/'

onMounted(() => {
  initFlowbite()
})

</script>

<template>
  <header class="bg-red-500 flex gap-4 text-white p-2">
    <h1 class="uppercase font-bold">Pokedex</h1>
    <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav>
  </header>

  <RouterView class="py-2 px-4" />
</template>