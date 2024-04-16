<template>

  <section class="mx-auto max-w-md overflow-hidden rounded-lg bg-[#9ca3af]">
    <div class="mb-2 text-center text-xl font-bold my-4">
      <input maxlength="30" type="text" class="bg-transparent border-[#e5e7eb] focus:border rounded-lg text-[18px] text-center" :value="props.img_name">
    </div>
    <div class="m-4 px-6 bg-white">
      <img class="w-full rounded" :src="props.img_src" alt="Imagem" />
    </div>
  </section>


</template>

<script setup>
  const props = defineProps['img_src', 'img_tittle']

</script>
