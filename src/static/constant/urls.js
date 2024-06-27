import { BASE_URL } from "./env_file";

let url = {
  login: BASE_URL + "/login",
  getAllUser: BASE_URL + "/all-user",
  getSingleUser: (id) => BASE_URL + `/user/${id}`,
  banUser: BASE_URL + "/ban",
  credit: BASE_URL + "/credit",
  countUser: BASE_URL + "/allUserCount",
  fundRequest: BASE_URL + "/all-fund-request",
  approvePayment: BASE_URL + "/approvePayment",
  fetchTotalTopup: BASE_URL + "/fetchTotalTopup",
  allWithdrawalRequest: BASE_URL + "/allWithdrawalRequest",
  approveWithdraw: BASE_URL + "/approveWithdraw",
  savePaymentMethod: BASE_URL + "/savePaymentMethod",
  getPaymentMethod: BASE_URL + "/getPaymentMethod",
  setPercentage: BASE_URL + "/setPercentage",
  getPercentage: BASE_URL + "/getPercentage",
};

export default url;
