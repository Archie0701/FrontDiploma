import axios from 'axios';

export const API_URL = 'http://3.75.85.169:8000/api';
const BASIC_URL = 'http://18.199.142.82:3000';

const apiService = axios.create({
  baseURL: API_URL,
  timeout: 10000,
}); 

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

export const getStaffs = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not available');
    }
    const response = await apiService.get('users/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    });
    const staffs = response.data.filter(user => user.is_staff);
    return staffs;
  } catch (error) {
    throw error;
  }
};

export const checkNewByEmail = async (email) => {
  try {
    const response = await apiService.get(`proposers/?email=${email}`, {
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
    
    console.log("------------------------------");
    console.log(proposalId);
    console.log(grading);
    console.log(score);
    console.log("------------------------------");
    const response = await apiService.post(`/proposals/${proposalId}/gradings/`, 
      { grading, score },
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
    const response = await apiService.get(`/proposals/${proposalId}/get_comments/`, {
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
        { "status": status },
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
  
      const response = await apiService.put(`/proposals/${proposalId}/archive/`, {},
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

export const fetchProposalsByID = async (id) => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('Access token not available');
    }

    const response = await apiService.get(`/proposals/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      params: {
        proposer: id,
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getProposerById = async (id) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not available');
    }
    const response = await apiService.get(`/proposers/${id}`, {
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
    console.log("Poshel nahu");
    throw error;
  }
};

export const editProfile = async (user_id, email, first_name, last_name, avatar) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not available');
    }
    await apiService.patch(`/users/${user_id}/`, 
      { 'email': email, 
        'first_name': first_name, 
        'last_name': last_name },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        }
      }
    );
    if(avatar){
    await apiService.put(`/users/${user_id}/set_avatar/`, 
      {'avatar': avatar},
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        }
      }
    );
    }
  } catch (error) {
    throw error;
  }
};

export const getImageById = async (image_id) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not available');
    }
    const response = await apiService.get(`/images/${image_id}/`, {
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
    
export async function newProposalEmail(data) {
    try {
      const staffs = await getStaffs();
      const staffEmails = staffs.map(obj => obj.email);
      const response = await fetch(`${BASIC_URL}/api/send/new_proposal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({staffEmails, data})
      });
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

export async function confirmationEmail(data) {
  try {
    const response = await fetch(`${BASIC_URL}/api/send/confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export default apiService;
