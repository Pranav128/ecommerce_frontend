export const environment = {
  production: true,
  // apiUrl: import.meta.env.NG_APP_API_URL
    // || 'https://ecommerce-api-4u9v.onrender.com'
  apiUrl: (window as any).env?.API_BASE_URL || 'https://ecommerce28.onrender.com/api'
};
