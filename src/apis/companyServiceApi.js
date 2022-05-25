import axios from "axios";
import { getservicebycode } from "./serviceApi";

axios.defaults.baseURL = "http://localhost:8080/api/v1";

export function getcompanyservice(id) {
  return axios.get(`company/services/${id}`);
}

export function postcompanyservice(data, company) {
  // var service = getservicebycode(data.service_code).data;
  getservicebycode(data.service_code).then((response) => {
    var service = response.data;
    // console.log(service);
    console.log(company);
    return axios.post("/company/services", {
      company: company,
      service: service,
      month: data.month,
    });
  })
  
}

export function putcompanyservice(data,company, id) {
  getservicebycode(data.service_code).then((response) => {
    var service = response.data;
    // console.log(service);
    console.log(company);
    return axios.put("/company/services", {
      id: id,
      company: company,
      service: service,
      month: data.month,
    });
  })
}

export function deletecompanyservice(id) {
  return axios.delete(`/company/services/${id}`);
}
