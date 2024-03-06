import { blogArray } from "../../api/constant";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";

function BlogCard({ img, title, subtitle, id }) {
  return (
    <div className="item relative">
      <img className="w-[100vw] h-[85vh] object-cover" src={img} alt={id} />
      <div className="text-white absolute bottom-0 left-0 w-1/4 h-full flex flex-col justify-center items-center">
        <div className="slider-heading flex flex-col justify-center items-center z-10 w-full h-full text-center">
          <h1 className="mb-4 text-6xl justify-center ">{title}</h1>
          <h4 className="mb-8 text-5xl">{subtitle}</h4>
          <Link
            to={`/project/${id}`}
            className="px-4 py-2 clip-button w-[30%] bg-white text-black"
          >
            Click Me
          </Link>
        </div>
      </div>
    </div>
  );
}

const CarouselReact = () => {
  return (
    <OwlCarousel
      className="owl-theme"
      loop
      margin={10}
      items={1}
      dots={false}
      autoplay={false}
    >
      {blogArray.map((blog) => (
        <BlogCard
          key={blog.id}
          img={blog.img}
          title={blog.title}
          subtitle={blog.subtitle}
          id={blog.id}
        />
      ))}
    </OwlCarousel>
  );
};

export default CarouselReact;
