<template>
  <div>
    <!-- Estilize o rótulo do input de arquivo para que pareça um botão -->
    <label for="video_input" class="bg-gray-300 hover:bg-gray-400 text-black font-bold p-2 rounded-full w-fit flex flex-row justify-between h-fit cursor-pointer">
      <svg width="24px" height="24px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0V0z" fill="none"/><path d="M34 21v-7c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h24c1.1 0 2-.9 2-2v-7l8 8V13l-8 8zm-6 5h-6v6h-4v-6h-6v-4h6v-6h4v6h6v4z"/></svg>
      Novo Vídeo
      <!-- Input de arquivo oculto -->
      <input type="file" id="video_input" multiple accept="video/*" style="display: none" @change="handle_file">
    </label>
    
  </div>
</template>

<script setup>

  const emit = defineEmits(['render_video']);

  const handle_file = (e) => {

    const midia_list = e.target.files;

    emit('render_video', midia_list);

  }

</script>