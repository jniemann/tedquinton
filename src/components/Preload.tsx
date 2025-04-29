'use client';

import Lottie from "lottie-react";
import logo from "../assets/lottie/logo.json"

const Component = () => {
  return (
    <div className="preloader-component show">
      <div className="preloader-layout">
        <div className="container m-fh">
          <div className="flex-stretch m-vertical">
            <div className="preloader-item">
              <div className="body-copy">
                Design Intelligence</div>
            </div>
            <div className="preloader-item is-center">
              <div className="preloader-lottie_container">
                <div className="preloader-lottie">
                  <Lottie animationData={logo} loop={true} />;
                </div>
              </div>
            </div>
            <div className="preloader-item is-right">
              <div className="preloader-timer">
                100%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component