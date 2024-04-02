<template class="mb-5">
  <div class="p-4 h-screen flex flex-col">
    <div class="flex flex-row  space-x-4 mb-4">
      <AddImage @click="addmidia('image')"/>
      <AddVideo @click="addmidia('video')"/>
      <AddAudio @click="addmidia('audio')"/>
    </div>

    <div contenteditable="true" class="border rounded-lg px-4 py-2 flex-grow mb-[30px]" 
         @input="atualizarTexto"
         placeholder="Digite seu texto aqui">
    </div>
    
    <div class="media-container relative mt-[35px]">
      <div v-for="(midia, index) in midias" :key="index" class="midia-item absolute">
        <!-- Renderizar a mídia -->
        <p>{{ midia.tipo }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AddImage from "../../components/note/AddImage.vue";
import AddVideo from "../../components/note/AddVideo.vue";
import AddAudio from "../../components/note/AddAudio.vue";

const texto = ref('');
const midias = ref([]);

const addmidia = (tipo) => {
  midias.value.push({ tipo, x: 0, y: 0 });
}

const atualizarTexto = (event) => {
  texto.value = event.target.innerHTML;
}
</script>

<style scoped>
.midia-item {
  /* Estilos para as mídias */
}
</style>
