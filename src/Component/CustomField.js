import React, { useState } from "react";
import { loader } from "../static/constant/images";
import "../static/css/custom_field.css";
import "../static/css/styles.css";

export function CustomField(props) {
  /* All acceptable parameters
  hasPrefix,type,name,placeholder,required,
  disabled,autoComplete,id,max,min,
  pattern,hidden,height,width
*/

  const [Value, setValue] = useState(props.value ?? "");

  return (
    <div>
      <label htmlFor={props.name} className="py-2 label-for">
        {props.name}
      </label>
      <span className="input-box">
        {props.hasPrefix ?? <span className="prefix">{props.prefix}</span>}
        <input
          type={props.type}
          name={props.inputName}
          placeholder={props.placeholder ?? props.name}
          required={props.required}
          disabled={props.disabled}
          autoComplete="true"
          id={props.id ?? undefined}
          // className={props.class ?? undefined}
          max={props.max ?? undefined}
          min={props.min ?? undefined}
          pattern={props.pattern}
          hidden={props.hidden ?? false}
          height={props.height ?? undefined}
          width={props.width ?? undefined}
          onChange={(target) => setValue(target.currentTarget.value)}
          value={Value}
        />
        {props.hasSuffix ?? <span className="prefix">{props.hasSuffix}</span>}
      </span>
      <span className="error">{props.error}</span>
      <span className="success">{props.success}</span>
    </div>
  );
}
export function PasswordField(props) {
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(!show);
  }
  return (
    <div>
      <label htmlFor={props.name} className="py-2 label-for">
        {props.name}
      </label>
      <span className="input-box">
        {props.hasPrefix ?? <span className="prefix">{props.prefix}</span>}
        <input
          type={show ? "text" : props.type}
          name={props.inputName}
          placeholder={props.placeholder ?? props.name}
          required={props.required}
          disabled={props.disabled}
          autoComplete="true"
          id={props.id ?? undefined}
          onChange={props.change}
          max={props.max ?? undefined}
          min={props.min ?? undefined}
          pattern={props.pattern}
          hidden={props.hidden ?? false}
          height={props.height ?? undefined}
          width={props.width ?? undefined}
        />

        {show ? (
          <span className="material-symbols-outlined eye" onClick={handleShow}>
            disabled_visible
          </span>
        ) : (
          <span className="material-symbols-outlined eye" onClick={handleShow}>
            visibility
          </span>
        )}
      </span>
      <span className="error">{props.error}</span>
      <span className="success">{props.success}</span>
    </div>
  );
}

export function SubmitButton(props) {
  //   m, mt ,mb ,mr ,ml ,color ,isLoading
  return (
    <button
      onClick={props.action}
      style={{
        margin: `${props.m + "px" || 0}`,
        marginTop: `${props.mt + "px" || 0}`,
        marginBottom: `${props.mb + "px" || 0}`,
        marginRight: `${props.mr + "px" || 0}`,
        marginLeft: `${props.ml + "px" || 0}`,
      }}
      className={`btn btn-${props.color || "success"}`}
      disabled={props.isLoading || false}
    >
      {props.name || "Submit"}{" "}
      {props.isLoading ? <img src={loader} alt="" width={"15px"} /> : null}
    </button>
  );
}
