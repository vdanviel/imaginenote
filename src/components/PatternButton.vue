<template>
  <button @click="dissapate" class="bg-transparent text-gray-400 border-gray-400 border-[3px] font-bold py-2 px-4 rounded">
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

