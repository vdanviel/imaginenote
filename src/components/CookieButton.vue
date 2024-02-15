<template>
  <button @click='handle_click' class="bg-green-500 shadow hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full m-[10px]">
    {{ msg }}
  </button>
</template>

<script setup>

import { register_user, login_user, get_ip, set_cookie } from "../utils/functions.js";

//recuperando metodos do App.vue, e instanciando eles nessas consts (vatraiveis) com defineProps()..
const {msg} = defineProps(['msg']);//defineProps() - define props que vem do pai na <ChamadoDoComponente prop="value"/>
import CryptoJS from 'crypto-js';

//instanciando os eventos emits do componente pai..
const emit = defineEmits(['agreed']);

const handle_click = () => {
  
  accept_cookie();

  //chamando evento emit 'agreed_cookie'..
  emit('agreed')

  window.location.reload();

}

//quando o user aceitar o cookie..
const accept_cookie = async () => {

  //chamando promisse do ip..
  const ip_info = get_ip();
  
  //utilizando o 'data' para definir as informações do usuario registrado / logado..
  ip_info.then(data => {

    //let info = {ip: data.ip, address: data.city, country: data.country, local: data.loc};//criando objeto com informações do user..

    register_user(data.ip, data.city, data.country, data.loc);//registrando o user (se já registrado não ocorrerá ação e retornará false)

    let login = login_user(data.ip);//logando com o ip do usuário..

    login.then(data => set_cookie('user', CryptoJS.AES.encrypt(data, JSON.parse(data).token), 45));//definindo o cookie com as informações do usuário, e crytografando

  });

  

}

</script>
