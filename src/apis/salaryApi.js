import axios from "axios";

http: axios.defaults.baseURL = "http://localhost:8080/api/v1";

export function getsalary(data) {
  return axios.get("/staffs/salary");
}
