<template class="mb-5">

  <div class="flex justify-center mt-[100px]" v-if="loading">
    <Loading/>
  </div>

  <div v-else class="p-4 h-screen flex flex-col">

    <SavedItem v-show="saved"/>

    <input @input="update_name" type="text" max="50" class="text-black my-5 mb-8 font-bold text-[29px] w-[50%] border rounded-lg p-1" :value="note.name">

    <div class="flex flex-row  space-x-4 mb-4">
      <AddImage @click="addmidia('image')"/>
      <AddVideo @click="addmidia('video')"/>
      <AddAudio @click="addmidia('audio')"/>
    </div>    

    <div  contenteditable="true" class="border rounded-lg px-4 py-2 flex-grow mb-[30px]" @input="update_text" placeholder="Digite seu texto aqui" v-html="note.text"></div>
    
    <div class="media-container relative mt-[35px]">
      <div v-for="(midia, index) in midia" :key="index" class="midia-item absolute">

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
  import Loading from "../../components/Loading.vue";


  import { ref, reactive } from 'vue';
  import { useRoute } from "vue-router"; 
  import { utils } from "../../utils/functions.js";

  //models vue
  const note = reactive({ id: null, name: '', text: '' });//reactive - para os dados serem atualizados automaticamnete e exbidos no ui..
  const midia = ref([]);
  const route = useRoute();
  const loading = ref(true);
  const saved = ref(false);

  utils.imaginenote_api.show_note(route.params.id).then(data => {
    note.id = data.id;
    note.name = data.name;
    note.text = data.text;
    loading.value = false;
  });

  const update_name = (event) => {
    note.name = event.target.value;
    saved.value = true; // Mostra SavedItem quando o nome é atualizado
    save_note('name');//requisitando salvamento da nota..
  }

  const addmidia = (tipo) => {
    midia.value.push({ tipo, x: 0, y: 0 });
  }

  const update_text = (event) => {
    note.text = event.target.value;
    saved.value = true; // Mostra SavedItem quando o nome é atualizado
    save_note('text');//requisitando salvamento da nota..
  }

  // Assuma que você tem uma função saveNote para salvar as alterações no banco de dados
  const save_note = (who) => {

    if (who == 'name') {
      utils.imaginenote_api.save_name_note(note.id, note.name).then((data) => {
        if (data.note_name_saved) {
          saved.value = false; // Oculta SavedItem após salvar
        }
      });
    }

    if (who == 'text') {
      utils.imaginenote_api.save_text_note(note.id, note.text).then((data) => {
        console.log(note.text);
        console.log(data);
      });
    }

  }

</script>

<style scoped>
.midia-item {
  /* Estilos para as mídias */
}
</style>
