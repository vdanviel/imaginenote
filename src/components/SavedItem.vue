<template>
  
    <div v-if="show" class="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg">
      <div @click="close_alert">
        <span class="mr-2">Salvo</span>
        <svg class="h-6 w-6 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
    </div>

</template>

<script scoped>
    import { ref } from "vue";

    const show = ref(true);

    
</script>
