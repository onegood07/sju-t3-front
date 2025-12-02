import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import LoginSuccessPage from "./pages/Login/LoginSuccessPage";
import ReportPage from "./pages/ReportPage";
import ChattingPage from "./pages/chatting/ChattingPage";
import LoginPage from "./pages/Login/LoginPage";
import IncomeDetailPage from "./pages/IncomeDetailPage";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import AddPage from "./pages/AddPage";
import ChattingListPage from "./pages/chatting/ChattingListPage";
import UpdateGoalPage from "./pages/UpdateGoalPage";
import UpdateTargetAmountPage from "./pages/UpdateTargetAmountPage";
import ChangeCharacterPage from "./pages/chatting/UpdateCharacterPage";
import CreateNewChattingPage from "./pages/chatting/CreateNewChattingPage";
import NewChattingPage from "./pages/chatting/NewChattingPage";
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
          <Route path="/income" element={<IncomeDetailPage />} />
          <Route path="/chatting" element={<ChattingPage />} />
          <Route path="/report/category/:categoryName" element={<CategoryDetailPage />} />
          <Route path="/chatting/:roomId" element={<ChattingPage />} />
          <Route path="/chatting-list" element={<ChattingListPage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/update-goal" element={<UpdateGoalPage />} />
          <Route path="/update-amount" element={<UpdateTargetAmountPage />} />
          <Route
            path="/chatting/:roomId/update-character"
            element={<ChangeCharacterPage />}
          />
          <Route path="/chatting/new" element={<CreateNewChattingPage />} />
          <Route path="/chatting/new/message" element={<NewChattingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
