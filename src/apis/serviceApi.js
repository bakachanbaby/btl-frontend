import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/v1";

export function getservice(data) {
  return axios.get("/services");
}

export function getservicebyid(id) {
  return axios.get(`/services/${id}`);
}
export function postservice(data) {
  return axios.post("/services", {
    service_code: data.service_code,
    name: data.name,
    type: data.type,
    unit_price: data.unit_price,
  });
}

export function putservice(data, id) {
  return axios.put(`/services/${id}`, {
    service_code: data.service_code,
    name: data.name,
    type: data.type,
    unit_price: data.unit_price,
  });
}

export function deleteservice(id) {
  return axios.delete(`/services/${id}`);
}

export function searchservice(name) {
  return axios.get(`/services/search/${name}`);
}
