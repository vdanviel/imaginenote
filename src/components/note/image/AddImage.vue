<template>
  <div>
    <!-- Estilize o rótulo do input de arquivo para que pareça um botão -->
    <label for="file_input" class="bg-gray-300 hover:bg-gray-400 text-black font-bold p-2 rounded-full w-fit flex flex-row justify-between h-fit cursor-pointer">
      <svg width="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M21 15v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2zm.008-12c.548 0 .992.445.992.993V13h-2V5H4v13.999L14 9l3 3v2.829l-3-3L6.827 19H14v2H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016zM8 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
        </g>
      </svg>
      Nova Imagem
      <!-- Input de arquivo oculto -->
      <input type="file" id="file_input" multiple accept="image/png,jpg" style="display: none" @change="handle_file">
    </label>
    
  </div>
</template>

<script setup>

  const emit = defineEmits(['render_image']);

  const handle_file = (e) => {

    const midia_list = e.target.files;

    emit('render_image', midia_list);

  }

</script>