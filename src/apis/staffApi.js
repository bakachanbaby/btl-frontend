import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/v1";

export function getstaff(data) {
  return axios.get("/staffs");
}

export function poststaff(data) {
  return axios.post("/staffs", {
    staff_code: data.staff_code,
    name: data.name,
    date_of_birth: data.date_of_birth,
    address: data.address,
    phone_number: data.phone_number,
    wage: data.wage,
    position: data.position,
  });
}

export function putstaff(data, id) {
  return axios.put(`/staffs/${id}`, {
    staff_code: data.staff_code,
    name: data.name,
    date_of_birth: data.date_of_birth,
    address: data.address,
    phone_number: data.phone_number,
    wage: data.wage,
    position: data.position,
  });
}

export function deletestaff(id) {
  return axios.delete(`/staffs/${id}`);
}

export function searchstaff(name) {
  return axios.get(`/staffs/search/${name}`);
}
