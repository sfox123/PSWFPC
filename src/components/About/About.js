import React from "react";
import m1 from "../../assets/m1.jpg";
import m2 from "../../assets/m2.jpg";
import m3 from "../../assets/m3.jpg";

const ImageComponent = ({ src, alt, imgClass }) => (
  <div className="relative w-[25%]">
    <img
      className={`w-full border shadow-2xl rounded-sm absolute transition-all duration-200 ${imgClass}`}
      src={src}
      alt={alt}
    />
  </div>
);

const About = () => {
  const images = [
    {
      src: m1,
      alt: "img_1",
      imgClass:
        "z-10 right-[-2rem] top-[2rem] hover:scale-105 hover:-translate-y-2 hover:z-20",
    },
    {
      src: m2,
      alt: "img_2",
      imgClass:
        "z-10 right-0 top-[-2rem] hover:scale-105 hover:-translate-y-2 hover:z-20",
    },
    {
      src: m3,
      alt: "img_3",
      imgClass:
        "z-4 left-[-2rem] top-[2rem] hover:scale-105 hover:-translate-y-2 hover:z-20",
    },
  ];

  return (
    <section className="flex justify-between sm:flex-col flex-col lg:flex-row md:flex-col p-2 m-5">
      <div className="flex flex-col md:w-[50%] w-fit">
        <h2 className=" font-medium mb-4 font-sans text-primary text-3xl capitalize">
          Our Mission
        </h2>
        <p className="text-gray-600 font-semibold">
          By having partnership & coordination with the World Food Programme and
          other government sector entities, to entrust sustainable livelihood
          and urgent food & nutrition needs by introducing new guidelines, raise
          standard of Knowledge and evidence, provide technical and professional
          competencies and financial assistance to the target population to
          ensure sustainable recovery and raise quality of living standard
        </p>
      </div>
      {images.map((image, index) => (
        <ImageComponent key={index} {...image} />
      ))}
    </section>
  );
};

export default About;
