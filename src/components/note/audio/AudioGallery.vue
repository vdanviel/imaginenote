<template>

  <div>

    <AlertModal v-show="display_name" tittle="O nome completo deste aúdio é..." :desc="name_audio_displaying" @close="display_name = false"/>

    <AlertModal v-show="audio_deleted" tittle="Aúdio deletado com sucesso!" desc="" @close="audio_deleted = false"/>
    <ConfirmModal v-show="confirm_del_audio" tittle="Tem certeza que deseja deletar esse aúdio?" :loading="deleting_this_image" desc="Esse aúdio será deletado da sua nuvem permanentemente." @handle="delete_audio" @close="confirm_del_audio = false"/>

    <div class="bg-[#f1eb1a40] z-20 bg-opacity-50 fixed inset-0 overflow-y-auto z-30 flex items-center justify-center">
      <div class="bg-white rounded-lg p-8 shadow overflow-hidden h-[98%] min-w-[75%]">

        <div class="flex justify-between items-center mb-4">
          <h2 class="text-gray-900 text-lg font-medium">{{props.midia_name}}</h2>
          <button class="text-gray-700 hover:text-gray-900" :onclick="closeg">Fechar</button>
        </div>
        
        <div class="overflow-y-auto max-h-screen">
          
          <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
              <div class="grid grid-cols-3 gap-4">
                
                <!-- Iterar sobre as audios -->
                <div v-for="(item, index) in props.midia" :key="index">

                  <div class="border shadow rounded-lg p-5 m-5">

                    <div class="flex items-center gap-2">
                      <audio controls :src="item.src" class="flex-grow">Seu navegador não suporta reprodução de áudios, se desejado <a :href="item.src">baixe</a> o áudio.</audio>

                      <button @click="confirm_del_audio = true" class="w-fit cursor-pointer rounded-full bg-transparent p-2 hover:bg-gray-400">
                        <svg width="20px" height="20px" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                          <path d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z" />
                        </svg>
                      </button>
                    </div>

                    <div class="m-4">
                      <div class="mt-2 flex gap-2">
                        <h3 class="title-font mb-1 text-xs tracking-widest text-gray-500">{{item.contentType.substr(item.contentType.indexOf('/') + 1, item.contentType.length).toUpperCase()}}</h3>
                        <p class="title-font mb-1 text-xs tracking-widest text-gray-500">{{format_date(item.timeCreated)}}</p>
                      </div>
                      <p @click="display_audio_name" class="bg-fde767 rounded py-2 font-bold text-black truncate cursor-pointer">{{ item.name.replace('.mp3', '').replace('.wav', '').replace('.aac', '') }}</p>
                      <p id="audio_midia_name" class="hidden">{{ item.name }}</p>

                      <p class="bg-fde767 w-fit bg-[#fde767] px-4 py-2 font-bold text-white">{{ bytes_to_size(item.size)}}</p>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          </section>

        </div>
      </div>
    </div>

  </div>

</template>

<script setup>

  //compnents
  import ConfirmModal from "../../alerts/ConfirmModal.vue";
  import AlertModal from "../../alerts/AlertModal.vue";

  //vue funcs
  import { ref } from "vue";
  import { useRoute } from "vue-router";

  //exported
  import { user } from "../../../utils/functions.js";
  import { firebase } from "../../../utils/firebase.js";

  const route = useRoute();

  const props = defineProps(['midia_name', 'midia']);
  const emit = defineEmits(['close', 'refresh_section']);

  const display_name = ref(false);

  const show_audio = ref(false);
  const confirm_del_audio = ref(false);//no modal que mostra a aúdio em fullscreen ao usuário, confirmação se usuário realmente desja deletar a aaúdio ao clicar no icono de desacarte.
  const deleting_this_image = ref(false);
  const audio_deleted = ref(false);
  const name_audio_displaying = ref(null);

  const closeg = () => {

    emit('close');

  }
  
  const display_audio_name = (e) => {

    name_audio_displaying.value = e.currentTarget.innerText;

    display_name.value = true;


  }

  const delete_audio = async () => {

    deleting_this_image.value = true;

    const pass = await user();

    //criando o caminho no ggole storage firebase..
    const path = await firebase.storage.create_reference_by_path(pass.email + '/' + 'audio' + '/' + route.params.id + '/' + document.querySelector('#audio_midia_name').innerText);

    //solicitando a deleção da aúdio no firebase..
    const deleted = await firebase.storage.delete([path]);

    //se foi deletado..
    if (deleted == true) {
      
      await emit('refresh_section');//jogando await nesse emit, pois esse emit é uma função assincorna que recupera novmanete as audios do google stoarage firebase e introduz na aplicaçãço

      show_audio.value = false;
      confirm_del_audio.value = false;

      audio_deleted.value = true;

      if (props.midia.length - 1 === 0) {
        
        closeg();

      }      

    }

    deleting_this_image.value = false;

  }

  // Método para formatar a data
  const format_date = (dateString) => {

      let date = new Date(dateString);

      let day = date.getDate().toString().length == 1 ? "0" + date.getDate().toString() : date.getDate().toString();

      //No JavaScript, os meses são indexados a partir de zero, o que significa que janeiro é representado como 0, fevereiro como 1, e assim por diante até dezembro que é representado como 11.
      let adjusted_mounth =  date.getMonth() + 1;

      let mount = adjusted_mounth.toString().length == 1 ? "0" + adjusted_mounth.toString() : adjusted_mounth.toString();
      let year = date.getFullYear().toString().length == 1 ? "0" + date.getFullYear().toString() : date.getFullYear().toString();

      let hour = date.getHours().toString().length == 1 ? "0" + date.getHours().toString() : date.getHours().toString();
      let minute = date.getMinutes().toString().length == 1 ? "0" + date.getMinutes().toString() : date.getMinutes().toString();

      return `${day}/${mount}/${year} ás ${hour}:${minute}`

  };

  function bytes_to_size(bytes) {
    const sizes = ['bytes', 'kb', 'mb', 'gb', 'tb'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return Math.round(bytes / Math.pow(1024, i), 2) + sizes[i];
  }

</script>