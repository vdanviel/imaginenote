<template class="mb-5">

  <div class="flex justify-center mt-[100px]" v-if="loading">
    <Loading/>
  </div>

  <div v-else class="p-4 h-screen flex flex-col">

    <SavedItem v-show="saved"/>

    <input @input="update_name" type="text" max="50" class="text-black my-5 mb-8 font-bold text-[29px] w-[50%] border rounded-lg p-1" :value="note.name">

    <div class="flex flex-row  space-x-4 mb-4">
      <AddImage @render_image="addmidia"/>
      <AddVideo @click="addmidia('video')"/>
      <AddAudio @click="addmidia('audio')"/>
    </div>    

    <textarea contenteditable="true" class="border rounded-lg px-4 py-2 flex-grow mb-[30px]" @input="update_text" placeholder="Digite seu texto aqui" v-model="text"></textarea>
    
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
  import { firebase } from "../../utils/firebase.js";

  //models vue
  const note = reactive({ id: null, name: ''});//reactive - para os dados serem atualizados automaticamnete e exbidos no ui..
  let text = '';
  const route = useRoute();
  const loading = ref(true);
  const saved = ref(false);

  //recuperando as ifno da nota no canco e colocando nos v-models..
  utils.imaginenote_api.show_note(route.params.id).then(data => {
    note.id = data.id;
    note.name = data.name;
    text = data.text;
    loading.value = false;
  });

  const update_name = (event) => {
    note.name = event.target.value;
    saved.value = true; // Mostra SavedItem quando o nome é atualizado
    save_note('name');//requisitando salvamento da nota..
  }

  const update_text = () => {
    saved.value = true; // Mostra SavedItem quando o nome é atualizado
    save_note('text');//requisitando salvamento da nota..
  }

  const addmidia = async (midia_list) => {

    //verificando que tipo de mídia é..

    //imagem
    if (midia_list[0].type.indexOf('image') !== -1) {//indexOf retorna -1 se n encontrar..
      
      saved.value = true; // Mostra SavedItem

      //salvando nome dos arquivos no banco de dados..
      //code..

      //criando o caminho onde as imagens vao ficar no google storage..
      const references = firebase.create_references(midia_list, 'img');

      //upando imagens no google storage..
      const upload_result = firebase.upload(references, midia_list);

      //renderizando imagem no front..


      saved.value = false;
      

    }

    
  }

  // Assuma que você tem uma função saveNote para salvar as alterações no banco de dados
  const save_note = (who) => {

    if (who == 'name') {
      utils.imaginenote_api.save_name_note(note.id, note.name).then((data) => {

        if (data.note_name_saved) saved.value = false; // Oculta SavedItem após salvar

      });
    }

    if (who == 'text') {
      utils.imaginenote_api.save_text_note(note.id, text).then((data) => {

        if(data.note_text_saved) saved.value = false;        

      });
    }

  }

</script>
