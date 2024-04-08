<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({name: { type: String, required: true }})

const color = computed(() => {
  switch(props.name?.toLowerCase()){
    case 'normal': return '#cac5be';
    case 'grass': return '#79c63a';
    case 'fire': return '#f1440f';
    case 'water': return '#82c0ff';
    case 'bug': return '#adbd21';
    case 'electric': return '#fcc73c';
    case 'rock': return '#bfa860';
    case 'dark': return '#543d2f';
    case 'fairy': return '#f7b9f7';
    case 'flying': return '#a1b0f7';
    case 'ground': return '#d4b358';
    case 'poison': return '#954796';
    case 'steel': return '#c0c0cd';
    case 'dragon': return '#7b63e6';
    case 'fighting': return '#863921';
    case 'ghost': return '#6262b4';
    case 'ice': return '#a9e9fd';
    case 'psychic': return '#ec4780';
    default: return '#ffffff';
  }
})
</script>

<template>
  <div :style="{backgroundColor: color}" class="uppercase rounded-full text-white">{{ name }}</div>
</template>

<style scoped>

</style>