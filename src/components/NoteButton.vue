<template>
  <div class="relative w-10 h-10 rounded-full border-[4px] border-black flex justify-center items-center m-[10px]">
    
    <p class="text-black text-center font-bold">
        {{note}}
    </p>

  </div>
</template>

<script setup>
  import { defineProps } from "vue";

  const { note } = defineProps(["note"]);
</script>

<style scoped>
  /* Adicione estilos conforme necessário */
</style>
