import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_ENDPOINT || "http://localhost:4000",
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchProductList = async ({ pageParam = 1 }) => {
  const { data } = await api.get(`/product?page=${pageParam}`);
  return data;
};

export const fetchProduct = async (id) => {
  const { data } = await api.get(`/product/${id}`);
  return data;
};

export const postProduct = async (input) => {
  const { data } = await api.post(`/product`, input);
  return data;
};

export const fetchRegister = async (input) => {
  try {
    const { data } = await api.post(`/auth/register`, input);
    if (!data.accessToken || !data.user) {
      throw new Error("Invalid registration response");
    }
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || "Registration failed");
  }
};

export const fetchLogin = async (input) => {
  try {
    const { data } = await api.post(`/auth/login`, input);
    if (!data.accessToken || !data.user) {
      throw new Error("Invalid login response");
    }
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || "Login failed");
  }
};

export const fetchMe = async () => {
  try {
    const { data } = await api.get(`/auth/me`);
    return data;
  } catch (error) {
    if (error.response?.status === 401) {
      const refreshed = await refreshToken();
      if (refreshed) {
        const { data } = await api.get(`/auth/me`);
        return data;
      }
    }
    return null;
  }
};

export const fetchLogout = async () => {
  try {
    const { data } = await api.post(`/auth/logout`, {
      refresh_token: localStorage.getItem("refresh-token"),
    });
    return data;
  } catch (error) {
    return null;
  }
};

export const refreshToken = async () => {
  try {
    const { data } = await api.post(`/auth/refresh`, {
      refresh_token: localStorage.getItem("refresh-token"),
    });
    localStorage.setItem("access-token", data.accessToken);
    localStorage.setItem("refresh-token", data.refreshToken);
    return data;
  } catch (error) {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    return null;
  }
};

export const postOrder = async (input) => {
  const { data } = await api.post(`/order`, input);
  return data;
};

export const fetchOrders = async () => {
  const { data } = await api.get(`/order`);
  return data;
};

export const deleteProduct = async (product_id) => {
  const { data } = await api.delete(`/product/${product_id}`);
  return data;
};

export const updateProduct = async (input, product_id) => {
  const { data } = await api.put(`/product/${product_id}`, input);
  return data;
};