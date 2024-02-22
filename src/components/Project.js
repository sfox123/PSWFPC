import React from "react";
import { blogArray } from "../api/constant";
import { useParams } from "react-router-dom";

export default function Project() {
  const { id } = useParams();
  let activePost = blogArray.find((blog) => blog.id === Number(id));
  activePost = activePost ? activePost : {};
  const { img, title, subtitle, dictionary } = activePost;

  return (
    <div>
      <section className="p-4 flex items-center justify-center">
        <img src={img} className="h-1/2 w-1/2 object-fit" alt="Wall_Image" />
      </section>
      <section className="p-4">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <h2 className="text-lg font-bold mb-4">{subtitle}</h2>
        {dictionary &&
          dictionary.keyValue &&
          Object.values(dictionary.keyValue).map((value, index) => (
            <div key={index} className="flex flex-row">
              <h4 className="text-base font-bold mr-4">{value[0]}</h4>
              <span>-</span>
              <p className="text-base ml-4">{value[1]}</p>
            </div>
          ))}
        {dictionary && dictionary.para && (
          <p className="text-lg mb-4">{dictionary.para}</p>
        )}
        {dictionary &&
          dictionary.image &&
          Object.values(dictionary.image).map((imgUrl, index) => (
            <img key={index} src={imgUrl} alt={`img-${index}`} />
          ))}
      </section>
    </div>
  );
}
