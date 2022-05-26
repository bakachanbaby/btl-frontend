import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/v1";

export function getcompanyservice(id) {
  return axios.get(`company/services/${id}`);
}

export function postcompanyservice(data, company, service) {
  return axios.post("/company/services", {
    company: company,
    service: service,
    month: data.month,
  });

}

export function putcompanyservice(data, company, service, id) {
  return axios.put("/company/services", {
    id: id,
    company: company,
    service: service,
    month: data.month,
  });

}

export function deletecompanyservice(id) {
  return axios.delete(`/company/services/${id}`);
}
