import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import axios from "axios";

const LoginSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setUserId = useAuthStore((state) => state.setUserId);
  const userId = useAuthStore((state) => state.userId);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      getUser(tokenFromUrl);
      return;
    }

    const savedToken = sessionStorage.getItem("token");
    if (savedToken) {
      getUser(savedToken);
      return;
    }

    navigate("/login", { replace: true });
  }, [location, setToken, navigate]);

  const getUser = async (token: string) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REST_URL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const match = res.data.match(/\d+/);
      const id = match ? Number(match[0]) : null;

      if (id !== null) {
        setUserId(id);
        navigate("/home", { replace: true });
      } else {
        console.error("ID를 추출할 수 없습니다.");
        navigate("/login", { replace: true });
      }
    } catch (err) {
      console.error("[LoginSuccessPage] 유저 정보 호출 실패: ", err);
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    if (userId) {
      navigate("/home", { replace: true });
    }
  }, [userId, navigate]);

  return <div>로그인 중...</div>;
};

export default LoginSuccessPage;
