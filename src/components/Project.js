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
      <section className="p-4">
        <img src={img} className="object-fit" alt="Wall_Image" />
      </section>
      <section className="p-4">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg mb-4">{subtitle}</p>
        {dictionary &&
          dictionary.keyValue &&
          Object.values(dictionary.keyValue).map((value, index) => (
            <div key={index}>
              <h4>{value[0]}</h4>
              <p>{value[1]}</p>
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
