<template>

    <div class="fixed z-40 inset-0 flex items-center justify-center bg-white">

        <div class="flex items-center justify-center">

            <!-- Ícone de seta para esquerda -->
            <div class="absolute left-4 top-4 cursor-pointer" @click="close"> 
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /> </svg>
            </div>
            
            <!-- Ícone de lixeira no canto superior direito -->
            <div class="absolute right-4 top-4 cursor-pointer" @click="delete_video">
                <svg width="32px" height="24px" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z" /></svg>
            </div>

            <!-- Nome da imagem sobreposta -->
            <p class="absolute left-1/2 top-2 -translate-x-1/2 transform rounded bg-fde767 px-4 py-2 font-bold text-black">{{ props.name }}</p>

            <video ref="video" controls :src="props.src" class="max-w-screen max-h-screen p-20">
                Desculpa, o seu navegador não suporta vídeos incorporados, mas você pode
                <a :href="props.src">baixá-lo</a>
                e assistir pelo seu reprodutor de mídia favorito!
            </video>

            <!-- Tamanho da imagem -->
            <p class="absolute left-1/2 bottom-4 -translate-x-1/2 transform rounded bg-fde767 px-4 py-2 font-bold text-white bg-[#fde767]">{{ typeof props.size == "number" ? bytes_to_size(props.size) : props.size }}</p><!-- condição ternaria, caso haja contextos em que esse dados seja alientado com o a unidade de mediade de bytes já copilado -->

        </div>

    </div>

</template>

<script setup>
    import { ref } from "vue";
    const emit = defineEmits(['close', 'delete']);
    const props = defineProps(['name', 'src', 'size', 'type']);

    /*
        document.addEventListener('keydown', function(event) {
            if (event.key === "Escape") {
                emit('close');
            }

            if (event.key === "Delete") {
                emit('delete');
            }
        });
    */

    const video = ref();

    const close = () => {
        video.value.pause();
        emit('close');
    }

    const delete_video = () => {
        video.value.pause();
        emit('delete');
    }

    function bytes_to_size(bytes) {
        const sizes = ['bytes', 'kb', 'mb', 'gb', 'tb'];
        if (bytes === 0) return '0 Byte';
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
        return Math.round(bytes / Math.pow(1024, i), 2) + sizes[i];
    }

</script>