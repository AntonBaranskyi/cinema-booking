import { SelectChangeEvent } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { onChangeLanguage } from "../store/slices/commonSilce";
import { Language } from "../types/langType";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export const useLanguage = () => {
  const dispatch = useAppDispatch();
  const { currentLanguage } = useAppSelector((state) => state.common);
  const { i18n } = useTranslation();

  useEffect(() => {
    const storedLanguage = localStorage.getItem("lang") as Language;

    if (storedLanguage) {
      dispatch(onChangeLanguage(storedLanguage));
    }
  }, [dispatch]);

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  const handleChangeLang = (event: SelectChangeEvent) => {
    const language = event.target.value as Language;
    dispatch(onChangeLanguage(language));
    localStorage.setItem("lang", language);
  };

  return { currentLanguage, handleChangeLang };
};
