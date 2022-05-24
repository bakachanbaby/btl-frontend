import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/v1";

export function getemployee(id) {
  return axios.get(`company/employees?company_id=${id}`);
}

export function postemployee(data, clicked_company) {
  data.date_of_birth = Date(data.date_of_birth);
  return axios.post("/company/employees", {
    name: data.name,
    employee_code: data.employee_code,
    date_of_birth: data.date_of_birth,
    phone_number: data.phone_number,
    id_card: data.id_card,
    company_id: clicked_company,
  });
}

export function putemployee(data, clicked_company) {
  return axios.put(`/company/employees`, {
    name: data.name,
    employee_code: data.employee_code,
    date_of_birth: data.date_of_birth,
    phone_number: data.phone_number,
    company_id: data.company_id,
  });
}

export function deleteemployee(id) {
  return axios.delete(`/company/employees/${id}`);
}

export function searchemployee(name) {
  return axios.get(`/company/employees/search/${name}`);
}
