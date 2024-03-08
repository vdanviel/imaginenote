<template>
    <div class="mt-10 lg:m-10 lg:flex lg:flex-col lg:items-center">
      <p class="text-center mb-10 lg:w-[650px]">
        Seja bem-vindo ao ImagineNote, para começarmos, por favor insira seu e-mail. Será enviado um e-mail de acesso para você e seus dados serão salvos em nosso sistema.
      </p>

      <WarningAlert tittle="Email enviado." desc="Enviamos um email para você com seu acesso." v-show="mailed"/>

      <div class="flex flex-col">
        <label for="phone">Email</label>
        <input type="email" id="email" v-model="email" class="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 lg:w-96 lg:mb-[30px]">
        
        <!--<label for="phone">Telefone</label>-->
        <!--The @input event is then emitted by the component when its v-model internal state changes, and Vue updates the bound value accordingly.-->
        <!--<input type="tel" v-model="phone" @input="handle_login" class="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 lg:w-fit">-->
        
      </div>

      <!-- @agreed="close" é um emit. Emit somente funcionam DENTRO DE SEU COMPONENTE PAI. -->
      <!--<AgreeButton @agreed="close" :phone="phone" msg="Começar"/>-->
      <Loading v-show="loading"/>
      <AgreeButton @loading="show_loading" @disagreed="disagreed_callback" @agreed="agreed_callback" :email="email" msg="Enviar"/>
      

    </div>

</template>

<script setup>

  import AgreeButton from "../../components/AgreeButton.vue";
  import WarningAlert from "../../components/alerts/WarningAlert.vue";
  import Loading from "../../components/Loading.vue";
  import { ref } from "vue";

  //ref() - consegue recuperar dados de v-models..
  let email = ref();
  let mailed = ref(null);
  let loading = ref(false);

/*   const mask_phone = (event, reative) => {

    // Verifica se o usuário está apagando um caractere
    if (event.inputType === 'deleteContentBackward' || event.inputType === 'deleteContentForward') {

        //event.target.selectionStart: Este é um atributo que fornece a posição (o index) que o ponteiro está..
        //let delete_index = event.target.selectionStart;
        //charAt - é a posição atual q o ponteiro esta..

        
        //console.log(Object.getPrototypeOf(reative)); - vendo prototype de reative
        //console.log(reative.slice(0, reative.length - 1));

        event.target.value = event.target.value.slice(0, reative.length - 1);
       
    }

    if (event.target.value.length == 2) {
      event.target.value = `(${event.target.value})`;
    }

    if ((event.target.value.length - 2) == 6) {
      event.target.value = `${event.target.value}-`;
    }

    // Atualize o valor da variável reativa phone
    //reative.value = event.target.value;
  };

  const handle_login = (e) => {

      mask_phone(e, phone);
    
  }; */


  const show_loading = () => {

    loading.value = true;

  }

  const agreed_callback = () => {

    loading.value = false;
    mailed.value = true;
    

  }

  const disagreed_callback = () => {

    loading.value = false;
    

  }


</script>
