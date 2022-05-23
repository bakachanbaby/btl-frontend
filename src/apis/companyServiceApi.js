import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/v1";

export function getcompanyservice(id) {
  return axios.get(`company/services/${id}`);
}

export function postcompanyservice(data, company, service) {
  console.log(company);
  return axios.post("/company/services", {
    company: {
      id: company.id,

      name: company.name,
    },
    service: {
      id: service.id,
    },

    month: data.month,
  });
}

export function putcompanyservice(data, id) {
  return axios.put(`/company_services/${id}`, {
    company_salary: data.company_salary,
    company_position: data.company_position,
    company_level: data.date_of_birth,
    phone_number: data.phone_number,
    company_id: data.company_id,
  });
}

export function deletecompanyservice(id) {
  return axios.delete(`/company/services/${id}`);
}
