<template>
<section class="text-gray-600 body-font flex justify-center">
  <div class="container px-5 py-24 flex flex-col items-center">
    <div class="flex flex-col text-center w-full mb-20">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Acesse suas anotações</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them.</p>
    </div>
    <div>
        <CreateNoteButton/>
    </div>
    <div class="w-[85%] flex flex-wrap justify-start" v-if="workplaces">
        <Loading v-show="loading"/>
        <div class="w-[400px] m-2" v-for="(note, i) in workplaces" :key="i">
            <NoteButton :id="note.id" :name="note.name" :date="note.created_at"/>
        </div>        
    </div>
    <div v-else class="border-gray-200 border p-4 rounded-lg m-8">
        <div class="flex flex-col items-center justify-center">
            <p class="text-lg font-semibold my-4">Não há notas salvas.</p>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500">
                <path fill="none" d="M0 0h24v24H0V0z"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
            </svg>
            <p class="text-gray-500 my-4">Crie sua primeira nota apertando em "Nova nota" no butão acima..</p>
        </div>
    </div>
  </div>
</section>

</template>

<script setup>

    import { ref, onBeforeMount } from 'vue';
    import { utils, user } from "../utils/functions.js";
    import CreateNoteButton from "../components/note/CreateNoteButton.vue";
    import NoteButton from "../components/note/NoteButton.vue";
    import Loading from "../components/Loading.vue";

    const workplaces = ref(null);
    const loading = ref(true);

    onBeforeMount(async () => {

        const pass = await user();

        //location.reload();

        utils.imaginenote_api.user_notes(pass.id).then(data => {

            loading.value = true;

            if (data.length != 0) {

                loading.value = false;
                workplaces.value = data;

            }else{

                loading.value = false;
                workplaces.value = null;

            }

        })

    })


</script>
