<template>
  <AttentionAlert :tittle="state.error" v-show="state.show" class="mb-[25px]"/>
  <button @click='handle_click' class="bg-green-500 shadow hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
    {{ msg }}
  </button>
</template>

<script setup>
  import { utils } from "../utils/functions.js";
  import {defineProps, defineEmits, reactive} from "vue";
  import AttentionAlert from "../components/alerts/AttentionAlert.vue";

  //recuperando vars do lgoin.vue, e instanciando eles nessas consts (vatraiveis) com defineProps()..
  //defineProps() - define props que vem do pai na <ChamadoDoComponente prop="value"/>
  const prop = defineProps(['email', 'msg']);

  //criando eventos para serem acionados pelo componente pai..
  const emit = defineEmits(['agreed']);
  
  //declarando vars do alerta de erro..
  const state = reactive({
    error: null,
    show: false
  });

  const handle_click = () => {
    
    accept_cookie();
    
  }

  //quando o user aceitar o cookie..
  const accept_cookie = async () => {

    //chamando promisse do ip..
    const ip_info = utils.services.get_ip();
    
    //utilizando o 'data' para definir as informações do usuario registrado / logado..
    ip_info.then(data => {

      //registrando o user (será enviado o email para ele)
      let register = utils.imaginenote_api.register_user(prop.email, data.ip, data.city, data.country, data.loc);

      //chamando evento emit 'agreed_cookie'..
      register.then(data => {

        console.log(data);

        let json = JSON.parse(data);

        console.log(json);

        if (json.error) {
          //O método Object.values(meuObjeto) retorna um array com os valores do objeto
          if(typeof json.error.validator != 'undefined'){
            state.error = Object.values(json.error.validator.customMessages)[0];
          }else{
            state.error = Object.values(json.error);
          }

          state.show = true;
        }else{
          // eslint-disable-next-line vue/no-mutating-props
          prop.email = '';
          state.show = false;
          emit('agreed');
        }

      })

    });

    

  }

</script>
