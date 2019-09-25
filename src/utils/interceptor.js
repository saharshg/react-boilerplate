import apiInstance from '../actions/api';

export default () => {
  apiInstance.interceptors.request.use((config) => {
    const { localStorage } = window;
    const { authToken } = localStorage;
    let customConfig;
    if (authToken) {
      customConfig = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Token ${authToken}`,
        },
      };
    }
    return customConfig;
  }, error => Promise.reject(error));
};
