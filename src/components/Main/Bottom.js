import React from "react";
import logo from "../../assets/ph.png";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";

function LogoCard({ img, url }) {
  return (
    <div className="item">
      <Link to={url} target="_blank">
        <img src={img} className="w-1/4 ml-2" alt="logo" />
      </Link>
    </div>
  );
}

export default function Bottom() {
  const links = [
    [
      "https://doa.gov.lk/wp-content/uploads/2020/08/Department-LOGO.png",
      "https://doa.gov.lk/",
    ],
    [
      "http://www.dmc.gov.lk/templates/temp_poora/images/new/logo.png",
      "http://www.dmc.gov.lk/",
    ],
    [
      "https://env.gov.lk/web/templates/procons/images/mahawwliimages/logo.png",
      "https://env.gov.lk/",
    ],
    [
      "http://www.statistics.gov.lk/img/banner_new.png",
      "http://www.statistics.gov.lk/",
    ],
    [
      "https://nbro.gov.lk/templates/temp-poora/images/new/logo.png",
      "https://nbro.gov.lk/",
    ],
  ];
  return (
    <OwlCarousel
      className="owl-theme"
      loop
      margin={10}
      items={5}
      dots={false}
      autoplay={false}
    >
      {links.map((link, i) => (
        <LogoCard key={i} img={link[0]} url={link[1]} />
      ))}
    </OwlCarousel>
  );
}
