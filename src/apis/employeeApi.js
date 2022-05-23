import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/v1";

export function getemployee(id) {
  return axios.get(`companies/${id}/employees`);
}

export function postemployee(data, id) {
  return axios.post("/employees", {
    name: data.name,
    employee_code: data.employee_code,
    date_of_birth: data.date_of_birth,
    phone_number: data.phone_number,
    company_id: id,
  });
}

export function putemployee(data, id) {
  return axios.put(`/employees/${id}`, {
    name: data.name,
    employee_code: data.employee_code,
    date_of_birth: data.date_of_birth,
    phone_number: data.phone_number,
    company_id: data.company_id,
  });
}

export function deleteemployee(id) {
  return axios.delete(`/employees/${id}`);
}

export function searchemployee(name) {
  return axios.get(`/employees/search/${name}`);
}
