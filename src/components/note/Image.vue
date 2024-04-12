<template>
    <div class="relative max-w-xs">
        <img :src="props.img_src" alt="Descrição da Imagem" class="w-full rounded-lg border-2 border-gray-300 p-5">
        <div class="absolute top-0 left-0 right-0 bg-gray-900 bg-opacity-75 text-white text-center py-1 rounded-t-lg">
            {{props.img_tittle}}
        </div>
    </div>
</template>

<script setup>

    const props = defineProps['img_src', 'img_tittle']



</script>
