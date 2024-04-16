<template class="mb-5">

  <div class="flex justify-center mt-[100px]" v-if="loading">
    <Loading/>
  </div>

  <div v-else class="p-4 h-screen flex flex-col">

    <SavedItem v-show="saved"/>

    <input @input="update_name" type="text" maxlength="50" class="text-black my-5 mb-8 font-bold text-[29px] w-[50%] border rounded-lg p-1" :value="note.name">

    <div class="flex flex-row  space-x-4 mb-4">
      <AddImage @render_image="addmidia"/>
      <AddVideo @click="addmidia('video')"/>
      <AddAudio @click="addmidia('audio')"/>  
    </div>

    /* eslint vue/no-child-content: "off" */
    <draggable v-model="midia" tag="section">
      <template #item="{element: midia}">
        <div contenteditable="true" class="border resize-none rounded-lg px-4 py-2 flex-grow mb-[30px]" @input="update_text" @change="update_text" id="current_text" v-html="db_text">
          <Image :img_name="midia.name" :img_src="midia.src"/>
        </div>
      </template>
    </draggable>
    
  </div>
</template>

<script setup>

  //components..
  import AddImage from "../../components/note/AddImage.vue";
  import AddVideo from "../../components/note/AddVideo.vue";
  import AddAudio from "../../components/note/AddAudio.vue";
  import SavedItem from "../../components/SavedItem.vue";
  import Image from "../../components/note/Image.vue";
  import Loading from "../../components/Loading.vue";

  import { ref, reactive, onBeforeUnmount, nextTick, h} from 'vue';
  import { useRoute } from "vue-router"; 
  import { user, utils } from "../../utils/functions.js";
  import { firebase } from "../../utils/firebase.js";
  import draggable from "vuedraggable";

  //models vue
  const note = reactive({ id: null, name: ''});//reactive - para os dados serem atualizados automaticamnete e exbidos no ui..
  const db_text = ref('');
  const route = useRoute();
  const loading = ref(true);
  const saved = ref(false);
  const midia = ref(null);
  const unsaved_changes = ref(false);//para saber se há alterações não salvas

  //recuperando as ifno da nota no canco e colocando nos v-models..
  utils.imaginenote_api.show_note(route.params.id).then(data => {
    note.id = data.id;
    note.name = data.name;
    db_text.value = data.text;
    loading.value = false;
  });

  //LINDANDO COM NOTA E SOLICITAÇÕES PARA SALVAMENTO DA NOTA
  //salva o titulo da nota..
  const update_name = (event) => {
    note.name = event.target.value;
    saved.value = true; // Mostra SavedItem quando o nome é atualizado
    unsaved_changes.value = true;//indicando que o item ainda esta sendo salvo
    saveDebounced('name');//requisitando salvamento da nota..
  }

  //salva o texto da nota.
  const update_text = () => {
    saved.value = true; // Mostra SavedItem quando o nome é atualizado
    unsaved_changes.value = true;//indicando que o item ainda esta sendo salvo
    saveDebounced('text');//requisitando salvamento da nota..
  }

  //controlando a quantidade solicitções que em periodo de tempo que a atualização de texto ou titulo pode fazer em um segundo por intervalo com debounce concept.
  let debounceTimer;
  const saveDebounced = (who) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      save_note(who);
    }, 1000); // Aguarda 1 segundo após a última alteração
  };

  const save_note = (who) => {

    if (who == 'name') {

      utils.imaginenote_api.save_name_note(note.id, note.name).then((data) => {

    if (data.note_name_saved) saved.value = false; // Oculta SavedItem após salvar

        unsaved_changes.value = false;

      });
    }

    if (who == 'text') {

      utils.imaginenote_api.save_text_note(note.id, document.getElementById('current_text').innerHTML).then((data) => {

        if(data.note_text_saved) saved.value = false;       

        unsaved_changes.value = false;

      });
    }

  }

  //LIDANDO COM "unsaved_changes" - CASO USUÁRIO TENTE SAIR DA NOTA QUANDO A NOTA AINDA N FOI SALVA..

  // Adicione um ouvinte para o evento beforeunload 
  window.addEventListener('beforeunload', confirmExit);

  // Função para exibir o prompt de confirmação
  function confirmExit(event) {
    if (unsaved_changes.value == true) {
      // Defina a mensagem que será exibida no prompt
      event.returnValue = 'Você tem alterações não salvas. Tem certeza que deseja sair?';
    }
  }
  
  //evita de ficar chamando mensagem de confirmação para sair da nota se ela n salvou toda hr..
  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', confirmExit);
  });

  //LIDANDO COM MIDIA

  //salvamento de midia
  const addmidia = async (midia_list) => {
    
    unsaved_changes.value = true;//indicanco que solicitçaõ esta sendo feita..

    //verificando que tipo de mídia é..
    //imagem
    const image_names = [];
    if (midia_list[0].type.indexOf('image') !== -1) {//indexOf retorna -1 se n encontrar..
      
      saved.value = true; // Mostra SavedItem

      //salvando dados da imagem(s) no banco de dados..
      for (const key in midia_list) {
        if (Object.hasOwnProperty.call(midia_list, key)) {
          const element = midia_list[key];

          let image = await utils.imaginenote_api.register_image_note(note.id, element.name, element.name, element.size);

          if (image.new_image) {
            
            image_names.push(image.name);

          }else{
            console.error(image);
            return false;
          }
          
        }
      }

      //criando o caminho onde as imagens vao ficar no google storage..
      const references = firebase.storage.create_references(midia_list, 'img', note.id);

      //upando imagens no google storage..
      firebase.storage.upload(references, midia_list);
      
      //recuperando imagens do google firebase..
      setTimeout(async () => {
        let images_urls = await firebase.storage.get_files(references);

        if (image_names.length == images_urls.length) {
          
          // Agora, após obter as URLs das imagens, você pode montar e adicionar os componentes Vue
          nextTick(() => {

            images_urls.forEach((url, index) => {

              const html = 
              `
                <section class="mx-auto max-w-md overflow-hidden rounded-lg bg-[#9ca3af]">
                <div class="mb-2 text-center text-xl font-bold my-4">
                  <input maxlength="30" type="text" class="bg-transparent border-[#e5e7eb] focus:border rounded-lg text-[18px] text-center" :value="${image_names[index]}">
                </div>
                <div class="m-4 px-6 bg-white">
                  <img class="w-full rounded" :src="${url}" alt="Imagem" />
                </div>
                </section>
              `;

              midia.value.innerText += html;

            });

          });

        }else{
          console.error('error-imaginenote: not possible to renderize the image due the images names and urls have different sizes.');
          return false;
        }  

        saved.value = false;//escondendo o "salvando..."
        unsaved_changes.value = false;//solicitação feita, possivel fechar site..

      }, 1000);
      

    }

    
  }

</script>