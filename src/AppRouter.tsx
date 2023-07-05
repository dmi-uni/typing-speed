import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/index.css";
import "./styles/App.css";
import App from "./pages/App";
import Profile from "./pages/Profile";
import Layout from "./pages/Layout";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
