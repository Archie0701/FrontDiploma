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

export const criterias = async () => {
  try {
    // Получаем access token из localStorage
    const response = await apiService.get('criterias/', {
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

export const fetchNewProposalData = async () => {
  try {
    // Получаем access token из localStorage
    const response = await apiService.get('proposals/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    // Фильтруем только предложения со статусом "New"
    const newProposals = response.data.filter(proposal => proposal.status === 'New');
    
    return newProposals;
  } catch (error) {
    throw error;
  }
};

export const fetchAcceptedProposalData = async () => {
  try {
    // Получаем access token из localStorage
    const response = await apiService.get('proposals/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    const newProposals = response.data.filter(proposal => proposal.status === 'Accepted');
    
    return newProposals;
  } catch (error) {
    throw error;
  }
};

export const fetchProposersId = async (id) => {
  try {
    // Получаем access token из localStorage
    const response = await apiService.get(`/proposers/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const acceptProposal = async (proposalId, selectedCriteriaIds) => {
  try {
    // Отправляем запрос на принятие предложения с использованием proposalId и передачей критериев в теле запроса
    const response = await apiService.put(`/proposals/${proposalId}/accept/`, { criteria: selectedCriteriaIds });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const declineProposal = async (proposalId, selectedCriteriaIds) => {
  try {
    // Отправляем запрос на отклонение предложения с использованием proposalId и передачей критериев в теле запроса
    const response = await apiService.put(`/proposals/${proposalId}/decline/`, {criteria: selectedCriteriaIds });
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
    