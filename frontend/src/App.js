import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Search } from "./pages/Search";
import { NoPage } from "./pages/NoPage";
import { Followers } from "./pages/Followers";
import { Following } from "./pages/Following";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Search />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/followers" element={<Followers />} />
        <Route path="/following" element={<Following />} />

        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
