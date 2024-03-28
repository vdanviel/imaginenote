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
                <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                    <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg relative p-[50px]">
                        <!-- Retângulo -->
                        <div class="w-full h-full bg-gray-100"></div>

                        <!-- Círculo no meio do retângulo -->
                        <span class="w-16 h-16 bg-[#e5e7eb] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-shrink-0 rounded-full flex items-center justify-center">
                            <!-- Sinal de "+" dentro do círculo -->
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="text-white w-8 h-8" viewBox="0 0 24 24">
                                <path d="M12 5v14M5 12h14"></path>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section v-else>
        <div class="flex flex-wrap -m-2">
            <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg relative p-[50px]">
                    <!-- Retângulo -->
                    <div class="w-full h-full bg-gray-100"></div>

                    <!-- Círculo no meio do retângulo -->
                    <span class="w-16 h-16 bg-[#e5e7eb] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-shrink-0 rounded-full flex items-center justify-center">
                        <!-- Sinal de "+" dentro do círculo -->
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="text-white w-8 h-8" viewBox="0 0 24 24">
                            <path d="M12 5v14M5 12h14"></path>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

    import { ref } from 'vue';
    import { utils } from "../utils/functions.js";

    let ip = utils.services.get_ip();

    const workplaces = ref(null);

    ip.then(data => {

        utils.imaginenote_api.get_user_data(data.ip).then(data => {

        })

    });

    //const user_workplaces = async fetch('http://127.0.0.1:8000/api/guitar/' )

</script>
