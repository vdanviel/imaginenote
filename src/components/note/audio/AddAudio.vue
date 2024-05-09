<template>
  <div>
    <!-- Estilize o rótulo do input de arquivo para que pareça um botão -->
    <label for="audio_input" class="bg-gray-300 hover:bg-gray-400 text-black font-bold p-2 rounded-full w-fit flex flex-row justify-between h-fit cursor-pointer">
      <svg width="24px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path d="M137.45,450a83.32,83.32,0,1,1,83.31-83.31A83.41,83.41,0,0,1,137.45,450Zm0-136.63a53.32,53.32,0,1,0,53.31,53.32A53.38,53.38,0,0,0,137.45,313.37Z"/><path d="M374.88,395a83.32,83.32,0,1,1,83.31-83.32A83.41,83.41,0,0,1,374.88,395Zm0-136.63a53.32,53.32,0,1,0,53.31,53.31A53.37,53.37,0,0,0,374.88,258.37Z"/><path d="M205.76,381.69a15,15,0,0,1-15-15V119.3a15,15,0,0,1,11.69-14.63L439.88,50.88a15,15,0,0,1,18.31,14.63V311.68a15,15,0,0,1-30,0V84.29l-207.43,47V366.69A15,15,0,0,1,205.76,381.69Z"/><path d="M205.75,202.62a15,15,0,0,1-3.3-29.64l237.43-53.79a15,15,0,0,1,6.63,29.26L209.08,202.24A14.73,14.73,0,0,1,205.75,202.62Z"/></g></svg>
      Novo Aúdio
      <!-- Input de arquivo oculto -->
      <input type="file" id="audio_input" multiple accept="audio/*" style="display: none" @change="handle_file">
    </label>
    
  </div>
</template>

<script setup>

  const emit = defineEmits(['render_audio']);

  const handle_file = (e) => {

    const midia_list = e.target.files;

    emit('render_audio', midia_list);

  }

</script>