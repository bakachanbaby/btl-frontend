// import { useState, useEffect } from "react";
// import { FaEdit, FaTrash } from "react-icons/all";
// import { notification, Popconfirm, Button, Pagination } from "antd";
// import {
//   getcompanyservice,
//   deletecompanyservice,
// } from "../../apis/companyServiceApi";
// import React from 'react'

// const StaffService = ({match}) => {
//   const [CompanyServices, setCompanyServices] = useState([]);
//   const [editModal, setEditModal] = useState(null);
//   const [isDelete, setIsDelete] = useState(null);
//   const [idCompany, setIdCompany] = useState(null);
//   console.log(match);
//   useEffect(() => {
//     console.log(match);
//     setIdCompany(match.params.id);
//     getcompanyservice(match.params.id)
//       .then((response) => {
//         setCompanyServices(response.data);
//       })
//       .catch((error) => console.log(error));
//   }, []);

//   const onConfirmDelete = () => {
//     deletecompanyservice(isDelete)
//       .then(() => displayCompanyService())
//       .catch(() => {
//         notification["error"]({
//           message: "Delete CompanyService failed",
//           placement: "topRight",
//         });
//       });
//   };

//   const displayCompanyService = () => {
//     getcompanyservice(idCompany)
//       .then((response) => {
//         setCompanyServices(response.data);
//         notification["success"]({
//           message: "Delete CompanyService successful",
//           placement: "topRight",
//         });
//       })
//       .catch((error) => console.log(error));
//   };
//   return (
//     <div>StaffService</div>
//   )
// }

// export default StaffService