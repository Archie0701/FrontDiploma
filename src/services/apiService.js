import axios from 'axios';

const API_URL = 'http://3.71.86.137:8000/api';

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

    if (response.data.access) {
      localStorage.setItem('accessToken', response.data.access);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserData = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not available');
    }
    const response = await apiService.get('users/me/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProposalCountData = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not available');
    }
    const response = await apiService.get('proposals/get_proposals_count/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProposalCountDataByDays = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not available');
    }
    const response = await apiService.get('proposals/proposals_count_by_days/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const criterias = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not available');
    }
    const response = await apiService.get('criterias/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchNewProposalData = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not available');
    }
    const response = await apiService.get('/proposals/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    const newProposals = response.data.filter(proposal => proposal.status === 'New');
    
    return newProposals;
  } catch (error) {
    throw error;
  }
};

export const fetchProposalData = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not available');
    }
    const response = await apiService.get('/proposals/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const gradeProposal = async (proposalId, grading, score ) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Access token not available');
  }
  try {
    const response = await apiService.post(`/proposals/${proposalId}/gradings/`, 
      { grading, score },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Добавляем access token в заголовок
        }
      }
    );
    
    return response.data;
  } catch (error) {
    throw error;
  }
};  

export const getGrades = async (proposalId) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Access token not available');
  }
  try {
    const response = await apiService.get(`/proposals/${proposalId}/gradings/`, 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};  

export const addComment = async (proposalId, text ) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not available');
    }
    console.log(proposalId);
    const response = await apiService.post(`/proposals/${proposalId}/add_comments/`, 
      { text },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, 
        }
      }
    );
    
    return response.data;
  } catch (error) {
    throw error;
  }
};  

export const getComments = async (proposalId) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not available');
    }
    // Получаем access token из localStorage
    const response = await apiService.get(`/proposals/${proposalId}/get_comments/`, {
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


export const fetchAcceptedProposalData = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not available');
    }
    const response = await apiService.get('/proposals/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    const newProposals = response.data.filter(proposal => proposal.status === 'Accepted');
    
    return newProposals;
  } catch (error) {
    throw error;
  }
};

export const fetchGradedProposalData = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not available');
    }
    const response = await apiService.get('/proposals/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    const newProposals = response.data.filter(proposal => proposal.status === 'Graded');
    
    return newProposals;
  } catch (error) {
    throw error;
  }
};

 export const updateProposalStatusGraded = async (proposalId, status) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token not available');
      }
      const response = await apiService.put(`/proposals/${proposalId}/change_status/`, 
        { status },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          }
        }
      );
      
      console.log("Proposal status updated successfully:", response.data);
    } catch (error) {
      throw error;
    }
  };

  export const setSpecialist = async (proposalId, specialist, deadline) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token not available');
      }
      await apiService.put(`/proposals/${proposalId}/set_specialist/`, 
        { specialist, deadline },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          }
        }
      );

      await apiService.put(`/proposals/${proposalId}/change_status/`, 
        { status: 'In progress' },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          }
        }
      );
      
    } catch (error) {
      throw error;
    }
  };

  

  export const updateProposalStatusArchive = async (proposalId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token not available');
      }
  
      const response = await apiService.put(`/proposals/${proposalId}/archive/`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          }
        }
      );
      
      console.log("Proposal status updated successfully:", response.data);
    } catch (error) {
      throw error;
    }
  };

export const fetchGradingsData = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not available');
    }
    const response = await apiService.get('proposals/grading_score/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const fetchUsersId = async () => {
  try {
    // Получаем id из URL
    const urlSegments = window.location.pathname.split('/');
    const id = urlSegments[urlSegments.length - 1];

    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('Access token not available');
    }


    // Получаем access token из localStorage
    const response = await apiService.get(`/users/${id}`, {
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

export const fetchProposalsId = async () => {
  try {
    // Получаем данные о предложениях (proposals)
    const proposers = await fetchProposersId();
    
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('Access token not available');
    }

    // Собираем массив proposer из списка предложений (proposers)
    const proposerIds = proposers.map(proposer => proposer.id);

    // Получаем все предложения, где proposer соответствует одному из proposerIds
    const response = await apiService.get(`/proposals/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, // Добавляем access token в заголовок
      },
      params: {
        proposer: proposerIds.join(','), // Преобразуем массив proposer в строку с разделителем ","
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProposersId = async () => {
  try {
    // Получаем данные пользователя
    const userData = await fetchUsersId();
    
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('Access token not available');
    }

    // Получаем данные предложений (proposers)
    const response = await apiService.get(`/proposers/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, // Добавляем access token в заголовок
      }
    });

    // Фильтруем результаты по значению user.id, равному userData.id
    const filteredProposers = response.data.filter(proposer => proposer.user.id === userData.id);

    // Возвращаем только proposer из отфильтрованных данных
    return filteredProposers;
  } catch (error) {
    throw error;
  }
};

export const acceptProposal = async (proposalId, selectedCriteriaIds) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token not available');
      }
    const response = await apiService.put(`/proposals/${proposalId}/accept/`, { criteria: selectedCriteriaIds },
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const assignProposal = async (proposalId) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token not available');
      }
    const response = await apiService.put(`/proposals/${proposalId}/accept/`,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchProposersData = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not available');
    }
    const response = await apiService.get(`proposers/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    });
  
    return response.data;
    } catch (error) {
      throw error;
    }
  };
export const declineProposal = async (proposalId, selectedCriteriaIds) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token not available');
      }
    const response = await apiService.put(`/proposals/${proposalId}/decline/`, {criteria: selectedCriteriaIds },
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registration = async (userData) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not available');
    }
    const response = await apiService.post('/proposers/', userData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addProposal = async (proposalData) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not available');
    }
    const response = await apiService.post('/proposals/', proposalData, {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    })

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Другие функции для работы с API могут быть добавлены здесь

export default apiService;
    