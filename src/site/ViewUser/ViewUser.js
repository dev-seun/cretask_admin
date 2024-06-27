import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { CustomField, SubmitButton } from "../../Component/CustomField";
import { doc } from "../../static/constant/constant";
import { getData, postData } from "../../static/constant/request";
import url from "../../static/constant/urls";

// import "../../static/css/profile.css";

export default function ViewUser() {
  let userid = useLocation().state;

  const [UserInfo, setUserInfo] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [isLoadingTopUp, setisLoadingTopUp] = useState(false);
  // const [isLoadingPage, setisLoadingPage] = useState(false);

  let getUser = async () =>
    await getData(url.getSingleUser(userid)).then((response) => {
      setUserInfo(response.data);
      console.log(response.data);
    });

  useEffect(() => {
    // setisLoadingPage(true);
    let repo = async () => {
      await getUser();
      console.log(UserInfo);
    };
    repo();
    // setisLoadingPage(false);
  }, []);

  function activateDeactivateAccount() {
    setisLoading(true);
    let body = {
      user_id: userid,
      banned: !UserInfo.user.is_banned,
    };

    postData(url.banUser, body, "PATCH").then((response) => {
      if (response.status === 200) {
        getUser();
        toast.success(response.message);
        setisLoading(false);
        return;
      }
      toast.success(response.message);
      setisLoading(false);
    });
  }

  function topUp() {
    // setisLoading(true);
    let body = {
      user_id: userid,
      amount: parseInt(doc("#wallet").amount.value),
    };

    postData(url.credit, body, "PATCH").then((response) => {
      if (response.status === 200) {
        getUser();
        toast.success(response.message);
        doc("#wallet").amount.value = "";
        setisLoadingTopUp(false);
        return;
      }
      toast.success(response.message);
      setisLoadingTopUp(false);
    });
  }

  return (
    UserInfo && (
      <>
        <div className="profile-page">
          <div className="row">
            <div className="col-lg-6">
              <div className="align-items-center pt-3" id="deactivate">
                <div>
                  <p>Activate Account / Deactivate Account</p>
                </div>
                <div>
                  <SubmitButton action={activateDeactivateAccount} isLoading={isLoading} name={UserInfo.user.is_banned === true ? "Activate" : "Deactivate"} color={UserInfo.user.is_banned === true ? "success" : "danger"} />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h4
                style={{
                  textDecoration: "underline",
                  fontSize: "1rem",
                  marginTop: "20px",
                }}
              >
                Add Fund
              </h4>{" "}
              <form id="wallet">
                <CustomField name="Total Balance" id="amount" placeholder={0} />
              </form>
              <div className=" py-3 pb-4 border-bottom">
                <SubmitButton name="Update Wallet" action={topUp} isLoading={isLoadingTopUp} />
              </div>
            </div>
          </div>

          <div className="wrapper bg-white mt-sm-5">
            <h4 className="pb-4 border-bottom my-3">User profile</h4>
            <div className="py-2">
              <div className="row py-2">
                <div className="col-lg-6">
                  <h4 style={{ textDecoration: "underline", fontSize: "1rem" }}>User Info</h4>

                  <CustomField name="Phone Number" value={UserInfo.user.phoneNumber} disabled={true} />
                  <CustomField name="Full Name" value={UserInfo.user.full_name} disabled={true} />
                  <CustomField name="Email" value={UserInfo.user.email} disabled={true} />
                  <CustomField name="Country" value={UserInfo.user.country} disabled={true} />
                  <CustomField name="Country Code" value={UserInfo.user.country_code} disabled={true} />
                  <CustomField name="Referral By" value={UserInfo.user.referred_by} disabled={true} />
                  <CustomField name="Total Referral" value={UserInfo.user.total_referral} disabled={true} />
                  <CustomField name="Wallet Address" value={UserInfo.user.wallet_address} disabled={true} />

                  {/* <div className=" py-3 pb-4 border-bottom">
                    <SubmitButton name="Save Info" />
                  </div> */}
                </div>
                <div className="col-lg-6">
                  <h4
                    style={{
                      textDecoration: "underline",
                      fontSize: "1rem",
                      marginTop: "30px",
                    }}
                  >
                    Wallet Info
                  </h4>
                  <CustomField name="Total Balance" value={UserInfo.wallet.total_balance} />
                  <CustomField name="Ammount made by referrals" value={UserInfo.wallet.amount_made_by_referral} disabled={true} />
                  <CustomField name="Amount made today" value={UserInfo.wallet.amount_made_today} disabled={true} />
                  <CustomField name="Amount deposited" value={UserInfo.wallet.total_amount_deposited} disabled={true} />
                  <CustomField name="Amount Made" value={UserInfo.wallet.total_amount_made} disabled={true} />
                  <CustomField name="Amount Widthrawal" value={UserInfo.wallet.total_amount_withdraw} disabled={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
