<template>

  <div>

    <AlertModal v-show="show_error" tittle="Ocorreu um erro." :desc="error_message" @close="show_error = false"/>

    <!--image gallery-->
    <AlertModal v-show="img_deleted" tittle="Imagem deletada com sucesso!" desc="" @close="img_deleted = false"/>
    <ConfirmModal v-show="confirm_del_img" tittle="Tem certeza que deseja deletar essa imagem?" :loading="deleting_this_image" desc="Essa imagem será deleta da sua nuvem permanentemente." @handle="delete_img" @close="confirm_del_img = false"/>
    <FullScreenImage v-show="show_img" :name="open_name" :src="open_src" :size="open_size"  @close="close_all" @delete="confirm_del_img = true" />

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
                <!-- Iterar sobre as imagens -->
                <div @click="display_img" v-for="(item, index) in props.midia" :key="index" class="p-4 cursor-pointer">

                  <div class="block relative h-48 rounded overflow-hidden">
                    <img id="image" alt="midia" class="object-cover object-center w-full h-full block" :src="item.src">
                  </div>

                  <div class="mt-4">
                    <div class="inline-flex gap-1">
                      <h3 id="size" class="text-gray-500 text-xs tracking-widest title-font mb-1">{{bytes_to_size(item.size)}}</h3>
                      <h3 id="format" class="text-gray-500 text-xs tracking-widest title-font mb-1">{{item.contentType.substr(item.contentType.indexOf('/') + 1, item.contentType.length).toUpperCase()}}</h3>
                    </div>
                    <p id="name" class="text-gray-900 title-font text-lg font-medium truncate whitespace-nowrap w-[150px]">{{item.name.replace('.png','').replace('.jpg','').replace('.jpeg','').replace('.webp','')}}</p>
                    <p class="mt-1">{{format_date(item.timeCreated)}}</p>
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
  import FullScreenImage from "./FullScreenImage.vue";
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

  const show_error = ref(false);
  const error_message = ref(null);

  const show_img = ref(false);
  const confirm_del_img = ref(false);//no modal que mostra a imagem em fullscreen ao usuário, confirmação se usuário realmente desja deletar a aimagem ao clicar no icono de desacarte.
  const open_name = ref('');//aqui ele é string pois em components/image/FullScreenImage.vue o nome está querendo redenrizer com metodo .replace() que é de string (pois queremos tirar o '.png' po '.jpg' do titulo da imagem), ent deixamos uma string vazia aqui para não o correr erros
  const open_src = ref(null);
  const open_size = ref(null);
  const open_format = ref(null);
  const deleting_this_image = ref(false);
  const img_deleted = ref(false);

  const closeg = () => {

    emit('close');

  }

  const display_img = (e) => {

    let hole_element = e.currentTarget;//currentTarget - se refere ao elemento em q o evento está sendo chamado e não a um elemento que foi clicado..

    // Use querySelector para encontrar os elementos filhos dentro da div
    let img = hole_element.querySelector('#image');
    let name = hole_element.querySelector('#name');
    let size = hole_element.querySelector('.inline-flex #size');
    let format = hole_element.querySelector('.inline-flex #format');

    //atribuindo dados a imagem carregada
    open_name.value = name.innerText;
    open_src.value = img.src;
    open_size.value = size.innerText;
    open_format.value = format.innerText;

    show_img.value = true;

  }
  
  const close_all = () => {

    show_img.value = false;
    confirm_del_img.value = false;

  }

  const delete_img = async () => {

    deleting_this_image.value = true;

    const pass = await user();

    //criando o caminho no ggole storage firebase..
    const path = await firebase.storage.create_reference_by_path(pass.email + '/' + 'img' + '/' + route.params.id + '/' + open_name.value + '.' + open_format.value.replace('JPEG', 'JPG').toLowerCase());

    //solicitando a deleção da imagem no firebase..
    const deleted = await firebase.storage.delete([path]);

    //se foi deletado..
    if (deleted == true) {
      
      await emit('refresh_section');//jogando await nesse emit, pois esse emit é uma função assincorna que recupera novmanete as imagens do google stoarage firebase e introduz na aplicaçãço

      show_img.value = false;
      confirm_del_img.value = false;

      img_deleted.value = true;

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