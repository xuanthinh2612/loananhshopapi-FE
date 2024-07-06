import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminLayout from "layouts/adminLayout";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { getCategoryList, deleteCategory } from "service/categoryService";
import MDSnackbar from "components/shared/MDSnackbar";
import configs from "configs";
import MDButton from "components/shared/MDButton";
import ConfirmModal from "components/shared/ConfirmModal";

const CategoryListPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [errorAlert, setErrorAlert] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState();
  const [selectedId, setSelectedId] = useState();

  const fetchCategories = async () => {
    const data = await getCategoryList();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await deleteCategory(id);
      if (result === "error") {
        setErrorAlert(true);
      } else {
        fetchCategories();
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
      setErrorAlert(true);
    }
  };

  const handleEdit = (id) => {
    navigate(`${configs.routes.categoryEditWith}/${id}`);
  };

  const handleAddNew = () => {
    navigate(configs.routes.newCategory);
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
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Danh Sách Danh Mục
        </Typography>
        <MDButton
          variant="contained"
          color="info"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
          style={{ marginBottom: "20px" }}
        >
          Thêm Mới
        </MDButton>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Ảnh</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Mô Tả</TableCell>
                <TableCell>Hành Động</TableCell>
              </TableRow>

              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>
                    <img
                      src={category.image.imageUrl}
                      alt={category.image.description}
                      style={{ width: "100px", height: "auto" }}
                    />
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <IconButton
                      name="edit"
                      color="dark"
                      onClick={() => handleClickButton("edit", category.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      name="delete"
                      color="primary"
                      onClick={() => handleClickButton("delete", category.id)}
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
          content="Lỗi khi xóa danh mục, vui lòng thử lại."
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
      </Container>
    </AdminLayout>
  );
};

export default CategoryListPage;
