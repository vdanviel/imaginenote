<template>
    <div class="mt-10">
      <p class="text-center mb-10">
        Seja bem-vindo ao ImagineNote, para começarmos, por favor preencha as informações. Elas serão salvas em nosso sistema.
      </p>

    <WarningAlert tittle="Email enviado." desc="Enviamos um email para você com seu acesso." v-show="mailed"/>

    <div>
      <label for="phone">Email
        <input type="email" id="email" v-model="email" class="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500">
      </label>
      <label for="phone">Telefone
        <!--The @input event is then emitted by the component when its v-model internal state changes, and Vue updates the bound value accordingly.-->
        <input type="tel" v-model="phone" @input="handle_login" class="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500">
      </label>      
    </div>

      <!-- @agreed="close" é um emit. Emit somente funcionam DENTRO DE SEU COMPONENTE PAI. -->
      <!--<AgreeButton @agreed="close" :phone="phone" msg="Começar"/>-->
      <AgreeButton @agreed="mail_warning" :email="email" :phone="phone" msg="Começar"/>

    </div>
</template>

<script setup>

  import AgreeButton from "../../components/AgreeButton.vue";
  import WarningAlert from "../../components/alerts/WarningAlert.vue";

  let phone = null;
  let email = null;
  let mailed = null;

  const mask_phone = (event, reative) => {

    // Verifica se o usuário está apagando um caractere
    if (event.inputType === 'deleteContentBackward' || event.inputType === 'deleteContentForward') {
        // Obtém o índice do caractere que está sendo apagado

        //event.target.selectionStart: Este é um atributo que fornece a posição (o index) que o ponteiro está..
        let deleteIndex = event.target.selectionStart;
        
        // Substitui o caractere na posição específica por uma string vazia

        /*
          substring: Este é um método de string em JavaScript que retorna uma parte da string, com base nos índices fornecidos.
          No código, estamos usando substring(0, deleteIndex - 1) para obter a parte da string antes do caractere que está sendo apagado,
          e substring(deleteIndex) para obter a parte da string após o caractere que está sendo apagado.
        */

        let currentValue = currentValue.substring(0, deleteIndex - 1) + currentValue.substring(deleteIndex);
    }

    if (event.target.value.length == 2) {
      event.target.value = `(${event.target.value})`;
    }

    if ((event.target.value.length - 2) == 6) {
      event.target.value = `${event.target.value}-`;
    }

    // Atualize o valor da variável reativa phone
    reative.value = event.target.value;
  };

  const handle_login = (e) => {

      mask_phone(e, phone);  
    
  };

  const mail_warning = () => {

    mailed = true;

  }


</script>
