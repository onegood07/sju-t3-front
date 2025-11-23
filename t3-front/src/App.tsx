import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import LoginSuccessPage from "./pages/Login/LoginSuccessPage";
import ReportPage from "./pages/ReportPage";
import ChattingPage from "./pages/ChattingPage";
import LoginPage from "./pages/Login/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login-success" element={<LoginSuccessPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/chatting" element={<ChattingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
