<template>
    <div class="bg-yellow-200 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
        <p class="font-bold">{{tittle}}</p>
        <p>{{desc}}</p>
    </div>
</template>

<script setup>

    import { defineProps } from "vue";

    defineProps(['tittle', 'desc']);

</script>