import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/v1";

export function getemployee(id) {
  return axios.get(`/company/employees/get_by_company?company_id=${id}`);
}

export function postemployee(data, company) {
  company.authorized_capital = parseInt(company.authorized_capital);
  company.company_id = parseInt(company.company_id);
  company.ground_area = parseInt(company.ground_area);
  console.log(data);
  return axios.post("/company/employees", {
    employee_name: data.employee_name,
    employee_code: data.employee_code,
    date_of_birth: data.date_of_birth,
    phone_number: data.phone_number,
    id_card: data.id_card,
    // company: JSON.stringify(company),
    company:company,

  });
}

export function putemployee(data, company,id) {
  console.log(data);
  // console.log(company);
  company.authorized_capital = parseInt(company.authorized_capital);
  company.company_id = parseInt(company.company_id);
  company.ground_area = parseInt(company.ground_area);
  console.log(data);
  return axios.put("/company/employees", {
    id:id,
    employee_name: data.employee_name,
    employee_code: data.employee_code,
    date_of_birth: data.date_of_birth,
    phone_number: data.phone_number,
    id_card: data.id_card,
    company: company

  });
}

export function deleteemployee(id) {
  return axios.delete(`/company/employees/${id}`);
}

export function searchemployee(name) {
  return axios.get(`/company/employees/search/${name}`);
}
