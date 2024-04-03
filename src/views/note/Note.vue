<template class="mb-5">
  <div class="p-4 h-screen flex flex-col">

    <SavedItem v-show="saved"/>

    <input @input="update_name" type="text" class="text-black my-5 mb-8 font-bold text-[29px] w-[50%] border rounded-lg p-1" :value="note.name">

    <div class="flex flex-row  space-x-4 mb-4">
      <AddImage @click="addmidia('image')"/>
      <AddVideo @click="addmidia('video')"/>
      <AddAudio @click="addmidia('audio')"/>
    </div>    

    <div contenteditable="true" class="border rounded-lg px-4 py-2 flex-grow mb-[30px]" 
         @input="update_text"
         placeholder="Digite seu texto aqui">
         {{note.text}}
    </div>
    
    <div class="media-container relative mt-[35px]">
      <div v-for="(midia, index) in midia" :key="index" class="midia-item absolute">
        <!-- Renderizar a mídia -->
        <p>{{ midia.tipo }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>

  //components..
  import AddImage from "../../components/note/AddImage.vue";
  import AddVideo from "../../components/note/AddVideo.vue";
  import AddAudio from "../../components/note/AddAudio.vue";
  import SavedItem from "../../components/SavedItem.vue";

  //libs..
  import { ref } from 'vue';
  import { useRoute } from "vue-router";
  import { utils } from "../../utils/functions.js";

  //v-models
  const saved = ref(false);
  const note = ref(false);
  const text = ref('');
  const midia = ref([]);

  //use funcs
  const rote = useRoute()

  //methods
  utils.imaginenote_api.show_note(rote.params.id).then(data => {

    note.value = data;

  });

  const update_name = (event) => {
    
    utils.imaginenote_api.save_name_note(note.value.id, event.target.value).then((data) => {

      if (data.note_name_saved) {
        
        saved.value = true;

      }
      
    })

  }

  const addmidia = (tipo) => {
    midia.value.push({ tipo, x: 0, y: 0 });
  }

  const update_text = (event) => {
    text.value = event.target.innerHTML;
  }

</script>

<style scoped>
.midia-item {
  /* Estilos para as mídias */
}
</style>
