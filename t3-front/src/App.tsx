import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";
import ChattingPage from "./pages/ChattingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/chatting" element={<ChattingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
