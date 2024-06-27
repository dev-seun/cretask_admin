import React from "react";
import "../static/css/table.css";

export default function Table(props) {
  //tableHeader must be a Object of String
  //tableData must be an array of objects
  return (
    <div>
      <table id="data-table">
        <thead>
          <tr>
            {props.tableHeader.map((e) => {
              return <th key={e}>{e}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {props.tableData.map((element, index) => {
            return (
              <tr key={index}>
                {element.map((e, idx) => {
                  return <td key={idx}>{e}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
