<template>

    <section>
        <button @click="register" class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full w-fit flex flex-row justify-between">
            <svg width="24px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="256" width="256"/><polygon fill="none" points="128 160 96 160 96 128 192 32 224 64 128 160" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" x1="168" x2="200" y1="56" y2="88"/><path d="M216,120v88a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h88" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
             <b>+</b> Nova nota
        </button>
    </section>

</template>

<script setup>
    import { utils, user } from "../../utils/functions.js";
    import { useRouter } from "vue-router";

    const router = useRouter();

    const register = async () => {
        const pass = await user();

        utils.imaginenote_api.register_user_note(pass.id).then((data) => {

            // Check if router is defined before using it
            if (router) {
                router.push(`/vizualize/${data.id}`);
            } else {
                console.error("Router is undefined");
            }
        });
    }
</script>

