import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/890-loading-animation.json";

const LoadingDots = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Lottie options={defaultOptions} height={400} width={400} />;
    </div>
  )
}

export default LoadingDots;

