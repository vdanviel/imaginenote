<template>
    <p class="font-bold text-red-500">{{tittle}}</p>
</template>

<script setup>

    import { defineProps } from "vue";

    defineProps(['tittle']);

</script>