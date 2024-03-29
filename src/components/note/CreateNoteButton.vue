<template>
    <div @click="register" class="flex flex-wrap m-2 cursor-pointer">
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
</template>

<script setup>

    import { utils, user } from "../../utils/functions.js";

    const register = async () => {
        
        const pass = await user();

        utils.imaginenote_api.register_user_note(pass.id).then(data => {

            console.log(data);

        })
        
    }

</script>
