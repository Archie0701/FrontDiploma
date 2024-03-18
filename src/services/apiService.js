import axios from 'axios';

const API_URL = 'http://3.71.200.223:8000/api';

const apiService = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Время ожидания ответа в миллисекундах
});

// Функция для входа пользователя
export const login = async (userData) => {
  try {
    const csrfToken = 'tiYz6lXdQGaKlSLP1EzUaFU5ttnRngnvNo8ageJgbGpLIfjxyRgF5TJOWxSoVxRO'; // Ваш CSRF-токен

    const response = await apiService.post('/login/', userData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      }
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Другие функции для работы с API могут быть добавлены здесь

export default apiService;
    