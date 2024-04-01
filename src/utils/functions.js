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
          const [cookie_name, cookie_value] = item.split('=');
    
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
    
        const response = await fetch('http://127.0.0.1:8000/api/data?token=' + raw_token, {
          method: 'GET'
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

      let now = new Date();

      try {

        const response = await fetch('http://127.0.0.1:8000/api/note/register',
        {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id_user: raw_user_id,
            name: `Nova anotação em ${now.getDate()}/${now.getMonth()}/${now.getFullYear()} - ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
          }),
          mode: 'cors'
        }
        ).then(data => data.json());

        return response;

      } catch (error) {
        
        console.error(error);

      }

    }

  },

}

//USER DATA
const user = async () => {
  try {

    return await utils.imaginenote_api.get_user_data(utils.general.get_cookie('session'));
    
  } catch (error) {

    console.error(error);

  }
}

export {utils, user};