import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { App } from "../src/App";
import { HomePage, FilmPage, NotFoundPage } from "../pages";

export const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="film/:id" element={<FilmPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);