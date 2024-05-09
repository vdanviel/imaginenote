<template>

  <div @click.self="closeg">

    <!-- Modais de alerta e vídeo -->
    <AlertModal v-show="show_error" tittle="Ocorreu um erro." :desc="error_message" @close="show_error = false"/>
    <AlertModal v-show="video_deleted" tittle="Vídeo deletado com sucesso!" desc="" @close="video_deleted = false"/>
    <ConfirmModal v-show="confirm_del_video" tittle="Tem certeza que deseja deletar esse vídeo?" desc="Esse vídeo será deletado da sua nuvem permanentemente." :loading="deleting_this_video" @handle="delete_video" @close="confirm_del_video = false"/>
    <FullScreenVideo v-show="show_video" :name="open_name" :src="open_src" :size="open_size" @close="close_all" @delete="confirm_del_video = true" />

    <!-- Fundo escuro e contêiner principal -->
    <div class="bg-[#f1eb1a40] z-20 bg-opacity-50 fixed inset-0 overflow-y-auto z-30 flex items-center justify-center">
      <div class="bg-white rounded-lg p-8 shadow overflow-hidden h-[98%] w-[75%]">

        <!-- Cabeçalho com título e botão de fechar -->
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-gray-900 text-lg font-medium">{{props.midia_name}}</h2>
          <button class="text-gray-700 hover:text-gray-900" @click="closeg">Fechar</button>
        </div>
        
        <!-- Galeria de vídeos -->
        <div class="grid grid-cols-3 gap-4">
          <!-- Iterar sobre os vídeos -->
          <div v-for="(item, index) in props.midia" :key="index" class="relative rounded overflow-hidden shadow-md">
            <!-- Componente de vídeo -->
            <Video class="object-cover w-full h-40" @show="display_video" :video_name="item.name" :video_src="item.src" :video_b="item.size" :video_type="item.contentType"/>
            <!-- Informações sobre o vídeo -->
            <div class="p-4 bg-white">
              <div class="flex gap-2 mb-2">
                <p class="text-gray-600 text-xs ">{{ item.contentType.substr(item.contentType.indexOf('/') + 1, item.contentType.length).toUpperCase() }}</p>
                <p class="text-gray-600 text-xs">{{ format_date(item.timeCreated) }}</p>
              </div>
              <h3 class="text-gray-900 text-sm font-bold truncate mb-2">{{ item.name.replace('.mov', '').replace('.mp4', '').replace('.mkv', '') }}</h3>
              
              <p class="bg-fde767 w-fit bg-[#fde767] px-4 py-2 font-bold text-white ">{{ bytes_to_size(item.size)}}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>



</template>

<script setup>

  //compnents
  import FullScreenVideo from "./FullScreenVideo.vue";
  import ConfirmModal from "../../alerts/ConfirmModal.vue";
  import AlertModal from "../../alerts/AlertModal.vue";
  import Video from "../video/Video.vue";

  //vue funcs
  import { ref } from "vue";
  import { useRoute } from "vue-router";

  //exported
  import { user } from "../../../utils/functions.js";
  import { firebase } from "../../../utils/firebase.js";

  const route = useRoute();

  const props = defineProps(['midia_name', 'midia']);
  const emit = defineEmits(['close', 'refresh_section']);

  const show_error = ref(false);
  const error_message = ref(null);

  const show_video = ref(false);
  const confirm_del_video = ref(false);//no modal que mostra a video em fullscreen ao usuário, confirmação se usuário realmente desja deletar a video ao clicar no icono de desacarte.
  const open_name = ref('');//aqui ele é string pois em components/video/FullScreenVideo.vue o nome está querendo redenrizer com metodo .replace() que é de string (pois queremos tirar o '.png' po '.jpg' do titulo da videom), ent deixamos uma string vazia aqui para não o correr erros
  const open_src = ref(null);
  const open_size = ref(null);
  const open_type = ref(null);
  const deleting_this_video = ref(false);
  const video_deleted = ref(false);

  const closeg = () => {

    emit('close');

  }

  const display_video = (data) => {

    open_name.value = data.name;
    open_src.value = data.src;
    open_size.value = data.size;
    open_type.value = data.type;

    show_video.value = true;

  }
  
  const close_all = () => {

    show_video.value = false;
    confirm_del_video.value = false;

  }

  const delete_video = async () => {

    deleting_this_video.value = true;

    const pass = await user();

    //criando o caminho no ggole storage firebase..
    const path = await firebase.storage.create_reference_by_path(pass.email + '/' + 'video' + '/' + route.params.id + '/' + open_name.value);

    //solicitando a deleção da videom no firebase..
    const deleted = await firebase.storage.delete([path]);

    //se foi deletado..
    if (deleted == true) {
      
      await emit('refresh_section');

      show_video.value = false;
      confirm_del_video.value = false;

      video_deleted.value = true;

      if (props.midia.length - 1 === 0) {
        
        closeg();

      }

    }



    deleting_this_video.value = false;

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