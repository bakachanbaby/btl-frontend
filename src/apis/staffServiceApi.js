import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/v1";

export function getstaffservice(id) {
  return axios.get(`staff_services/${id}`);
}

export function poststaffservice(data, staff, service) {
  return axios.post("/staff_services", {
    staff_salary: data.staff_salary,
    staff_position: data.staff_position,
    staff_level: data.staff_level,
    // phone_number: data.phone_number,
    service: service,
    staff: staff,
  });
}

export function putstaffservice(data,staff, service, id) {
  return axios.put(`/staff_services`, {
    id: id,
    staff_salary: data.staff_salary,
    staff_position: data.staff_position,
    staff_level: data.staff_level,
    // phone_number: data.phone_number,
    service: service,
    staff: staff,
  });
}

export function deletestaffservice(id) {
  return axios.delete(`/staff_services/${id}`);
}
