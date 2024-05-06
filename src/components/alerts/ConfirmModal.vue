<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/html-indent -->
<template>

    <!-- Modal backdrop -->
    <div @click.self="close_modal" class="fixed z-50 inset-0 flex items-center justify-center bg-[#f1eb1a40] bg-opacity-50 shadow">
        <!-- Modal content -->
        <div class="w-2/4 rounded-lg bg-white p-8">

            <div class="w-full flex justify-center items-center" v-if="props.loading">
                <Loading/>
            </div>

            <div v-else>
                <h2 class="mb-4 text-xl font-bold">{{props.tittle}}</h2>
                <p class="text-gray-700">{{props.desc}}</p>
                <!-- Botões de confirmar e cancelar -->
                <div class="mt-4 flex justify-start gap-2">
                    <ConfirmButton tittle="Confirmar" @func="confirm_modal"/>
                    <PatternButton tittle="Cancelar" @func="close_modal"/>
                </div>
            </div>
        
        </div>
    </div>

</template>

<script setup>

    import { defineProps, ref } from "vue";
    import PatternButton from "../PatternButton.vue";
    import ConfirmButton from "../ConfirmButton.vue";
    import Loading from "../Loading.vue";

    const props = defineProps(['tittle', 'desc', 'loading']);
    const emit = defineEmits(['handle', 'close']);
    
    /*
        document.addEventListener('keydown', function(event) {
            if (props.loading == false) {    
                if (event.key === "Escape") {
                    emit('close');
                }
            }        
        });
    */

    const confirm_modal = () => {

        emit('handle');

    }

    const close_modal = () => {

        emit('close');

    }


</script>
