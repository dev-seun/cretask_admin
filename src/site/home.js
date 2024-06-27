import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cards from "../Component/Cards";
import { SubmitButton } from "../Component/CustomField";
import On, { Off, Space } from "../Component/onAndOff";
import { getData, postData } from "../static/constant/request";
import url from "../static/constant/urls";
import "../static/css/table.css";
import { Back, Next } from "../Component/next.back";

export default function Home() {
  const [isLoading, setisLoading] = useState(false);
  const [AllUser, setAllUser] = useState({
    allUser: [],
    userCount: 0,
    totalDeposit: 0,
    totalWithdraw: 0,
    currentPage: 1,
  });
  let header = ["Name", "Email", "Date Joined", "Referred By", "Banned", "Admin", "Action"];

  let request = async (page) => {
    let body = {
      per_page: 10,
      page: page,
    };

    setisLoading(true);

    let resp = await postData(url.getAllUser, body);
    let allCount = await getData(url.countUser);
    let fetchTotalTopup = await getData(url.fetchTotalTopup);
    console.log(resp);
    console.log(allCount);
    console.log(fetchTotalTopup);
    setAllUser((prev) => {
      return {
        ...prev,
        allUser: resp.data,
        userCount: allCount.data,
        totalDeposit: fetchTotalTopup.data.totalDeposit,
        totalWithdraw: fetchTotalTopup.data.totalWithdraw,
        currentPage: page,
      };
    });
    setisLoading(false);
  };

  useEffect(() => {
    let red = async () => {
      await request(1);
    };

    return red;
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-lg-4 ">
          <Cards title="Total Users" value={AllUser.userCount} />
        </div>
        <div className="col-lg-4">
          <Cards title="Total Deposit" value={AllUser.totalDeposit} />
        </div>
        <div className="col-lg-4">
          <Cards title="Total Widthdrawal" value={AllUser.totalWithdraw} />
        </div>
      </div>
      <h4
        style={{
          fontSize: "1rem",
          marginTop: "20px",
        }}
      >
        Newest Member
      </h4>
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
                <td>{new Date(Date.parse(element.created_at)).toDateString()}</td>
                <td>{element.referred_by}</td>
                <td>{element.is_banned ? <On /> : <Off />}</td>
                <td>{element.admin ? <On /> : <Off />}</td>
                <td>
                  <Link to={"/user"} state={element.user_id}>
                    <SubmitButton name="View" color={"danger"} />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {AllUser.currentPage !== 1 && (
        <Back
          loading={isLoading}
          click={() => {
            request(AllUser.currentPage - 1);
            console.log("Back Clicked");
          }}
        />
      )}
      <span>Total User: {AllUser.userCount}</span> <span>Current Page: {AllUser.currentPage} </span>
      {Math.ceil(AllUser.userCount / 10) !== AllUser.currentPage && (
        <Next
          loading={isLoading}
          click={() => {
            request(AllUser.currentPage + 1);
            console.log("Next Clicked");
          }}
        />
      )}
      <Space p="30px" />
    </>
  );
}
