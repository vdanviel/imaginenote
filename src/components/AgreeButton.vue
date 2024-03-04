<template>
  <button @click='handle_click' class="bg-green-500 shadow hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
    {{ msg }}
  </button>
</template>

<script setup>
  import { utils } from "../utils/functions.js";

  //recuperando metodos do App.vue, e instanciando eles nessas consts (vatraiveis) com defineProps()..
  const {phone, msg, email} = defineProps(['email' ,'phone', 'msg']);//defineProps() - define props que vem do pai na <ChamadoDoComponente prop="value"/>

  //instanciando os eventos emits do componente pai..
  const emit = defineEmits(['agreed']);

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
      let register = utils.imaginenote_api.register_user(email, phone, data.ip, data.city, data.country, data.loc);

      //chamando evento emit 'agreed_cookie'..
      register.then(data => {

        //convertendo json string para json objeto..
        let obj = JSON.parse(data);

        //se existir um erro retorna false..
        if (obj.error) {
          return false;
        }else{
          //se não é emitido o evento agreed, que aciona a func de aviso de envio de email mail_warning...
          emit('agreed')
          return true;
        }

      })
      
    });

    

  }

</script>
