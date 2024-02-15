//GENERAL
const get_cookie = (index) => {

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
  
  }
  
const set_cookie = (name, value, days) => {
    
//definindo tempo
let time = new Date();

//definindo o tempo valido do cookie que é hoje e mais os dias que chamamos na função..
time.setTime(time.getTime() + (days*24*60*60*1000));

//definindo o cookie..
document.cookie = `${name} = ${value}; expires = ${time.toUTCString}; path = /;`;

return true;

}

export { get_cookie, set_cookie };

//OTHERS APIS
const get_ip = async () => {

  try {
   
    //as informações do ip dele serão recuperadas..
    const response = await fetch('https://ipinfo.io/json?token=a53453970abaaf', {
      method:'GET'
    }).then(response => response.json());

    return response

  } catch (error) {

    console.error(error);

  }

};

export { get_ip };

//API LARAVEL
const register_user = async (raw_ip, raw_address, raw_country, raw_loc) => {
    try {
  
      const response = await fetch('http://127.0.0.1:8000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        mode: 'cors',
        body: JSON.stringify({
          ip: raw_ip,
          address: raw_address,
          country: raw_country,
          location: raw_loc
        })
      }).
      then(data => data.text());
  
      if (response == 1 || response == true) {
        return true;
      }else{
        return false;
      }
  
    } catch (error) {
      console.error(error);
      return false;
    }
};

const login_user = async(raw_ip) => {

try {

    const response = await fetch('http://127.0.0.1:8000/api/login',
    {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({
        ip: raw_ip
    })
    }
    ).then(data => data.text());

    return response;

} catch (error) {
    console.error(error);
}

};

const user_tablatures = async(raw_ip) => {

  try {
  
    const response = await fetch('http://127.0.0.1:8000/api/guitar/' + raw_ip, {
      method: 'GET'
    }).then(data => data.json());
  
    return response;

  } catch (error) {

    console.error(error);

  }

};

export {register_user, login_user, user_tablatures};