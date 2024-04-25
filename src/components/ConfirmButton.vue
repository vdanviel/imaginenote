<template>
  <button @click="dissapate" class="bg-[#FDE767] hover:bg-[#f1da52] text-white font-bold py-2 px-4 rounded">
    {{ tittle }}
  </button>
</template>

<script setup>

    const emit = defineEmits(['func'])
    defineProps(['tittle'])

    const dissapate = () => {

        emit('func');

    }

</script>

