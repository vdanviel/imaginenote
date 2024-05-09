<template>
  <div class="w-full flex justify-center items-center flex-col">
    <div class="flex gap-2">

      <svg @click="backward" class="cursor-pointer" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path d="M9.29,19.71,4,14.41a2,2,0,0,1,0-2.82l5.29-5.3,1.42,1.42L5.41,13l5.3,5.29Z"/>
        <path d="M23,24H16V22h7a4,4,0,0,0,0-8H4.41V12H23a6,6,0,0,1,0,12Z"/>
      </svg>
      <button @click="togglePlay" class="text-white text-3xl bg-[#CBD5E0] rounded-full w-16 h-16 flex justify-center items-center cursor-pointer">
        <svg v-if="isPlaying" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
          <path fill="white" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
          <path fill="white" d="M8 5v14l11-7z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </button>
      <svg @click="forward" class="cursor-pointer" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style="transform: scaleX(-1);">
        <path d="M9.29,19.71,4,14.41a2,2,0,0,1,0-2.82l5.29-5.3,1.42,1.42L5.41,13l5.3,5.29Z"/>
        <path d="M23,24H16V22h7a4,4,0,0,0,0-8H4.41V12H23a6,6,0,0,1,0,12Z"/>
      </svg>
    </div>

    <div class="inline-flex items-center w-full gap-1">
      <p class="text-xs font-bold text-black truncate">{{ props.audio_name }}</p>
      <p class="text-xs font-bold text-black">{{ formatTime(current_time) }}</p>
      <button @click="emit('delete', props.audio_name)" class="p-2 w-fit cursor-pointer bg-transparent hover:bg-gray-400 rounded-full">
        <svg width="14px" height="14px" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z"/>
        </svg>
      </button>
    </div>

    <audio class="hidden" ref="audio" :src="props.audio_src" @timeupdate="updateTime"></audio>
  </div>
</template>

<script setup scoped>
    import { defineProps, ref, defineEmits } from 'vue';

    const props = defineProps(['audio_src', 'audio_name']);
    const emit = defineEmits(['delete']);

    const isPlaying = ref(false);
    const audio = ref(null);
    const current_time = ref('00:00');

    const togglePlay = () => {
        if (isPlaying.value == false) {
            audio.value.play();
            isPlaying.value = true;
        } else {
            audio.value.pause();
            isPlaying.value = false;
        }
    };

    const updateTime = () => {
        const minutes = Math.floor(audio.value.currentTime / 60);
        const seconds = Math.floor(audio.value.currentTime % 60);
        current_time.value = `${padTime(minutes)}:${padTime(seconds)}`;
    };

    const padTime = (time) => {
        return (time < 10 ? '0' : '') + time;
    };

    const formatTime = (time) => {
        return time;
    };

    const backward = () => {
        if (audio.value !== null) {
            audio.value.currentTime -= 10;
            updateTime();
        }
    };

    const forward = () => {
        if (audio.value !== null) {
            audio.value.currentTime += 10;
            updateTime();
        }
    };

</script>