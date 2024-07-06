import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminLayout from "layouts/adminLayout";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import MDSnackbar from "components/shared/MDSnackbar";
import configs from "configs";
import { getAllUserList } from "service/userService";

const UserManagementPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [errorAlert, setErrorAlert] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const listUsers = await getAllUserList();
      console.log(listUsers);
      setUsers(listUsers);
    };

    fetchUserData();
  }, []);

  const handleDelete = (id) => {
    // axios
    //   .delete(`/api/users/${id}`)
    //   .then(() => {
    //     setUsers(users.filter((user) => user.id !== id));
    //   })
    //   .catch((error) => {
    //     console.error("There was an error deleting the user!", error);
    //     setErrorAlert(true);
    //   });
  };

  const handleEdit = (id) => {
    // navigate(`${configs.routes.userEditWith}/${id}`);
  };

  // const handleAddNew = () => {
  //   navigate(configs.routes.userAddNew);
  // };

  const closeErrorAlert = () => setErrorAlert(false);

  return (
    <AdminLayout>
      <Typography variant="h4" gutterBottom>
        Quản Lý Người Dùng
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead></TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Tên Đăng Nhập</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số Điện Thoại</TableCell>
              <TableCell>Địa Chỉ</TableCell>
              <TableCell>Tuổi</TableCell>
              <TableCell>Giới Tính</TableCell>
              <TableCell>Hành Động</TableCell>
            </TableRow>
            {/* {users && <p> {users.length}</p>} */}
            {users.length > 0 &&
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(user.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(user.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MDSnackbar
        color="error"
        icon="warning"
        title="Lỗi"
        content="Lỗi khi xóa người dùng, vui lòng thử lại."
        open={errorAlert}
        onClose={closeErrorAlert}
        close={closeErrorAlert}
        bgWhite
      />
    </AdminLayout>
  );
};

export default UserManagementPage;
