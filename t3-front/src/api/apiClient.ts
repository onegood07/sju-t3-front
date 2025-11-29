import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_REST_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("[apiClient] 요청 URL:", config.url);
  console.log("[apiClient] 요청 메서드:", config.method);
  console.log("[apiClient] 요청 헤더:", config.headers);
  console.log("[apiClient] 요청 데이터:", config.data);

  return config;
});

api.interceptors.response.use(
  (res) => {
    console.log("[apiClient] 성공 응답:", res.data);
    return res;
  },
  (err) => {
    if (err.response) {
      console.error("서버 응답 오류:", err.response.status, err.response.data);
    } else if (err.request) {
      console.error("요청 전송 오류:", err.request);
    } else {
      console.error("설정 오류:", err.message);
    }
    return Promise.reject(err);
  }
);

export default api;
