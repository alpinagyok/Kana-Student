const API_ENDPOINT = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_API_ENDPOINT : 'api';

export default API_ENDPOINT;
