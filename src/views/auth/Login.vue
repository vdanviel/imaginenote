<template>
    <div class="mt-10 lg:m-10 lg:flex lg:flex-col lg:items-center">
      <p class="text-center mb-10 lg:w-[650px]">
        Seja bem-vindo ao ImagineNote, para começarmos, por favor insira seu e-mail. Será enviado um e-mail de acesso para você e seus dados serão salvos em nosso sistema.
      </p>

      <!--<<WarningAlert tittle="Email enviado." desc="Enviamos um email para você com seu acesso." v-show="mailed"/>-->

      <div class="flex flex-col">
        <label for="phone">Email</label>
        <input type="email" id="email" v-model="email" class="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 lg:w-96 lg:mb-[30px]">
        
        <!--<label for="phone">Telefone</label>-->
        <!--The @input event is then emitted by the component when its v-model internal state changes, and Vue updates the bound value accordingly.-->
        <!--<input type="tel" v-model="phone" @input="handle_login" class="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 lg:w-fit">-->
        
      </div>

      <!-- @agreed="close" é um emit. Emit somente funcionam DENTRO DE SEU COMPONENTE PAI. -->
      <!--<AgreeButton @agreed="agreed_callback" :phone="phone" msg="Começar"/>-->
      <Loading v-show="loading"/>
      <AgreeButton @loading="show_loading" @disagreed="disagreed_callback" :email="email" msg="Enviar"/>
      

    </div>

</template>

<script setup>

  import AgreeButton from "../../components/AgreeButton.vue";
  //import WarningAlert from "../../components/alerts/WarningAlert.vue";
  import Loading from "../../components/Loading.vue";
  import { ref } from "vue";

  //ref() - consegue recuperar dados de v-models..
  let email = ref();
  //let mailed = ref(null);
  let loading = ref(false);

  const show_loading = () => {

    loading.value = true;

  }

  const disagreed_callback = () => {

    loading.value = false;

  }


</script>
