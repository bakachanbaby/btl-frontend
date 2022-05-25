import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/v1";

export function getstaff(data) {
  return axios.get("/staffs");
}

export function poststaff(data) {
  data.date_of_birth = new Date(data.date_of_birth)
  console.log(data);
  return axios.post("/staffs", {
    code: data.code,
    name: data.name,
    date_of_birth: data.date_of_birth,
    address: data.address,
    phone_number: data.phone_number,
  });
}

export function putstaff(data, id) {
  return axios.put(`/staffs`, {
    id: id,
    code: data.code,
    name: data.name,
    date_of_birth: data.date_of_birth,
    address: data.address,
    phone_number: data.phone_number,
  });
}

export function deletestaff(id) {
  return axios.delete(`/staffs/${id}`);
}

export function searchstaff(name) {
  return axios.get(`/staffs/search/${name}`);
}
