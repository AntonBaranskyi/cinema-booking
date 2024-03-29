import { useEffect, useState } from "react";

import {
  onToggleExpireModal,
  onToggleWidget,
} from "../store/slices/commonSlice";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export const useUpdateTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timer, setTimer] = useState(600);

  const { isOpenBooking } = useAppSelector((state) => state.common);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!timer && isOpenBooking) {
      dispatch(onToggleWidget({ isOpen: false, movieId: "", session: "" }));

      dispatch(onToggleExpireModal(true));
    }
  }, [timer, dispatch, isOpenBooking]);

  useEffect(() => {
    const intervalTime = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(intervalTime);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const formatedTimer = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}`;
  };

  return { formattedTime, formatedTimer, timer };
};
