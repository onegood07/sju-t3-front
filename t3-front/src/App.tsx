import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/report" element={<div>Report</div>} />
        <Route path="/chatting" element={<div>Chatting</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
