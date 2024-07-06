import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "layouts/adminLayout";
import MDButton from "components/shared/MDButton";
import { getCategoryById, updateCategory } from "service/categoryService";
import MDSnackbar from "components/shared/MDSnackbar";
import configs from "configs";
import { saveCategory } from "service/categoryService";

const EditCategoryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [errorAlert, setErrorAlert] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState({
    id: "",
    name: "",
    description: "",
    image: {
      imageName: "",
      description: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getCategoryById(id);
      setCategoryDetails(data);
    };

    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (["imageName", "imageUrl", "imageDescription"].includes(name)) {
      if (name === "imageDescription") {
        name = "description";
      }

      setCategoryDetails({
        ...categoryDetails,
        image: {
          ...categoryDetails.image,
          [name]: value,
        },
      });
    } else {
      setCategoryDetails({
        ...categoryDetails,
        [name]: value,
      });
    }
  };

  const openErrorAlert = () => setErrorAlert(true);
  const closeErrorAlert = () => setErrorAlert(false);

  const renderErrorAlert = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Lỗi"
      content="Lỗi khi chỉnh sửa danh mục, vui lòng kiểm tra lại."
      open={errorAlert}
      onClose={closeErrorAlert}
      close={closeErrorAlert}
      bgWhite
    />
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await saveCategory(categoryDetails);
      if (result === "error") {
        openErrorAlert();
      } else if (result === "success") {
        navigate(configs.routes.categories);
      }
    } catch (error) {
      console.error("Category update failed:", error);
      openErrorAlert();
    }
  };

  return (
    <AdminLayout>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Chỉnh Sửa Danh Mục
        </Typography>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Tên danh mục"
                    name="name"
                    value={categoryDetails.name}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Mô tả"
                    name="description"
                    value={categoryDetails.description}
                    onChange={handleChange}
                    required
                    multiline
                    rows={4}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Tên ảnh"
                    name="imageName"
                    value={categoryDetails.image.imageName}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Mô tả ảnh"
                    name="imageDescription"
                    value={categoryDetails.image.description}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Link ảnh"
                    name="imageUrl"
                    value={categoryDetails.image.imageUrl}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <MDButton type="submit" variant="contained" color="success">
                Lưu Thay Đổi
              </MDButton>
              <MDButton
                type="button"
                variant="contained"
                color="primary"
                onClick={() => navigate(-1)}
              >
                Hủy
              </MDButton>
            </CardActions>
          </Card>
          {renderErrorAlert}
        </form>
      </Container>
    </AdminLayout>
  );
};

export default EditCategoryPage;
