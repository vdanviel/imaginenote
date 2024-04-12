<template>
  <div class="relative">
    <vue-draggable-resizable
      :w="width"
      :h="height"
      :x="x"
      :y="y"
      :resizable="true"
      @resizing="onResizing"
      @dragging="onDragging"
    >
      <img :src="props.img_src" alt="Descrição da Imagem" class="w-full rounded-lg border-2 border-gray-300">
      <div class="absolute top-0 left-0 right-0 bg-gray-900 bg-opacity-75 text-white text-center py-1 rounded-t-lg">
        {{props.img_tittle}}
      </div>
    </vue-draggable-resizable>
  </div>
</template>

<script setup>
    import VueDraggableResizable from 'vue-draggable-resizable';

    const props = defineProps['img_src', 'img_tittle']

    const width = ref(400); // largura inicial
    const height = ref(300); // altura inicial
    const x = ref(0);
    const y = ref(0);

    const onResizing = (width, height) => {
    // Atualiza a largura e altura ao redimensionar
    width.value = width;
    height.value = height;
    };

    const onDragging = (x, y) => {
    // Atualiza a posição ao arrastar
    x.value = x;
    y.value = y;
    };
</script>
