import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/v1";

export function getservice() {
  return axios.get("/services");
}

export function getservicebyid(id) {
  return axios.get(`/services/${id}`);
}

export function getservicebycode(code) {
  return axios.get(`/services/get_by_code/${code}`);
}
export function postservice(data) {
  data.unit_price = parseInt(data.unit_price)
  console.log(data);
  return axios.post("/services", {
    service_code: data.service_code,
    name: data.name,
    type: data.type,
    unit_price: data.unit_price,
  });
}

export function putservice(data, id) {
  data.unit_price = parseInt(data.unit_price);
  return axios.put(`/services`, {
    id: id,
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
