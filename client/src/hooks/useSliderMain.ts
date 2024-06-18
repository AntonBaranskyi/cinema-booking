import { useRef, useState } from "react";
import Slider from "react-slick";

export const useSliderMain = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleDotClick = (index: number) => {
    console.log("click");

    sliderRef?.current?.slickGoTo(index);
  };

  const onSetCurrentSlide = (num: number) => {
    setCurrentSlide(num);
  };

  return {
    sliderRef,
    handleDotClick,
    onSetCurrentSlide,
    activeSlide: currentSlide,
  };
};
