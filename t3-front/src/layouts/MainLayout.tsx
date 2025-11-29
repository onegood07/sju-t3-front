import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FiHome, FiMessageCircle, FiBarChart2 } from "react-icons/fi";

const MainLayout: React.FC = () => {
  const location = useLocation();

  const tabs = [
    { name: "리포트", path: "/report", icon: FiBarChart2 },
    { name: "홈", path: "/home", icon: FiHome },
    { name: "채팅", path: "/chatting-list", icon: FiMessageCircle },
  ];

  const NO_TABBAR_PATHS = [
    "/",
    "/login",
    "/login-success",
    "/add",
    "/update-goal",
    "/update-amount",
    "/chatting",
    "/update-character",
  ];
  const WHITE_BG_PATHS = [
    "/login",
    "/login-success",
    "/add",
    "/chatting-list",
    "/update-goal",
    "/update-amount",
  ];

  const containerBgClass = WHITE_BG_PATHS.includes(location.pathname)
    ? "bg-white-default"
    : "bg-app-bg";

  const showTabBar =
    !NO_TABBAR_PATHS.includes(location.pathname) &&
    !location.pathname.startsWith("/chatting/");

  const mainScrollClass = showTabBar ? "overflow-y-auto" : "overflow-hidden";
  const paddingBottomClass = showTabBar ? "pb-16" : "pb-0";

  return (
    <div className="min-h-screen flex justify-center items-center bg-white-default">
      <div
        className={`w-full max-w-[480px] relative flex flex-col h-full min-h-screen ${containerBgClass}`}
      >
        <main
          className={`flex-1 h-full ${paddingBottomClass} ${mainScrollClass} p-4`}
        >
          <Outlet />
        </main>

        {showTabBar && (
          <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-[480px] w-full h-16 bg-white-default border-t border-[#E7E7E7] flex justify-around items-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = location.pathname === tab.path;

              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className="flex flex-col items-center justify-center flex-1"
                >
                  <Icon
                    size={24}
                    className={
                      isActive ? "text-primary-green" : "text-icon-gray"
                    }
                  />
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
        )}
      </div>
    </div>
  );
};

export default MainLayout;
