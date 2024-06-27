import React from "react";
import "../static/css/table.css";

export default function On() {
  return <span className="on"> .</span>;
}
export function Off() {
  return <span className="off"> .</span>;
}

export function Space(props) {
  return (
    <div
      style={{
        padding: props.p ?? 0,
        magin: props.m ?? 0,
      }}
    ></div>
  );
}
