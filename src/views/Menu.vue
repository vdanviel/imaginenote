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
        <div class="w-[400px] m-2" v-for="(note, i) in workplaces" :key="i">
            <NoteButton :name="note.name" :date="note.created_at"/>
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

    const workplaces = ref(null);

    onBeforeMount(async () => {

        const pass = await user();

        utils.imaginenote_api.user_notes(pass.id).then(data => {

            console.log(data);

            if (data.length != 0) {
                
                workplaces.value = data;

            }else{

                workplaces.value = null;

            }

        })

    })


</script>
