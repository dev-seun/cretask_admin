import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SubmitButton } from "../Component/CustomField";
import On, { Off, Space } from "../Component/onAndOff";
import { getData } from "../static/constant/request";
import url from "../static/constant/urls";
import "../static/css/table.css";

export default function Complains() {
  const [AllUser, setAllUser] = useState({
    allUser: [],
  });
  let header = ["Name", "Email", "Referred By", "Banned", "Admin", "Action"];
  useEffect(() => {
    let request = async () => {
      let resp = await getData(url.getAllUser);
      setAllUser((prev) => {
        return { ...prev, allUser: resp.data };
      });
    };
    request();
  }, []);

  return (
    <>
      <div>
        <p></p>
        <p>Top Up Requests</p>
      </div>
      <table id="data-table">
        <thead>
          <tr>
            {header.map((e) => {
              return <th key={e}>{e}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {AllUser.allUser.map((element, index) => {
            return (
              <tr key={index}>
                <td>{element.full_name}</td>
                <td>{element.email}</td>
                <td>{element.referred_by}</td>
                <td>{element.is_banned ? <On /> : <Off />}</td>
                <td>{element.is_admin ? <On /> : <Off />}</td>
                <td>
                  <Link to={"/user"} state={element.user_id}>
                    {/* <p>{element.user_id}</p> */}
                    <SubmitButton name="View" />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Space p="30px" />
    </>
  );
}
