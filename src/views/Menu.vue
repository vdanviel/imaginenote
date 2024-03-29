<template>
    <section v-if="workplaces" class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-col text-center w-full mb-20">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Anote tudo que pensa.</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them.</p>
            </div>
            <div class="flex flex-wrap -m-2">
                <div v-for="(guitar, i) in workplaces" :key="i" class="p-2 lg:w-1/3 md:w-1/2 w-full">
                    <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                        <span alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4 bg-[#e5e7eb]"></span>
                        <div class="flex-grow">
                            <h2 class="text-gray-900 title-font font-medium">{{guitar.name}}</h2>
                            <p class="text-gray-500">{{guitar.created_at}}</p>
                        </div>
                    </div>
                </div>
                <CreateNoteButton/>
            </div>
        </div>
    </section>
    <section v-else>
        <CreateNoteButton/>
    </section>
</template>

<script setup>

    import { ref } from 'vue';
    import { utils} from "../utils/functions.js";
    import CreateNoteButton from "../components/note/CreateNoteButton.vue";

    const workplaces = ref(null);



</script>
