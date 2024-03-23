import axios from 'axios';

const API_URL = 'http://3.71.200.223:8000/api';

const apiService = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Время ожидания ответа в миллисекундах
});

// Функция для входа пользователя
export const login = async (userData) => {
  try {
    const response = await apiService.post('/token/', userData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    // Проверяем, что в ответе есть access token
    if (response.data.access) {
      // Сохраняем access token в localStorage
      localStorage.setItem('accessToken', response.data.access);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserData = async () => {
  try {
    // Получаем access token из localStorage
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('Access token not available');
    }

    const response = await apiService.get('users/me/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, // Добавляем access token в заголовок
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProposalCountData = async () => {
  try {
    // Получаем access token из localStorage
    const response = await apiService.get('proposals/get_proposals_count/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProposalData = async () => {
  try {
    // Получаем access token из localStorage
    const response = await apiService.get('proposals/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};


export const registration = async (userData) => {
  try {

    const response = await apiService.post('/proposers/', userData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Другие функции для работы с API могут быть добавлены здесь

export default apiService;
    