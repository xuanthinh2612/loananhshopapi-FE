import React, { useRef, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import AdminLayout from "layouts/adminLayout";
import MDButton from "components/shared/MDButton";
import { saveCategory } from "service/categoryService";
import MDSnackbar from "components/shared/MDSnackbar";
import configs from "configs";

import * as firebaseService from "service/firebaseService";
import MDInput from "components/shared/MDInput";
import MDTypography from "components/shared/MDTypography";

const NewCategoryPage = () => {
  const navigate = useNavigate();
  const [errorAlert, setErrorAlert] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState({
    name: "",
    description: "",
    image: {
      imageName: "",
      description: "",
      imageUrl: "",
    },
  });

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
      content="Lỗi khi tạo mới danh mục, vui lòng kiểm tra lại."
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
      console.error("Category creation failed:", error);
      openErrorAlert();
    }
  };

  //==========handle upload to firebase====================
  const [imageUpload, setImageUpload] = useState(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  // handle on image change
  const handleOnImageChange = (e) => {
    setProgress(0);
    setImageUpload(e.target.files[0]);
  };

  // handle when click to select image
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // handle when click upload button
  const uploadFile = async () => {
    if (imageUpload === null) {
      console.log("Please select an image");
      return;
    }

    const uploadToFolderName = "categories";

    // upload image
    const uploadedImageUrl = await firebaseService.uploadImage(
      imageUpload,
      uploadToFolderName,
      setProgress
    );

    const newCategoryDetails = { ...categoryDetails };
    newCategoryDetails.image.imageUrl = uploadedImageUrl;
    setCategoryDetails(newCategoryDetails);
    setImageUpload(null);
  };

  return (
    <AdminLayout>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Tạo Danh Mục Mới
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
                <Grid item xs={12}>
                  <input
                    ref={fileInputRef}
                    hidden
                    label="Image"
                    placeholder="Choose image"
                    accept="image/png,image/jpeg"
                    type="file"
                    onChange={(e) => handleOnImageChange(e)}
                  />

                  <MDButton
                    type="button"
                    variant="contained"
                    color="warning"
                    onClick={handleButtonClick}
                  >
                    Chọn Ảnh
                  </MDButton>
                  {imageUpload && (
                    <>
                      <MDButton
                        type="button"
                        variant="contained"
                        color="info"
                        onClick={uploadFile}
                        sx={{ mx: 1 }}
                      >
                        upload ảnh
                      </MDButton>
                      <MDTypography>{imageUpload.name}</MDTypography>
                      <progress id="uploader" value={progress} max="100">
                        0%
                      </progress>
                    </>
                  )}
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <MDButton type="submit" variant="contained" color="success">
                Tạo Danh Mục
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

export default NewCategoryPage;
