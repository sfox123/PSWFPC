import React from "react";
import logo from "../../assets/ph.png";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function LogoCard({ img }) {
  return (
    <div className="item">
      <img src={img} className="w-1/4 ml-2" alt="logo" />
    </div>
  );
}

export default function Bottom() {
  return (
    <OwlCarousel
      className="owl-theme"
      loop
      margin={10}
      items={5}
      dots={false}
      autoplay={false}
    >
      {[...Array(5)].map((_, i) => (
        <LogoCard key={i} img={logo} />
      ))}
    </OwlCarousel>
  );
}
