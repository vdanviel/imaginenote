// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";
import { user } from "./functions.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCk2DagXpC6joknLv20FddyknKq-eAbaDw",
  authDomain: "portfolio-4c77a.firebaseapp.com",
  projectId: "portfolio-4c77a",
  storageBucket: "portfolio-4c77a.appspot.com",
  messagingSenderId: "723074063272",
  appId: "1:723074063272:web:e6cea97540356175845b9d",
  measurementId: "G-GGZ72Z4XX6"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const storage = getStorage();

const firebase = {

  storage: {

    //função que cria referencia para o google firebase (o caminho onde a midia enviada ira ficar) ter acesso a esse arquivos para ele ir para nosso bucket (gs://portfolio-4c77a.appspot.com)..
    async create_references(files, type, id) {

      try {
        // Espera a resolução da promise retornada por user()
        const pass = await user();
    
        const references = [];
        let i = 0;
        for (const key in files) {

          // Cria o caminho no Firebase Storage
          if (key != 'item' && key != 'length') references[i] = ref(storage, pass.email + '/' + type + '/' + id + '/' + files[key].name);//não conta com nomes de atributos ou metodos do FileList.. (item/length)

          i++;
        }
    
        // Retorna as referências
        return references;

      } catch (error) {
        console.error(error);
        throw error; // Rejeita a promise se ocorrer um erro
      }

    },

    async create_reference_by_path(path) {

      try {

        let reference = ref(storage, path);//não conta com nomes de atributos ou metodos do FileList.. (item/length)

        // Retorna a referencia
        return reference;

      } catch (error) {
        console.error(error);
        throw error; // Rejeita a promise se ocorrer um erro
      }

    },

    async upload(references, files) {

      try {
        // Recuperando as referências do Google Firebase
        const greferences = await references;
    
        // Verificando se o array de referências de caminho do Google tem o mesmo tamanho que os arquivos enviados
        if (greferences.length === Object.keys(files).length) {
          // Array para armazenar as promessas de upload
          const uploadPromises = [];
    
          // Itera sobre as referências e faz o upload de cada arquivo
          greferences.forEach((reference, i) => {
            // Adiciona a promise de upload ao array de promessas
            uploadPromises.push(uploadBytes(reference, files[i]));
          });
    
          // Aguarda a resolução de todas as promessas de upload
          const results = await Promise.all(uploadPromises);
    
          // Verifica se todas as promessas de upload foram bem-sucedidas
          const success = results.every(data => data.metadata.bucket);
    
          if (success) {
            return true;
          } else {
            console.error('error-imaginenote: not possible to upload midia to Google Firebase Storage due to an error on the request to Google.');
            console.log({ 'error-firebase': results });
            return false;
          }

        } else {
          console.error('error-imaginenote: not possible to upload the midia, the files and Google Firebase References have different sizes.');
          return false;
        }
        
      } catch (error) {
        console.error(error);
        throw error; // Rejeita a promise se ocorrer um erro
      }

    },

    async get_files(references) {
      try {
        const urls = []; // Criando um array para armazenar as URLs dos arquivos
        const array = await references; // Aguardando a resolução da promessa
    
        for (const element of array) {
          try {
            const url = await getDownloadURL(element); // Aguardando a resolução da promessa
            urls.push(url); // Adicionando a URL ao array
          } catch (error) {
            console.error(error); // Lidando com erros individualmente
          }
        }
    
        return urls; // Retornando o array de URLs
      } catch (error) {
        console.error(error);
        throw error; // Rejeita a promise se ocorrer um erro
      }
    }

  }
  

}

export {firebase};