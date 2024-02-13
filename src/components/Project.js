import React from "react";

export default function Project({
  img,
  title,
  subtitle,
  link,
  tech,
  date,
  role,
  desc,
}) {
  return (
    <div>
      <section className="p-4">
        <img src={img} className="object-fit" alt="Wall_Image" />
      </section>
      <section className="p-4">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg mb-4">{subtitle}</p>
        <a href={link} className="text-primary mb-4">
          {link}
        </a>
        <p className="text-lg mb-4">{tech}</p>
        <p className="text-lg mb-4">{date}</p>
        <p className="text-lg mb-4">{role}</p>
        <p className="text-lg mb-4">{desc}</p>
      </section>
    </div>
  );
}
