import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { FiHome, FiMessageCircle, FiBarChart2 } from "react-icons/fi";

const MainLayout: React.FC = () => {
  const location = useLocation();

  const tabs = [
    {
      name: "리포트",
      path: "/report",
      icon: FiBarChart2,
    },
    {
      name: "홈",
      path: "/home",
      icon: FiHome,
    },
    {
      name: "채팅",
      path: "/chatting",
      icon: FiMessageCircle,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full max-w-[480px] mx-auto px-4 sm:px-6 md:px-8 pb-20">
        <Outlet />
      </div>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-16 bg-white-default border-t border-[#E7E7E7] flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;

          return (
            <Link
              key={tab.path}
              to={tab.path}
              className="flex flex-col items-center justify-center flex-1"
            >
              {/* 아이콘 */}
              <Icon
                size={24}
                className={isActive ? "text-primary-green" : "text-icon-gray"}
              />

              {/* 텍스트 */}
              <span
                className={`text-sm mt-1 ${
                  isActive
                    ? "text-primary-green font-semibold"
                    : "text-text-gray"
                }`}
              >
                {tab.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MainLayout;
