import React from "react";

export function Next(props) {
  return <input className={`btn ${props.loading ? "btn-secondary" : "btn-warning"}`} type="button" onClick={props.loading ? null : props.click} name="Next" value="Next >" />;
}

export function Back(props) {
  return <input className={`btn ${props.loading ? "btn-secondary" : "btn-warning"}`} type="button" onClick={props.loading ? null : props.click} name="Back" value="< Back" />;
}
