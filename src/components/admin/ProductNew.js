// import { useCallback, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { pencel, trash, plus } from "../../assets/icons";
// import configs from "../../configs";
// import ConfirmModal from "./../ConfirmModal";
// import store from "../../store";
// import {
//   getListStudentAction,
//   deleteStudentByIdAction,
//   resetStoreAction,
// } from "../../actions/studentActions";
// import { connect } from "react-redux";
// import { isAdminUser, isUserLoggedIn } from "../../service/authService";
// import Grid from "@mui/material/Unstable_Grid2";

// // import SpinnerIcon from "../../SpinnerIcon";

// import { getClassList } from "../../service/classService";
// import { createStudent } from "../../service/studentService";
// import { createStudentAction } from "../../actions/studentActions";
// import * as React from "react";
// import Paper from "@mui/material/Paper";
// import Stack from "@mui/material/Stack";
// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import IconButton from "@mui/material/IconButton";
// import Input from "@mui/material/Input";
// import FilledInput from "@mui/material/FilledInput";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import InputAdornment from "@mui/material/InputAdornment";
// import FormHelperText from "@mui/material/FormHelperText";
// import FormControl from "@mui/material/FormControl";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

// import AdminLayout from "layouts/adminLayout";

// function ProductNew() {
//   let initStudentValue = {
//     firstName: "",
//     lastName: "",
//     age: "",
//     address: "",
//     email: "",
//     schoolClass: {},
//   };
//   const [studentState, setStudentSate] = useState(initStudentValue);
//   const [classList, setClassList] = useState([]);
//   const navigate = useNavigate();
//   const ageOptions = Array.from({ length: 70 }, (_, index) => index + 1);

//   useEffect(() => {
//     // const getClassListApi = async () => {
//     //   const classData = await getClassList();
//     //   setClassList(classData);
//     // };
//     // getClassListApi();
//   }, []);

//   // const Item = styled(Paper)(({ theme }) => ({
//   //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   //   ...theme.typography.body2,
//   //   padding: theme.spacing(1),
//   //   textAlign: "center",
//   //   color: theme.palette.text.secondary,
//   // }));

//   const handleChangeFirstName = (value) => {
//     const newStudentState = {
//       ...studentState,
//       firstName: value,
//     };

//     setStudentSate(newStudentState);
//   };
//   const handleChangeLastName = (value) => {
//     const newStudentState = {
//       ...studentState,
//       lastName: value,
//     };

//     setStudentSate(newStudentState);
//   };
//   const handleChangeAge = (value) => {
//     const newStudentState = {
//       ...studentState,
//       age: value,
//     };

//     setStudentSate(newStudentState);
//   };
//   const handleChangeAddress = (value) => {
//     const newStudentState = {
//       ...studentState,
//       address: value,
//     };

//     setStudentSate(newStudentState);
//   };
//   const handleChangeEmail = (value) => {
//     const newStudentState = {
//       ...studentState,
//       email: value,
//     };

//     setStudentSate(newStudentState);
//   };
//   const handleChangeClass = (value) => {
//     const newStudentState = {
//       ...studentState,
//       schoolClass: { id: value },
//     };

//     setStudentSate(newStudentState);
//   };

//   const onSubmit = async (studentForCreate) => {
//     await store.dispatch(createStudentAction(studentForCreate));
//     navigate(configs.routes.studentList);
//   };

//   const cancelCreateStudent = () => {
//     navigate(-1);
//   };
//   return (
//     <AdminLayout>
//       <div className="container">
//         <form className="row d-flex justify-content-center p-5 ">
//           <div className="col-12  d-flex justify-content-center">
//             <h3>Tạo mới sản phẩm</h3>
//           </div>
//           <div className="col-12 p-5">
//             <div className="border p-3">
//               <Box sx={{ flexGrow: 1 }}>
//                 <Grid container spacing={2}>
//                   <Grid xs={12}>
//                     <FormControl fullWidth sx={{ m: 0 }}>
//                       <TextField
//                         id="outlined-basic"
//                         label="Tên Mặt Hàng"
//                         variant="outlined"
//                       />
//                     </FormControl>
//                   </Grid>
//                 </Grid>
//               </Box>
//               <Box
//                 fullWidth
//                 component="form"
//                 sx={{
//                   "& > :not(style)": { m: 1, width: "25ch" },
//                 }}
//                 noValidate
//                 autoComplete="off"
//               ></Box>
//               <Box sx={{ flexGrow: 1 }}>
//                 <Grid container spacing={2}>
//                   <Grid xs={4}></Grid>
//                   <Grid xs={8}></Grid>
//                   <Grid xs={4}></Grid>
//                 </Grid>
//               </Box>
//               <div className="form-floating mb-3">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="First Name"
//                   value={studentState.firstName}
//                   onChange={(e) => handleChangeFirstName(e.target.value)}
//                 />
//                 <label>First Name</label>
//               </div>

//               <div className="form-floating mb-3">
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={studentState.lastName}
//                   onChange={(e) => handleChangeLastName(e.target.value)}
//                 />
//                 <label>Last Name</label>
//               </div>
//               <div className="form-floating mb-3">
//                 <select
//                   className="form-select"
//                   aria-label="Floating label select example"
//                   value={studentState.age}
//                   onChange={(e) => handleChangeAge(e.target.value)}
//                 >
//                   <option value={0}>Age</option>
//                   {ageOptions.map((age, index) => {
//                     return (
//                       <option key={index} value={age}>
//                         {age}
//                       </option>
//                     );
//                   })}
//                 </select>
//                 <label>Age</label>
//               </div>

//               <div className="form-floating mb-3">
//                 <input
//                   className="form-control"
//                   value={studentState.address}
//                   onChange={(e) => handleChangeAddress(e.target.value)}
//                 />
//                 <label>Address</label>
//               </div>
//               <div className="form-floating mb-3">
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={studentState.email}
//                   onChange={(e) => handleChangeEmail(e.target.value)}
//                 />
//                 <label>Email</label>
//               </div>

//               <div className="form-floating">
//                 <select
//                   className="form-select"
//                   aria-label="Floating label select example"
//                   value={studentState.schoolClass.id}
//                   onChange={(e) => handleChangeClass(e.target.value)}
//                 >
//                   <option>Select Class Name</option>
//                   {classList.map((obj) => {
//                     return (
//                       <option key={obj.id} value={obj.id}>
//                         {obj.name}
//                       </option>
//                     );
//                   })}
//                 </select>
//                 <label>Class Name</label>
//               </div>
//               <div className="col-7">
//                 <div className="d-flex mt-3 ">
//                   <ConfirmModal callback={onSubmit} param={studentState}>
//                     <button
//                       className="btn btn-outline-success mx-2"
//                       type="button"
//                     >
//                       Create Student
//                     </button>
//                   </ConfirmModal>

//                   <ConfirmModal callback={cancelCreateStudent}>
//                     <button
//                       className="btn btn-outline-danger mx-2"
//                       type="button"
//                     >
//                       Cancel
//                     </button>
//                   </ConfirmModal>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </AdminLayout>
//   );
// }

// export default ProductNew;
