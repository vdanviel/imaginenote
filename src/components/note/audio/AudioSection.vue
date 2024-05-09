<template>

  <div>

    <AlertModal v-show="audio_deleted" tittle="Aúdio deletado com sucesso!" desc="" @close="audio_deleted = false"/>
    <ConfirmModal v-show="confirm_del_audio" tittle="Tem certeza que deseja deletar esse aúdio?" desc="Esse aúdio será deletado da sua nuvem permanentemente." :loading="deleting_this_audio" @handle="delete_audio" @close="confirm_del_audio = false"/>

    <div class="rounded-lg bg-gray-200 p-4 mt-5">

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
      
      <Swiper class="cursor-grab active:cursor-grabbing" :slides-per-view="10" freeMode="true" :autoplay="{delay: 5000}">

        <SwiperSlide v-for="(item, index) in midia" :key="index" class="mx-2">
          <Audio @delete="solo_deleting_audio" :audio_name="item.name" :audio_src="item.src" :audio_b="item.size"/>
        </SwiperSlide>

      </Swiper>

    </div>

  </div>

</template>

<script setup>
  import { ref } from "vue";
  import { useRoute } from "vue-router";

  import Audio from "./Audio.vue";
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
  const deleting_this_audio = ref(false);
  const audio_deleted = ref(false);
  const confirm_del_audio = ref(false);

  const deleting_audio_name = ref(null);

  const solo_deleting_audio = (name) => {

    deleting_audio_name.value = name;

    confirm_del_audio.value = true;

  }

  const delete_audio = async () => {

    deleting_this_audio.value = true;

    const pass = await user();

    //criando o caminho no ggole storage firebase..
    const path = await firebase.storage.create_reference_by_path(pass.email + '/' + 'audio' + '/' + route.params.id + '/' + deleting_audio_name.value);

    //solicitando a deleção da audiom no firebase..
    const deleted = await firebase.storage.delete([path]);

    //se foi deletado..
    if (deleted == true) {
      
      await emit('refresh_section');
      
      confirm_del_audio.value = false;

      if (props.midia.length - 1 === 0) {
        
        audio_deleted.value = false;

      }else{

        audio_deleted.value = true;

      }

    }

    deleting_this_audio.value = false;

  }

  const handle_section = () => {

    emit('delete_section');

  }

  const handle_gallery = () => {

    emit('show_gallery');

  }

</script>