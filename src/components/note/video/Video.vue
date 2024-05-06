<template>
  <div @click="handleVideo" class="relative z-10 w-[220px] h-[110px] overflow-hidden rounded-lg group cursor-pointer">

  <div>
    <img crossorigin="anonymous"  :src="url" class="h-full w-full rounded-lg object-cover">

    <!-- Ícone de play -->
    <svg class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-12 h-12 opacity-75 cursor-pointer" fill="currentColor" viewBox="0 0 20 20">
      <path d="M3 17.5l12-7-12-7z"></path>
    </svg>
  </div>

    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <p class="p-2 absolute bottom-2 left-0 right-0 text-center text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity truncate">{{ props.video_name.replace('.mp4', '').replace('.mkv', '') }}</p>
  </div>
</template>

<script setup>
  import { ref, defineProps, defineEmits, onMounted, onUpdated } from 'vue';
  import unload from "../../../assets/unload-video-preview.png";

  const props = defineProps(['video_name', 'video_src', 'video_b', 'video_type']);
  const emit = defineEmits(['show']);

  const handleVideo = () => {
      emit('show', { name: props.video_name, src: props.video_src, size: props.video_b, type: props.video_type });
  }

  //const preview = ref(null);
  //const canvas = ref(null);
  const url = ref(unload);
  //const item = ref();

  async function capture_preview() {

    const video = document.createElement('video');
    video.crossOrigin = "anonymous";
    video.src = props.video_src;
    video.muted = true;
    video.currentTime = 1;
    video.preload = "none";
    video.controls = false;
    video.autoplay = true;

    // Aguarde o vídeo ser carregado
    await new Promise((resolve, reject) => {
        video.onloadedmetadata = resolve;
        video.onerror = reject;
    });

    // Espere um curto período para garantir que o vídeo tenha tempo para renderizar o frame
    await new Promise(resolve => setTimeout(resolve, 500));

    // Crie um canvas temporário
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Desenhe o frame do vídeo no canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Converta o conteúdo do canvas em uma URL de imagem
    const encode = canvas.toDataURL('image/jpeg');

    url.value = encode;

    // Limpe a memória
    video.remove();
    canvas.remove();

  }

  onMounted(() => {
      capture_preview()
  });

  onUpdated(() => {
      capture_preview()
  });

  

</script>

<style scoped>
/* Estilos personalizados aqui, se necessário */
</style>
