<template>
  <AttentionAlert :tittle="state.error" v-show="state.show" class="mb-[25px]"/>
  <button id="sender" @click='handle_click' class="bg-[#FDE767] hover:bg-[#f1da52] text-white font-bold py-2 px-4 rounded cursor-pointer">
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

  const key_down_callback = (event) => {
    if(event.key == "Enter"){
      document.querySelector("#sender").style.background = '#f1da52';    
      emit('loading');
      accept_cookie();
    }
  };

  document.addEventListener('keydown', key_down_callback);

  const handle_click = async (e) => {

    emit('loading');
    e.currentTarget.disabled = true;
    await accept_cookie();
    e.currentTarget.disabled = false;
    
  }

  //quando o user aceitar o cookie..
  const accept_cookie = async () => {

    /*ABOLIDO..
      //chamando promisse do ip..
      //const ip_info = utils.services.get_ip();
      
      //utilizando o 'data' para definir as informações do usuario registrado / logado..
      //ip_info.then(data => {});
    */

    document.removeEventListener('keydown', key_down_callback);

    //registrando o user (será enviado o email para ele)
    let register = utils.imaginenote_api.register_user(prop.email, '0.0.0.0', 'none', 'none', 'none');

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

    });

    document.addEventListener('keydown', key_down_callback);

  }

</script>
