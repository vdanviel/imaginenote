<template class="mb-5">

  <ConfirmModal v-show="confirm_del_img_section" tittle="Tem certeza que deseja excluir todas as imagens?" :loading="deleting_img_section_loading" desc="Todas as imagens atreladas a essa nota serão excluidas permanentemente." @handle="delete_img_section" @close="confirm_del_img_section = false"/>
  <ConfirmModal v-show="confirm_del_video_section" tittle="Tem certeza que deseja excluir todos os vídeos?" :loading="deleting_video_section_loading" desc="Todos os vídeos atrelados a essa nota serão excluidos permanentemente." @handle="delete_video_section" @close="confirm_del_video_section = false"/>

  <div class="flex justify-center mt-[100px]" v-if="loading">
    <Loading/>
  </div>

  <div v-else class="p-4 h-screen flex flex-col">

    <SavedItem v-show="saved"/>

    <input @input="update_name" type="text" maxlength="50" class="text-black my-5 mb-8 font-bold text-[29px] w-[50%] border rounded-lg p-1" :value="note.name">

    <div class="flex flex-row  space-x-4 mb-4">
      <AddImage @render_image="addmidia"/>
      <AddVideo @render_video="addmidia"/>
      <AddAudio @render_audio="addmidia"/>  
    </div>

    <!-- img -->
    <ImageSection v-show="has_images" @delete_section="confirm_del_img_section = true" @show_gallery="show_img_gallery = true" @refresh_section="refresh_img_section" :midia="midia_images.slice(0, 9)" midia_name="Imagens" type="img"/>
    <ImageGallery v-show="show_img_gallery" :midia="midia_images" midia_name="Imagens" @close="show_img_gallery = false" @refresh_section="refresh_img_section"/>

    <!-- video -->
    <VideoSection v-show="has_videos" @delete_section="confirm_del_video_section = true" @show_gallery="show_video_gallery = true" @refresh_section="refresh_video_section" :midia="midia_videos.slice(0, 9)" midia_name="Vídeos" type="video"/>
    <VideoGallery v-show="show_video_gallery" :midia="midia_videos" midia_name="Vídeos" @close="show_video_gallery = false" @refresh_section="refresh_video_section"/>

    <!-- text -->
    <div contenteditable="true" class="border resize-none rounded-lg px-4 py-2 m-[30px] h-[100vh]" @input="update_text" @change="update_text" id="current_text" v-html="db_text"></div>

  </div>
  
</template>

<script setup>

  //components..
  ///image
  import AddImage from "../../components/note/image/AddImage.vue";
  import ImageSection from "../../components/note/image/ImageSection.vue";
  import ImageGallery from "../../components/note/image/ImageGallery.vue";
  //video
  import AddVideo from "../../components/note/video/AddVideo.vue";
  import VideoSection from "../../components/note/video/VideoSection.vue";
  import VideoGallery from "../../components/note/video/VideoGallery.vue";
  //audio
  import AddAudio from "../../components/note/audio/AddAudio.vue";
  //others
  import SavedItem from "../../components/SavedItem.vue";
  import Loading from "../../components/Loading.vue";
  import ConfirmModal from "../../components/alerts/ConfirmModal.vue";

  //functions..
  import { ref, reactive, onBeforeUnmount, onMounted} from 'vue';
  import { useRoute } from "vue-router"; 
  import { user, utils } from "../../utils/functions.js";
  import { firebase } from "../../utils/firebase.js";  

  //MODELS VUE
  //vue
  const route = useRoute();
  //note
  const note = reactive({ id: null, name: ''});//reactive - para os dados serem atualizados automaticamnete e exbidos no ui..
  const db_text = ref('');
  //assets
  const loading = ref(true);
  const saved = ref(false);
  const unsaved_changes = ref(false);//para saber se há alterações não salvas
  //midia image
  const midia_images = ref(null);
  const has_images = ref(false);
  const show_img_gallery = ref(false);
  const confirm_del_img_section = ref(false);//modal que surge se usuário pede para excluir sessão de iamgens..
  const deleting_img_section_loading = ref(false);
  //midia video
  const midia_videos = ref(null);
  const has_videos = ref(false);
  const show_video_gallery = ref(false);
  const confirm_del_video_section = ref(false);//modal que surge se usuário pede para excluir sessão de iamgens..
  const deleting_video_section_loading = ref(false);
  //midia audio
  const has_audios = ref(false);

  //recuperando as ifno da nota no canco e colocando nos v-models..
  utils.imaginenote_api.show_note(route.params.id).then(data => {
    note.id = data.id;
    note.name = data.name;
    db_text.value = data.text;
  });

  //LINDANDO COM NOTA E SOLICITAÇÕES PARA SALVAMENTO DA NOTA
  //salva o titulo da nota..
  const update_name = (event) => {
    note.name = event.target.value;
    saved.value = true; // Mostra SavedItem quando o nome é atualizado
    unsaved_changes.value = true;//indicando que o item ainda esta sendo salvo
    saveDebounced('name');//requisitando salvamento da nota..
  }

  //salva o texto da nota.
  const update_text = () => {
    saved.value = true; // Mostra SavedItem quando o nome é atualizado
    unsaved_changes.value = true;//indicando que o item ainda esta sendo salvo
    saveDebounced('text');//requisitando salvamento da nota..
  }

  //controlando a quantidade solicitções que em periodo de tempo que a atualização de texto ou titulo pode fazer em um segundo por intervalo com debounce concept.
  let debounceTimer;
  const saveDebounced = (who) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      save_note(who);
    }, 1000); // Aguarda 1 segundo após a última alteração
  };

  //salvando a nota no db..
  const save_note = (who) => {

    //se for o nome da nota..
    if (who == 'name') {
      
      //requisitando salvamento do nome ao db..
      utils.imaginenote_api.save_name_note(note.id, note.name).then((data) => {

        //se foi salvo então retorna note_name_saved, e o icone de salvamento desaparece..

        if (data.note_name_saved) saved.value = false; // Oculta SavedItem após salvar

        //alterando unsaved changes para true para que usuário possa sair da pagina sem alert de questionamento..
        unsaved_changes.value = false;

      });

    }

    //se for o texto da nota..
    if (who == 'text') {

      //requisitando salvamento do texto ao db..
      utils.imaginenote_api.save_text_note(note.id, document.getElementById('current_text').innerHTML).then((data) => {

        //se foi salvo então retorna note_name_saved, e o icone de salvamento desaparece..
        if(data.note_text_saved) saved.value = false;       

        //alterando unsaved changes para true para que usuário possa sair da pagina sem alert de questionamento..
        unsaved_changes.value = false;

      });
    }

  }

  //LIDANDO COM "unsaved_changes" - CASO USUÁRIO TENTE SAIR DA NOTA QUANDO A NOTA AINDA N FOI SALVA..

  // Adicione um ouvinte para o evento beforeunload 
  window.addEventListener('beforeunload', confirm_exit);

  // Função para exibir o prompt de confirmação
  function confirm_exit(event) {
    if (unsaved_changes.value == true) {
      // Defina a mensagem que será exibida no prompt
      event.returnValue = 'Você tem alterações não salvas. Tem certeza que deseja sair?';
    }
  }
  
  //evita de ficar chamando mensagem de confirmação para sair da nota se ela n salvou toda hr..
  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', confirm_exit);
  });

  //LIDANDO COM MIDIA

  //salvamento de midia
  const addmidia = async (midia_list) => {

    unsaved_changes.value = true;//indicanco que solicitçaõ esta sendo feita..

    //recuperando info do usuário..
    const pass = await user();

    //verificando que tipo de mídia é..
    //imagem
    if (midia_list[0].type.indexOf('image') !== -1) {//indexOf retorna -1 se n encontrar..
      
      saved.value = true; // Mostra SavedItem

      //criando o caminho onde as imagens vao ficar no google storage..
      const references = firebase.storage.create_references(midia_list, 'img', note.id);

      //upando imagens no google storage..
      const uploaded = await firebase.storage.upload(references, midia_list);

      //esperando a midia ser upada..
      if (uploaded == true){

        //depois da midia ser upada requisitamos os dados da pasta da midia requisitada do usuário..
        const imgmetadatas = await firebase_images(pass);

        //entao o arquivo novo vai estar prsente na pasta da midia e o vue atualizara automaticamnete a sessão da midia requirida no front..
        midia_images.value = imgmetadatas;

        //caso o v-show da sessão esteja em falso vamos dar true pra ela..
        has_images.value = true;

      }

      saved.value = false;//escondendo o "salvando..."
      unsaved_changes.value = false;//solicitação feita, possível fechar site..
      
    }
    
    if (midia_list[0].type.indexOf('video') !== -1) {//video

      saved.value = true; // Mostra SavedItem

      //criando o caminho onde as imagens vao ficar no google storage..
      const references = firebase.storage.create_references(midia_list, 'video', note.id);

      //upando imagens no google storage..
      const uploaded = await firebase.storage.upload(references, midia_list);

      //esperando a midia ser upada..
      if (uploaded == true){

        //depois da midia ser upada requisitamos os dados da pasta da midia requisitada do usuário..
        const videometadatas = await firebase_videos(pass);

        //entao o arquivo novo vai estar prsente na pasta da midia e o vue atualizara automaticamnete a sessão da midia requirida no front..
        midia_videos.value = videometadatas;

        //caso o v-show da sessão esteja em falso vamos dar true pra ela..
        has_videos.value = true;

      }

      saved.value = false;//escondendo o "salvando..."
      unsaved_changes.value = false;//solicitação feita, possível fechar site..

    }

    
  }

  //carrega os dados das imagens desse nota e exibe no front da sessão de iamgens..
  //image
  async function firebase_images(user) {

    try {
      
      // Pegando a referência da pasta de imagens
      const image_path = await firebase.storage.create_reference_by_path(user.email + '/' + 'img' + '/' + route.params.id);

      // Recuperando as referências de todos os arquivos dentro da pasta de imagens
      let refs_images = await firebase.storage.list_references_objs(image_path);

      // Recuperando os metadados desses arquivos
      const metadatas = await firebase.storage.get_metadatas(refs_images);

      // Recuperando as URLs desses arquivos
      const images_urls = await firebase.storage.get_files(refs_images);

      // Mapeando os metadados com as URLs correspondentes
      const metadatas_with_urls = metadatas.map((element, index) => {
        return Object.assign({ src: images_urls[index] }, element);
      });

      // Ordenando os metadados com base no atributo "updated"
      metadatas_with_urls.sort((a, b) => new Date(b.updated) - new Date(a.updated));

      return metadatas_with_urls;

    } catch (error) {

      console.error('error-imaginenote:', error);
      return false;

    }

  }

  //deletar sessão de imagens..
  const delete_img_section = async () => {

    //loading aparece na sessão sendo deletada
    deleting_img_section_loading.value = true;

    //recuperando info do usuário..
    const pass = await user();

    // Pegando a referência da pasta de imagens
    const image_path = await firebase.storage.create_reference_by_path(pass.email + '/' + 'img' + '/' + route.params.id);

    // Recuperando as referências de todos os arquivos dentro da pasta de imagens
    let refs_images = await firebase.storage.list_references_objs(image_path);

    //pega todas as referencias das imagens dessa nota e exclui elas..
    await firebase.storage.delete(refs_images);

    //some com o a sessão de imagens..
    has_images.value = false;

    //loading false para que na proxima vez q add a sessão..
    deleting_img_section_loading.value = false;

    //some com o modal de confirmação de exlusão da sessão de imagens..
    confirm_del_img_section.value = false;

    

  }

  const refresh_img_section = async () => {

    try {
      
      const pass = await user();

      const imgmetadatas = await firebase_images(pass);

      if(imgmetadatas.length == 0) has_images.value = false;

      midia_images.value = imgmetadatas;

      return true;

    } catch (error) {
      
      console.error(error);

      return false;

    }
    
  }

  //video
  async function firebase_videos(user) {

    try {
      
      // Pegando a referência da pasta de videos
      const video_path = await firebase.storage.create_reference_by_path(user.email + '/' + 'video' + '/' + route.params.id);

      // Recuperando as referências de todos os arquivos dentro da pasta de videos
      let refs_videos = await firebase.storage.list_references_objs(video_path);

      // Recuperando os metadados desses arquivos
      const metadatas = await firebase.storage.get_metadatas(refs_videos);

      // Recuperando as URLs desses arquivos
      const videos_urls = await firebase.storage.get_files(refs_videos);

      // Mapeando os metadados com as URLs correspondentes
      const metadatas_with_urls = metadatas.map((element, index) => {
        return Object.assign({ src: videos_urls[index] }, element);
      });

      // Ordenando os metadados com base no atributo "updated"
      metadatas_with_urls.sort((a, b) => new Date(b.updated) - new Date(a.updated));

      return metadatas_with_urls;

    } catch (error) {

      console.error('error-imaginenote:', error);
      return false;

    }

  }
  
  const refresh_video_section = async () => {

    try {
      
      const pass = await user();

      const videometadatas = await firebase_videos(pass);

      if(videometadatas.length == 0) has_videos.value = false;

      midia_videos.value = videometadatas;

      return true;

    } catch (error) {
      
      console.error(error);

      return false;

    }
    
  }

  const delete_video_section = async () => {

    //loading aparece na sessão sendo deletada
    deleting_video_section_loading.value = true;

    //recuperando info do usuário..
    const pass = await user();

    // Pegando a referência da pasta de videos
    const video_path = await firebase.storage.create_reference_by_path(pass.email + '/' + 'video' + '/' + route.params.id);

    // Recuperando as referências de todos os arquivos dentro da pasta de imagens
    let refs_videos = await firebase.storage.list_references_objs(video_path);

    //pega todas as referencias das imagens dessa nota e exclui elas..
    await firebase.storage.delete(refs_videos);

    //some com o a sessão de imagens..
    has_videos.value = false;

    //loading false para que na proxima vez q add a sessão..
    deleting_video_section_loading.value = false;

    //some com o modal de confirmação de exlusão da sessão de imagens..
    confirm_del_video_section.value = false;


  }
  
  //carregando midias ao entrar na pagina..
  onMounted(async () => {

    //recuperando info do usuário..
    const pass = await user();

    //v-show das sessões de..
    //imagens
    const imgmetadatas = await firebase_images(pass);
    if (imgmetadatas.length === 0) {
      has_images.value = false;
    } else {
      has_images.value = true;
    }
    //videos
    const videometadatas = await firebase_videos(pass);
    if (videometadatas.length === 0) {
      has_videos.value = false;
    } else {
      has_videos.value = true;
    }

    //definindo dados nos v-models de midia respectivos..
    midia_images.value = imgmetadatas;//imagem
    midia_videos.value = videometadatas;//video

    //carregamento da página concluído...
    loading.value = false;

  });

</script>