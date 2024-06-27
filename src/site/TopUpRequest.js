import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SubmitButton } from "../Component/CustomField";
import { Space } from "../Component/onAndOff";

import { postData } from "../static/constant/request";
import url from "../static/constant/urls";
import "../static/css/table.css";

export default function TopUpRequest() {
  const [AllTopRequest, setAllTopRequest] = useState({
    allRequest: [],
    isApproving: false,
  });
  let header = ["Email", "Amount", "Pre Balance", "TXF ID", "Date", "Action"];
  useEffect(() => {
    let request = async () => {
      let body = {
        per_page: 20,
        page: 1,
      };
      let resp = await postData(url.fundRequest, body);
      setAllTopRequest((prev) => {
        return { ...prev, allRequest: resp.data };
      });

    };
    request();
  }, []);

  function approve(request_id, user, amount) {
    setAllTopRequest((prev) => {
      return { ...prev, isApproving: true };
    });
    postData(
      url.approvePayment,
      { id: request_id, user_id: user, amount: amount },
      "PATCH"
    ).then((response) => {
      if (response.status === 200) {
        toast.success(response.message);
        postData(url.fundRequest, {
          per_page: 20,
          page: 1,
        }).then((res) => {
          setAllTopRequest((prev) => {
            return { ...prev, allRequest: res.data, isApproving: false };
          });
        });
        return;
      }
      toast.error(response.message);
      setAllTopRequest((prev) => {
        return { ...prev, isApproving: false };
      });
      return;
    });
    setAllTopRequest((prev) => {
      return { ...prev, isApproving: false };
    });
  }
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
          {AllTopRequest.allRequest.map((element, index) => {
            return (
              <tr key={index}>
                <td>{element.email}</td>
                <td>{element.amount}</td>
                <td>{element.balance_before}</td>
                <td>{element.txf_id}</td>
                <td>
                  {new Date(Date.parse(element.created_at)).toDateString()}
                </td>
                <td>
                  <SubmitButton
                    name="Approve/Credit"
                    isLoading={AllTopRequest.isApproving}
                    action={() =>
                      approve(element.txf_id, element.user_id, element.amount)
                    }
                  />
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
