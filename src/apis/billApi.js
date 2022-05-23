import axios from "axios";
//localhost:8080/api/v1/companies/bill

axios.defaults.baseURL = "http://localhost:8080/api/v1";

export function getbill(data) {
  return axios.get("/companies/bill");
}
