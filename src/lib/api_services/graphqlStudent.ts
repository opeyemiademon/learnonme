import axios from 'axios';

// Create a GraphQL client using Axios
const graphqlClientStudent = axios.create({
  //baseURL: 'http://192.168.1.196:8000/graphql', //use this for school/offline deployment
 baseURL: 'https://examreta-backend-build.onrender.com/graphql',   //use this for online deployment
  //baseURL: 'http://localhost:8000/graphql', //use this for local deployment
  headers: {
    'Content-Type': 'application/json',
  },
});


// Add request interceptor to include auth token
graphqlClientStudent.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage?.getItem('student_token') : null;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// Add response interceptor for error handling
graphqlClientStudent.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Error response:', error.response.data);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    return Promise.reject(error);
  }
);

export default graphqlClientStudent;
