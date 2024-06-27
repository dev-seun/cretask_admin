import React from "react";

export default function Cards(props) {
  return (
    <div className="cards">
      <h4>{props.title}</h4>
      <h2>{props.value}</h2>
    </div>
  );
}
