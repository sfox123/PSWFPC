import React from "react";
import Top from "./Main/Top";
import Heading from "./Heading/Heading";
import Bottom from "./Main/Bottom";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useNavigate } from "react-router";

function BlogCard({ img, title, subtitle, id }) {
  const navigate = useNavigate();

  const handleActivePost = (id) => {
    navigate(`/project/${id}`);
  };

  return (
    <div className="item relative">
      <img className="" src={img} alt={title} />
      <button
        onClick={() => handleActivePost(id)}
        className="absolute bottom-0 left-0 px-4 py-2 w-[30%] bg-jetblack text-white uppercase"
      >
        Read More
      </button>
    </div>
  );
}

export default function Main({ blogs }) {
  return (
    <div>
      <Top />
      <Heading text="recent blogs" />
      <OwlCarousel
        className="owl-theme mt-4"
        // loop
        margin={10}
        items={3}
        dots={false}
        autoplay={true}
      >
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            img={blog.img}
            title={blog.title}
            subtitle={blog.subtitle}
          />
        ))}
      </OwlCarousel>
      <Heading text="useful links" />
      <Bottom />
    </div>
  );
}
