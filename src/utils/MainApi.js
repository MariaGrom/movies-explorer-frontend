class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers
  }

  _handleResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return res
    .json()
    .then (({message, error})=>{
      res.message = message || error `Ошибка ${res.status}`;
      return Promise.reject(res.status);
    })
    
  }

  // Регистрация пользователя 
  register(data) {
    return fetch(`${this._url}/signup`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(this._handleResponce)
      
  };

  // Авторизация пользователя 
  login(data) {
    return fetch(`${this._url}/signin`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(this._handleResponce)
  }

  // Установка токена
  setToken(token) {
    this._headers.Authorization = `Bearer ${ token }`
  }

  // Получаем данные профиля
  getUserInfo() {
    return fetch(`${this._url}/users/me`,
      {
        method: 'GET',
        headers: this._headers,
      })
      .then(this._handleResponce)
  }

  // Обновление данных профиля
  setUserInfo({name, email}) {
    return fetch(`${this._url}/users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({ name, email })
      })
      .then(this._handleResponce)
  }

}

export const mainApi = new MainApi({
  url:"http://localhost:3003",

  // url: "https://api.mariagrom.movies.nomoredomains.club",
  headers: {
    "content-type": "application/json",
    "Authorization": "",
  }
})