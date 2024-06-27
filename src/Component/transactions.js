import React, { useEffect, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import {
  datetime,
  json_parser,
  urls,
} from "../dashboard/controller/constant_data";
import postData from "../dashboard/controller/make_request";

function Transactions(props) {
  let [history, sethistory] = useState({
    transactions: [],
    isLoading: false,
    pagination: "",
  });

  function loadData(page) {
    sethistory((prev) => {
      return { ...prev, isLoading: true };
    });
    postData(urls.fetch_transactions, {
      per_page: props.per_page ?? props.per_page,
      page: page,
    }).then((response) => {
      let data = response.data.map((key, index) => {
        return json_parser(key);
      });

      sethistory((prev) => {
        return {
          ...prev,
          transactions: data,
          isLoading: false,
          pagination: response.pagination,
        };
      });
    });
  }

  useEffect(() => {
    loadData(1);
  }, []);

  return (
    <div className="col-lg-12">
      {history.isLoading ? (
        <LoaderIcon />
      ) : (
        <div className="history-card ">
          <div className="row">
            <div className="history-header">
              <p
                className="bold-text text-secondary"
                style={{ fontSize: "1rem" }}
              >
                Transaction History
              </p>
              <div className="">
                <label className="text-secondary">Type</label>
                <select className="drop-select" defaultValue="All">
                  <option value="All" key="all">
                    All
                  </option>
                  <option value="Airtime" key="airtime">
                    Airtime
                  </option>
                  <option value="Data" key="data">
                    Data
                  </option>
                  <option value="Electricity" key="electricity">
                    Electricity
                  </option>
                  <option value="Exam Pin" key="exam">
                    Exam Pin
                  </option>
                </select>
              </div>
              <div className="">
                <label className="text-secondary">Status</label>
                <select className="drop-select" defaultValue="All">
                  <option value="All" key="all">
                    All
                  </option>
                  <option value="Success" key="success">
                    Success
                  </option>
                  <option value="Pending" key="pending">
                    Pending
                  </option>
                  <option value="Refunded" key="refunded">
                    Refunded
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-12">
            <table className="table">
              <thead className="text-secondary small">
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Date/Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              {history.transactions && history.pagination.total_data > 0 ? (
                <tbody className="small">
                  {history.transactions.map((key, index) => (
                    <tr key={index}>
                      <td>{key.transaction_type}</td>
                      <td>{key.transaction_amount}</td>
                      <td>
                        {key.transaction_description.substring(
                          0,
                          props.isHistory !== undefined
                            ? key.transaction_description.length
                            : 20
                        )}
                        ...
                      </td>
                      <td>{datetime(key.update_at)}</td>
                      <td className={`${key.status.toString().toLowerCase()}`}>
                        {key.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <td colSpan={5}>
                  <span span className="image-middle">
                    <img src="nodata.png" alt="" width={"150px"} />
                  </span>
                  <span className="image-middle">No Transaction Found</span>
                </td>
              )}
            </table>

            {props.isHistory === undefined ? (
              ""
            ) : (
              <div className="flex-next">
                <div>
                  {history.pagination && history.pagination.total_data > 0 ? (
                    <span>
                      {history.pagination.current_page} of{" "}
                      {history.pagination.total_pages}
                    </span>
                  ) : null}
                </div>
                <div>
                  {history.pagination && history.pagination.total_data > 0 ? (
                    <>
                      <button
                        disabled={!history.pagination.has_prev}
                        className="btn btn-success "
                        onClick={() => loadData(history.pagination.prev_page)}
                      >
                        {"<"} Back
                      </button>
                      <button
                        disabled={!history.pagination.has_next}
                        className="btn btn-success mx-2"
                        onClick={() => loadData(history.pagination.next_page)}
                      >
                        Next {">"}
                      </button>{" "}
                    </>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Transactions;
