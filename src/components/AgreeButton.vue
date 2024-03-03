<template>
  <button @click='handle_click' class="bg-green-500 shadow hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
    {{ msg }}
  </button>
</template>

<script setup>

  import { register_user, login_user, get_ip, set_cookie, encrypt } from "../utils/functions.js";
  import { useRouter } from "vue-router";
  //recuperando metodos do App.vue, e instanciando eles nessas consts (vatraiveis) com defineProps()..
  const {phone, msg, email} = defineProps(['email' ,'phone', 'msg']);//defineProps() - define props que vem do pai na <ChamadoDoComponente prop="value"/>

  //instanciando os eventos emits do componente pai..
  //const emit = defineEmits(['agreed']);

  const handle_click = () => {
    
    accept_cookie();

    //chamando evento emit 'agreed_cookie'..
    //emit('agreed')

    useRouter().push({name:'menu'})

  }

  //quando o user aceitar o cookie..
  const accept_cookie = async () => {

    //chamando promisse do ip..
    const ip_info = get_ip();
    
    //utilizando o 'data' para definir as informações do usuario registrado / logado..
    ip_info.then(data => {

      //let info = {ip: data.ip, address: data.city, country: data.country, local: data.loc};//criando objeto com informações do user..

      register_user(email, phone, data.ip, data.city, data.country, data.loc);//registrando o user (se já registrado não ocorrerá ação e retornará false)

      let login = login_user(data.ip);//logando com o ip do usuário..

      login.then(data => set_cookie('user', encrypt(data, data.token), 5));//definindo o cookie com as informações do usuário, e crytografando

    });

    

  }

</script>
