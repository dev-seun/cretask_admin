import React, { useEffect, useState } from "react";
import { CustomField, SubmitButton } from "../Component/CustomField";
import { doc } from "../static/constant/constant";
import { getData, postData } from "../static/constant/request";
import url from "../static/constant/urls";
import "../static/css/table.css";
import toast from "react-hot-toast";

export default function Settings() {
  const [paymentMethod, setpaymentMethod] = useState({
    // paypal: "",
    tether1: "",
    tether2: "",
  });
  const [Percentages, setPercentages] = useState("");
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    let request = async () => {
      let resp = await getData(url.getPaymentMethod);
      let perct = await getData(url.getPercentage);
      if (resp.status === 200) {
        setPercentages(perct.data);
        setpaymentMethod((prev) => {
          return {
            ...prev,
            tether1: resp.data.tether1,
            tether2: resp.data.tether2,
          };
        });
        setisLoading(false);
      }
      setisLoading(false);
    };
    request();
  }, []);

  function savePayment(e) {
    e.preventDefault();
    setisLoading(true);
    let request = async () => {
      let body = {
        tether1: doc("#payment").tether1.value,
        tether2: doc("#payment").tether2.value,
      };
      let resp = await postData(url.savePaymentMethod, body, "PATCH");
      if (resp.status === 200) {
        toast.success(resp.message);
        getData(url.getPaymentMethod).then((e) => {
          setpaymentMethod((prev) => {
            console.log(e.data);
            return {
              ...prev,
              tether1: e.data.tether1,
              tether2: e.data.tether2,
            };
          });
          setisLoading(false);
        });
        return;
      }
      toast.error(resp.message);
      setisLoading(false);
      return;
    };
    request();
  }

  function percentageUpdate(e) {
    e.preventDefault();
    setisLoading(true);
    let request = async () => {
      let body = {
        percentage: doc("#percent").percentage.value,
      };

      let resp = await postData(url.setPercentage, body, "PATCH");
      if (resp.status === 200) {
        toast.success(resp.message);
        getData(url.getPercentage).then((e) => {
          setPercentages(e.data);
          setisLoading(false);
        });
        return;
      }
      toast.error(resp.message);
      setisLoading(false);
      return;
    };
    request();
  }

  return (
    <div className="row">
      <div className="col-lg-6">
        <h4
          style={{
            textDecoration: "underline",
            fontSize: "1rem",
            marginTop: "20px",
          }}
        >
          Add Payment Account
        </h4>
        {isLoading ? (
          <p>Loading</p>
        ) : (
          <form id="payment">
            <CustomField name="Tether (TRC 20)" id="tether1" placeholder={paymentMethod.tether1} />

            <CustomField name="Tether (ERC 20)" id="tether2" placeholder={paymentMethod.tether2} />

            <div className=" py-3 pb-4 border-bottom">
              <SubmitButton action={savePayment} name="Update Accounts" isLoading={isLoading} />
            </div>
          </form>
        )}
      </div>
      <div className="col-lg-6">
        <h4
          style={{
            textDecoration: "underline",
            fontSize: "1rem",
            marginTop: "20px",
          }}
        >
          Interest Percentage
        </h4>
        <form id="percent">
          <CustomField name="Interest" id="percentage" placeholder={Percentages} />
          <div className=" py-3 pb-4 border-bottom">
            <SubmitButton name="Update Percentage" action={percentageUpdate} isLoading={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
}
