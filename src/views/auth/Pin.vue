<template>

    <div class="mt-10 lg:m-10 lg:flex lg:flex-col lg:items-center">

        <svg fill="#fde767" width="100px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>

        <p class="text-center mb-10 mt-4 lg:w-[650px] text-[30px] font-bold">
            Insira o código de acesso.
        </p>

        <p class="text-center mb-10 lg:w-[650px]">
            Para entrar no ImagineNote e liberar seus beneficios, é necessário inserir o código de acesso que enviamos a você por email.
        </p>

        <div class="flex flex-col">
            <label class="mb-[10px]" for="phone">Código de Acesso</label>
            <input type="text" id="pin" v-model="pin" class="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 lg:w-96 lg:mb-[30px]">
        </div>

        <Loading v-show="loading"/>

        <AttentionAlert :tittle="error_message" v-show="wrong_pin" class="mb-[10px]"/>

        <button @click="login" type="submit" class="bg-green-500 shadow hover:bg-green-600 text-white font-bold py-2 px-4 rounded cursor-pointer">Começar</button>

    </div>

</template>

<script setup>

    import { ref } from "vue";
    import { utils } from "../../utils/functions.js";
    import Loading from "../../components/Loading.vue";
    import AttentionAlert from "../../components/alerts/AttentionAlert.vue";
    import { useRouter } from "vue-router";

    //vars do template
    const pin = ref();
    const loading = ref(false);
    const wrong_pin = ref(false)
    const error_message = ref(null);

    //metodos do vue
    const router = useRouter();

    //função do componente atual..
    const login = () => {
        
        loading.value = true;

        utils.imaginenote_api.login_user(pin.value).then(data => {

            //em casos de erros exibe o erro da api..
            if (data.error) {

                loading.value = false;
                wrong_pin.value = true;

                error_message.value = typeof data.error.pin != 'undefined' ? data.error.pin[0] : (data.error == 'absent_token' ? 'Código de acesso inexistente.' : (data.error == 'expired_token' ? 'Código de acesso expirado.' : 'Código de acesso inválido.'));

            }else if (data.user) {//em sucesso salva o token do user e manda ele para o menu
                wrong_pin.value = false;
                loading.value = false;

                utils.general.set_cookie('session', data.user, 30);

                router.push({name:'menu', query:{new:true}});

            }else if(data == false){
                loading.value = false;
                wrong_pin.value = true;
                error_message.value = "Houve um erro de conexão.";
            }else{
                loading.value = false;
                wrong_pin.value = true;
                error_message.value = "Algo deu errado.";
            }


            

        })

    }

</script>