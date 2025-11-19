import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const MainLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full max-w-[480px] mx-auto px-4 sm:px-6 md:px-8 pb-16">
        <Outlet />
      </div>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-16 bg-white border-t flex justify-around items-center">
        <Link
          to="/"
          className={`flex-1 text-center ${
            location.pathname === "/"
              ? "text-primary-green font-bold"
              : "text-text-gray"
          }`}
        >
          홈
        </Link>
        <Link
          to="/report"
          className={`flex-1 text-center ${
            location.pathname === "/report"
              ? "text-primary-green font-bold"
              : "text-text-gray"
          }`}
        >
          리포트
        </Link>
        <Link
          to="/chatting"
          className={`flex-1 text-center ${
            location.pathname === "/chatting"
              ? "text-primary-green font-bold"
              : "text-text-gray"
          }`}
        >
          채팅
        </Link>
      </nav>
    </div>
  );
};

export default MainLayout;
