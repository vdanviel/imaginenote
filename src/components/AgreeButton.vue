<template>
  <AttentionAlert :tittle="state.error" v-show="state.show" class="mb-[25px]"/>
  <button @click='handle_click' class="bg-green-500 shadow hover:bg-green-600 text-white font-bold py-2 px-4 rounded cursor-pointer">
    {{ msg }}
  </button>
</template>

<script setup>
  import { utils } from "../utils/functions.js";
  import { useRouter } from "vue-router";
  import {defineProps, defineEmits, reactive} from "vue";
  import AttentionAlert from "../components/alerts/AttentionAlert.vue";

  const router = useRouter();

  //recuperando vars do lgoin.vue, e instanciando eles nessas consts (vatraiveis) com defineProps()..
  //defineProps() - define props que vem do pai na <ChamadoDoComponente prop="value"/>
  const prop = defineProps(['email', 'msg']);

  //criando eventos para serem acionados pelo componente pai..
  const emit = defineEmits(['loading', 'disagreed']);
  
  //declarando vars do alerta de erro..
  const state = reactive({
    error: null,
    show: false
  });

  const handle_click = () => {
    
    emit('loading');
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

        emit('disagreed');

        let json = data;

        if(data == false){
          state.error = "Houve um erro de conexão."
          state.show = true;
          emit('disagreed');
        }

        if (json.error) {

          if(typeof json.error.validator != 'undefined'){
            //O método Object.values(meuObjeto) retorna um array com os valores do objeto
            state.error = Object.values(json.error.validator.customMessages)[0];
          }else{
            state.error = json.error;
          }

          emit('disagreed');
          state.show = true;
        }

        
      if (typeof json.new_user != 'undefined' || typeof json.existing_user != 'undefined') {
        router.push({name:'pin'})
      }

      })

    });

    

  }

</script>
