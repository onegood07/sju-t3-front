import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import axios from "axios";

const LoginSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");

    const setToken = useAuthStore((state) => state.setToken);

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
  }, [location]);

  const getUser = async (token: string) => {
    try {
      const res = await axios.get(`user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("[LoginSuccessPage] 로그인한 유저 정보: ", res.data);
      navigate("/home", { replace: true });
    } catch (err) {
      console.error("[LoginSuccessPage] 유저 정보 호출 실패: ", err);
      navigate("/login", { replace: true });
    }
  };

  return (
    <div>
      <div>로그인 중...</div>
    </div>
  );
};

export default LoginSuccessPage;
