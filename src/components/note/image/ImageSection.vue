<template>

  <div>

    <AlertModal v-show="img_deleted" tittle="Imagem deletada com sucesso!" desc="" @close="img_deleted = false"/>
    <ConfirmModal v-show="confirm_del_img" tittle="Tem certeza que deseja deletar essa imagem?" desc="Essa imagem será deleta da sua nuvem permanentemente." @handle="delete_img" @close="confirm_del_img = false"/>
    <FullScreenImage v-show="show_img" :name="open_name" :src="open_src" :size="open_size" :deleting="deleting_this_image" @close="close_all" @delete="confirm_del_img = true" />  

    <div class="rounded-lg bg-gray-200 p-4">

      <div class="flex items-center align-center justify-between">
        <p class="p-2 font-bold">{{props.midia_name}}</p>

        <div class="flex justify-end">

          <button @click="handle_gallery" class="p-2 w-fit cursor-pointer bg-transparent hover:bg-gray-400 rounded-full">
            <svg height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg"><path d="M22,17 L22,19 L8,19 L8,17 L22,17 Z M22,11 L22,13 L8,13 L8,11 L22,11 Z M22,5 L22,7 L8,7 L8,5 L22,5 Z M4,20 C2.8954305,20 2,19.1045695 2,18 C2,16.8954305 2.8954305,16 4,16 C5.1045695,16 6,16.8954305 6,18 C6,19.1045695 5.1045695,20 4,20 Z M4,14 C2.8954305,14 2,13.1045695 2,12 C2,10.8954305 2.8954305,10 4,10 C5.1045695,10 6,10.8954305 6,12 C6,13.1045695 5.1045695,14 4,14 Z M4,8 C2.8954305,8 2,7.1045695 2,6 C2,4.8954305 2.8954305,4 4,4 C5.1045695,4 6,4.8954305 6,6 C6,7.1045695 5.1045695,8 4,8 Z" fill-rule="evenodd"/></svg>
          </button>

          <button @click="handle_section" class="p-2 w-fit cursor-pointer bg-transparent hover:bg-gray-400 rounded-full">
            <svg width="32px" height="24px" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z"/></svg>
          </button>

        </div>

      </div>
      
      <Swiper class="cursor-grab active:cursor-grabbing" :slides-per-view="6" freeMode="true" :autoplay="{delay: 5000}">

        <SwiperSlide v-for="(item, index) in midia" :key="index">
          <Image @show="display_img" :img_name="item.name" :img_src="item.src" :img_b="item.size"/>
        </SwiperSlide>

      </Swiper>

    </div>

  </div>

</template>

<script setup>
  import { ref } from "vue";
  import { useRoute } from "vue-router";

  import FullScreenImage from "./FullScreenImage.vue";
  import Image from "./Image.vue";
  import ConfirmModal from "../../alerts/ConfirmModal.vue";
  import AlertModal from "../../alerts/AlertModal.vue";

  import { user } from "../../../utils/functions.js";
  import { firebase } from "../../../utils/firebase.js";
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';

  //exporteds
  const props = defineProps(['midia', 'midia_name', 'type']);
  const emit = defineEmits(['delete_section', 'show_gallery', 'refresh_section']);
  const route = useRoute();

  //v-models
  const show_img = ref(false);
  const confirm_del_img = ref(false);//no modal que mostra a imagem em fullscreen ao usuário, confirmação se usuário realmente desja deletar a aimagem ao clicar no icono de desacarte.
  const open_name = ref('');//aqui ele é string pois em componentes/image/FullScreenImage.vue o nome está querendo redenrizer com metodo .replace() que é de string (pois queremos tirar o '.png' po '.jpg' do titulo da imagem), ent deixamos uma string vazia aqui para não o correr erros
  const open_src = ref(null);
  const open_size = ref(null);
  const deleting_this_image = ref(false);
  const img_deleted = ref(false);

  const display_img = (data) => {

    open_name.value = data.name;
    open_src.value = data.src;
    open_size.value = data.size;
    

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
    const path = await firebase.storage.create_reference_by_path(pass.email + '/' + 'img' + '/' + route.params.id + '/' + open_name.value);

    //solicitando a deleção da imagem no firebase..
    const deleted = await firebase.storage.delete([path]);

    //se foi deletado..
    if (deleted == true) {
      
      await emit('refresh_section');

      show_img.value = false;
      confirm_del_img.value = false;
      deleting_this_image.value = true;
      img_deleted.value = true;

    }

  }

  const handle_section = () => {

    emit('delete_section');

  }

  const handle_gallery = () => {

    emit('show_gallery');

  }

</script>