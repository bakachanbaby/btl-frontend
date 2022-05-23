import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/v1";

export function getstaffservice(id) {
  return axios.get(`companies/${id}/staff_services`);
}

export function poststaffservice(data, staff, service) {
  console.log(staff);
  return axios.post("/staff_services", {
    staff_salary: data.staff_salary,
    staff_position: data.staff_position,
    staff_level: data.staff_level,
    // phone_number: data.phone_number,
    service: {
      id: service.id,
      name: service.name,
      service_code: service.id,
    },
    staff: {
      id: staff.id,
      staff_code: staff.staff_code,
      name: staff.name,
    },
  });
}

export function putstaffservice(data, id) {
  return axios.put(`/staff_services/${id}`, {
    staff_salary: data.staff_salary,
    staff_position: data.staff_position,
    staff_level: data.date_of_birth,
    phone_number: data.phone_number,
    company_id: data.company_id,
  });
}

export function deletestaffservice(id) {
  return axios.delete(`/staff_services/${id}`);
}
