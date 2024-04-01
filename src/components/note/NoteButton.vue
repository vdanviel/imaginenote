<template>

        <router-link to="/" class="p-2 lg:w-1/3 md:w-1/2">
            <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <span class="w-16 h-16 bg-[#fde767] rounded-full flex items-center justify-center text-gray-900 text-3xl font-bold mr-4">N</span>
            <div class="flex-grow">
                <h2 class="text-gray-900 title-font font-medium">{{ note_name }}</h2>
                <p class="text-gray-500">{{ note_date }}</p>
            </div>
            </div>
        </router-link>
        
</template>

<script setup>

    import { ref, defineProps } from "vue";

    const props = defineProps(['name', 'date']);

    const note_name = ref(props.name);
    const note_date = ref(props.date);

    



</script>
