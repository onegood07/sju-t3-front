import React from "react";
import Button from "../../components/Button";
import { LABELS, APP_INFO, IMAGES, ICONS } from "../../constants";

const LoginPage = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = link;
  };

  return (
    <div className="p-4 flex flex-col items-center min-h-screen">
      <div className="p-4 text-center">
        <p className="font-bold text-3xl">{APP_INFO.NAME}</p>
        <p className="pt-2 font-regular text-base">{APP_INFO.TAGLINE}</p>
      </div>
      <img
        src={IMAGES.MASCOT.THREE.NOT_DO_DAY_THREE}
        className="w-50 h-40 mx-auto my-4"
      />
      <Button variant="login" icon={<ICONS.LOGIN />} onClick={handleLogin}>
        {LABELS.BUTTON.LOGIN}
      </Button>
    </div>
  );
};

export default LoginPage;
