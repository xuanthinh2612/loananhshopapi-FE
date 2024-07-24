import React, { useEffect, useState } from "react";
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
  IconButton,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminLayout from "layouts/adminLayout";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { getBlogListByAdmin, deleteBlog } from "service/blogService";
import MDSnackbar from "components/shared/MDSnackbar";
import MDButton from "components/shared/MDButton";
import ConfirmModal from "components/shared/ConfirmModal";
import configs from "configs";

const BlogManagement = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [errorAlert, setErrorAlert] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState();
  const [selectedId, setSelectedId] = useState();

  const fetchBlogs = async () => {
    const data = await getBlogListByAdmin();
    console.log(data);
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await deleteBlog(id);
      if (result === "error") {
        setErrorAlert(true);
      } else {
        fetchBlogs();
      }
    } catch (error) {
      console.error("Failed to delete blog:", error);
      setErrorAlert(true);
    }
  };

  const handleEdit = (id) => {
    navigate(`${configs.routes.blogEditWith}${id}`);
  };

  const handleAddNew = () => {
    navigate(configs.routes.newBlog);
  };

  const closeErrorAlert = () => setErrorAlert(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleClickButton = async (action, id) => {
    setSelectedId(id);
    setAction(action);
    setModalOpen(true);
  };

  const handleConfirmAction = async (action, selectedId) => {
    switch (action) {
      case "delete":
        await handleDelete(selectedId);
        break;
      case "edit":
        handleEdit(selectedId);
        break;
    }
    handleCloseModal();
  };

  return (
    <AdminLayout>
      <Typography variant="h4" gutterBottom>
        Danh Sách Blog
      </Typography>
      <MDButton
        variant="contained"
        color="info"
        startIcon={<AddIcon />}
        onClick={handleAddNew}
        style={{ marginBottom: "20px" }}
      >
        Thêm Blog Mới
      </MDButton>
      <TableContainer component={Paper}>
        <Table>
          <TableHead></TableHead>
          <TableBody>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Ảnh</TableCell>
              <TableCell>Tiêu Đề</TableCell>
              <TableCell>Mô Tả</TableCell>
              <TableCell>Hành Động</TableCell>
            </TableRow>

            {blogs &&
              blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>{blog.id}</TableCell>
                  <TableCell>
                    {blog.avatar && (
                      <img
                        src={blog.avatar.imageUrl}
                        alt={blog.avatar.description}
                        style={{ width: "100px", height: "auto" }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{blog.shortDescription}</TableCell>
                  <TableCell>
                    <IconButton
                      name="edit"
                      color="dark"
                      onClick={() => handleClickButton("edit", blog.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      name="delete"
                      color="primary"
                      onClick={() => handleClickButton("delete", blog.id)}
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
        content="Lỗi khi xóa blog, vui lòng thử lại."
        open={errorAlert}
        onClose={closeErrorAlert}
        close={closeErrorAlert}
        bgWhite
      />
      <ConfirmModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={() => {
          handleConfirmAction(action, selectedId);
        }}
        title="Xác Nhận"
        message="Bạn có chắc muốn thực hiện?"
      />
    </AdminLayout>
  );
};

export default BlogManagement;
