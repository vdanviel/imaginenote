<template>
    <!-- Modal backdrop -->
    <div v-show="modal" class="fixed inset-0 flex items-center justify-center bg-[#f1eb1a40] bg-opacity-50">
        <!-- Modal content -->
        <div class="max-w-sm rounded-lg bg-white p-8">
            <h2 class="mb-4 text-xl font-bold">{{props.tittle}}</h2>
            <p class="text-gray-700">{{props.desc}}</p>
            <!-- Botão de fechar o modal -->
            <button @click="close_modal" class="mt-4 rounded-md bg-[#fde767] px-4 py-2 text-black focus:outline-none">Fechar</button>
        </div>
    </div>

</template>

<script setup>

    import { defineProps, ref } from "vue";

    const props = defineProps(['tittle', 'desc']);

    const modal = ref(true);

    const close_modal = modal.value = false;


</script>
