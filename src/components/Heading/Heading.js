import React from "react";

export default function Heading({ text }) {
  return (
    <div className="m-4 p-4">
      <h4 className="font-playfair capitalize">{text}</h4>
    </div>
  );
}
