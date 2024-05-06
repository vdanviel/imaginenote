<template>

  <div @click="handle_img" class="relative z-10 w-[220px] h-[110px] overflow-hidden rounded-lg group cursor-pointer">
    <img class="h-full w-full rounded-lg object-cover" :src="props.img_src"/>
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <p class="p-2 absolute bottom-2 left-0 right-0 text-center text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity truncate">{{ props.img_name.replace('.png', '').replace('.jpg', '') }}</p>
  </div>

</template>

<script setup>

  const props = defineProps(['img_name', 'img_src', 'img_b']);
  const emit = defineEmits(['show']);

  const handle_img = () => {

    emit('show', {name: props.img_name, src: props.img_src, size: props.img_b});

  }

</script>