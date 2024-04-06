<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios'

axios.defaults.baseURL = 'https://pokeapi.co/api/v2/'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>