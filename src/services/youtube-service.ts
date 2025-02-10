import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchSubscriptions = async (accessToken: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/subscriptions`, {
      params: {
        part: 'snippet',
        mine: true,
        maxResults: 50,
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      },
    });
    console.log('API Response:', response);
    return response.data.items;
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    throw error;
  }
};

export const deleteSubscription = async (subscriptionId: string, accessToken: string) => {
  try {
    await axios.delete(`${BASE_URL}/subscriptions`, {
      params: {
        id: subscriptionId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Accept': 'application/json'
      },
    });
    console.log('Suscripción eliminada:', subscriptionId);
  } catch (error) {
    console.error('Error eliminando suscripción:', error);
    throw error;
  }
};