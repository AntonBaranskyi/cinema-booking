import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import FilmPage from "../pages/FilmPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="film/:id" element={<FilmPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);
