import CryptoJS from 'crypto-js';

const utils = {

  //GENERAL
  general: {
    get_cookie(index){

      //verificando se existe algum cookie
      if (document.cookie == null || document.cookie == '') {
    
        //se não retorna false..
        return false;
    
      }else{//se existir
    
        //recuperando todos cookies..
        let cookies = document.cookie;
    
        //separando os i e os values com o separador;
        let cookies_items = cookies.split(';');

        //iterando sobre os items dos cookies
        for (const item of cookies_items) {
    
          //separando o nome do cookie e o valor do cookie..
          const [raw_cookie_name, raw_cookie_value] = item.split('=');

          //tirando espeços desnecessários do nome e do valor do cookie..
          const cookie_name = String(raw_cookie_name).trim();
          const cookie_value = String(raw_cookie_value).trim();
    
          //se o nome do cookie for o mesmo que o cookie que procuramos..
          if (cookie_name == index) {
    
            //ele retorna o valor desse cookie..
            return cookie_value;
          }
    
        }
    
      }
    
    },
      
    set_cookie (name, value, days){
        
      //definindo tempo
      let time = new Date();
      
      //definindo o tempo valido do cookie que é hoje e mais os dias que chamamos na função..
      time.setTime(time.getTime() + (days*24*60*60*1000));
      
      //definindo o cookie..
      document.cookie = `${name} = ${value}; expires = ${time.toUTCString}; path = /;`;
      
      return true;
    
    },
    
    encrypt(data, password){
    
      let en = CryptoJS.AES.encrypt(data, password);
    
      return en;
    
    },
    
    decrypt(encrypted_code, password) {
    
      let encrypted = CryptoJS.AES.decrypt(encrypted_code, password); 
    
      let response = encrypted.toString(CryptoJS.enc.Utf8);
    
      return response;
    },

    delete_cookie(name) {
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    },

    logout(){
      
      this.delete_cookie('session');

    }

  },


  //OTHERS APIS
  services: {
    async get_ip () {

      try {
      
        //as informações do ip dele serão recuperadas..
        const response = await fetch('https://ipinfo.io/json?token=a53453970abaaf', {
          method:'GET'
        }).then(response => response.json());
  
        return response
  
      } catch (error) {
  
        console.error(error);
  
      }
  
    }

  },

  //API LARAVEL
  imaginenote_api: {

    async register_user (raw_email, raw_ip, raw_address, raw_country, raw_loc) {
      try {

        const response = await fetch('http://127.0.0.1:8000/api/user/enter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
          },
          mode: 'cors',
          body: JSON.stringify({
            email: raw_email,
            ip: raw_ip,
            address: raw_address,
            country: raw_country,
            location: raw_loc
          })
        }).
        then(data => data.json());
        
        //console.log(response);

        return response;
    
      } catch (error) {
        console.error(error);
      }
    },

    async login_user (raw_pin){

    try {

      const response = await fetch('http://127.0.0.1:8000/api/enter/validate',
      {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pin: raw_pin
        }),
        mode: 'cors'
      }
      ).then(data => data.json());

        return response;

      } catch (error) {
        console.error(error);
      }

    },

    async get_user_data(raw_token) {

      try {
    
        const response = await fetch('http://127.0.0.1:8000/api/data', {
          method: 'POST',
          body: JSON.stringify({
            token: raw_token
          }),
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(data => data.json());
      
        return response;

      } catch (error) {

        console.error(error);

      }

    },

    async user_notes(raw_id) {

      try {
    
        const response = await fetch('http://127.0.0.1:8000/api/note/all/' + raw_id, {
          method: 'GET'
        }).then(data => data.json());
      
        return response;

      } catch (error) {

        console.error(error);

      }

    },

    async register_user_note(raw_user_id){

      // Define o fuso horário para 'America/New_York'
      const date = new Date().toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'});

      try {

        const response = await fetch('http://127.0.0.1:8000/api/note/register',
        {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id_user: raw_user_id,
            name: `Nova anotação em ${date}`
          }),
          mode: 'cors'
        }
        ).then(data => data.json());

        return response;

      } catch (error) {
        
        console.error(error);

      }

    },

    async save_text_note(raw_note_id, raw_text){

      try {

        const response = await fetch('http://127.0.0.1:8000/api/note/text/save',
        {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: raw_note_id,
            text: raw_text
          }),
          mode: 'cors'
        }
        ).then(data => data.json());

        return response;

      } catch (error) {
        
        console.error(error);

      }

    },

    async save_name_note(raw_note_id, raw_name){

      try {

        const response = await fetch('http://127.0.0.1:8000/api/note/name/save',
        {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: raw_note_id,
            name: raw_name
          }),
          mode: 'cors'
        }
        ).then(data => data.json());

        return response;

      } catch (error) {
        
        console.error(error);

      }

    },

    async show_note(raw_note_id){

      try {
        
        const response = await fetch( `http://127.0.0.1:8000/api/note/${raw_note_id}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(data => data.json());

        return response;

      } catch (error) {
        
        console.error(error)

      }

    }

  },

}

//USER DATA
const user = async () => {
  try {
    const user = await utils.imaginenote_api.get_user_data(utils.general.get_cookie('session'));
    console.log(user);
    return user;
    
  } catch (error) {

    console.error(error);

  }
}

export {utils, user};