import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  MenuItem,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import AdminLayout from "layouts/adminLayout";
import MDButton from "components/shared/MDButton";
import { getCategoryList } from "service/categoryService";
import { useNavigate, useParams } from "react-router-dom";
import configs from "configs";
import MDSnackbar from "components/shared/MDSnackbar";
import { saveBlog } from "service/blogService";

import * as firebaseService from "service/firebaseService";
import MDTypography from "components/shared/MDTypography";
import { adminGetBlogById } from "service/blogService";

function BlogEditPage() {
  const navigate = useNavigate();
  const [errorAlert, setErrorAlert] = useState(false);
  const { id } = useParams();
  //   const [categoryList, setCategoryList] = useState([]);
  const [blogDetails, setBlogDetails] = useState({
    title: "",
    shortDescription: "",
    author: "",
    createdAt: "",
    updatedAt: "",
    note: "",
    subContentList: [
      {
        title: "",
        subTitle: "",
        content1: "",
        content2: "",
        content3: "",
        note: "",
        image: {
          imageName: "",
          description: "",
          imageUrl: "",
        },
      },
    ],
  });

  const fetchBlogData = async (id) => {
    const blog = await adminGetBlogById(id);
    console.log(blog);
    setBlogDetails(blog);
  };

  useEffect(() => {
    fetchBlogData(id);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogDetails({
      ...blogDetails,
      [name]: value,
    });
  };

  const handleSubContentChange = (index, e) => {
    const { name, value } = e.target;
    const newSubContentList = [...blogDetails.subContentList];

    switch (name) {
      case ("imageName", "imageUrl"):
        newSubContentList[index]["image"][name] = value;
        break;
      case "imageDescription":
        newSubContentList[index]["image"]["description"] = value;
        break;
      default:
        newSubContentList[index][name] = value;
    }

    setBlogDetails({
      ...blogDetails,
      subContentList: newSubContentList,
    });
  };

  const handleAddSubContent = () => {
    setBlogDetails({
      ...blogDetails,
      subContentList: [
        ...blogDetails.subContentList,
        {
          title: "",
          subTitle: "",
          content1: "",
          content2: "",
          content3: "",
          note: "",
          image: {
            imageName: "",
            description: "",
            imageUrl: "",
          },
        },
      ],
    });
  };

  const handleRemoveSubContent = (index) => {
    const newSubContentList = blogDetails.subContentList.filter(
      (_, i) => i !== index
    );
    setBlogDetails({
      ...blogDetails,
      subContentList: newSubContentList,
    });
  };

  const openErrorAlert = () => setErrorAlert(true);
  const closeErrorAlert = () => setErrorAlert(false);

  const renderErrorAlert = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Lỗi"
      content={`Lỗi khi lưu bài viết, Vui lòng kiểm tra lại.`}
      open={errorAlert}
      onClose={closeErrorAlert}
      close={closeErrorAlert}
      bgWhite
    />
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await saveBlog(blogDetails);
      if (result === "error") {
        openErrorAlert();
      } else if (result === "success") {
        navigate(configs.routes.blogsManagement);
      }
    } catch (error) {
      openErrorAlert();
    }
  };

  //   useEffect(() => {
  //     // call category list
  //     const fetchCategoryList = async () => {
  //       const categories = await getCategoryList();
  //       setCategoryList(categories);
  //     };

  //     fetchCategoryList();
  //   }, []);

  //==========handle upload to firebase====================
  const [imageUpload, setImageUpload] = useState(null);
  const [progress, setProgress] = useState(0);

  // handle on image change
  const handleOnImageChange = (e) => {
    setProgress(0);
    setImageUpload(e.target.files[0]);
  };

  // handle when click to select image
  const handleButtonClick = (e, index) => {
    // Find the closest parent element with the data-index attribute
    const parentDiv = e.target.closest(`[data-index="${index}"]`);
    // Find the input element within the parent element
    const fileInput = parentDiv.querySelector('input[type="file"]');
    fileInput.click();
  };

  // handle when click upload button
  const uploadFile = async (index) => {
    if (imageUpload === null) {
      console.log("Please select an image");
      return;
    }

    const uploadToFolderName = "blogs";

    // upload image
    const uploadedImageUrl = await firebaseService.uploadImage(
      imageUpload,
      uploadToFolderName,
      setProgress
    );

    const element = {
      target: {
        name: "imageUrl",
        value: uploadedImageUrl,
      },
    };
    handleSubContentChange(index, element);
    setImageUpload(null);
  };

  return (
    <AdminLayout>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Chỉnh sửa bài viết
        </Typography>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={8}>
                  <TextField
                    label="Tiêu đề bài viết"
                    name="title"
                    value={blogDetails.title}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                {/* <Grid item xs={12} sm={4}>
                    <TextField
                      sx={{ heigh: "100%" }}
                      label="Danh mục"
                      name="category"
                      value={blogDetails.category.id}
                      onChange={handleChange}
                      required
                      select
                      fullWidth
                      InputProps={{
                        sx: {
                          minHeight: "45px", // This ensures the height is similar to other inputs
                        },
                      }}
                    >
                      {categoryList &&
                        categoryList.map((category) => {
                          return (
                            <MenuItem key={category.id} value={category.id}>
                              {category.name}
                            </MenuItem>
                          );
                        })}
                    </TextField>
                  </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    label="Tác giả/ bút danh"
                    name="author"
                    value={blogDetails.author}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Mô tả đầu bài viết"
                    name="shortDescription"
                    value={blogDetails.shortDescription}
                    onChange={handleChange}
                    required
                    multiline
                    rows={4}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Ghi chú"
                    name="note"
                    value={blogDetails.note}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                {blogDetails.subContentList &&
                  blogDetails.subContentList.map((subContent, index) => (
                    <Grid item xs={12} key={index}>
                      <Card variant="outlined">
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <TextField
                                label="Tiêu đề"
                                name="title"
                                value={subContent.title}
                                onChange={(e) =>
                                  handleSubContentChange(index, e)
                                }
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                label="Phụ đề"
                                name="subTitle"
                                value={subContent.subTitle}
                                onChange={(e) =>
                                  handleSubContentChange(index, e)
                                }
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                label="Nội dung 1"
                                name="content1"
                                value={subContent.content1}
                                onChange={(e) =>
                                  handleSubContentChange(index, e)
                                }
                                fullWidth
                                multiline
                                rows={2}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                label="Nội dung 2"
                                name="content2"
                                value={subContent.content2}
                                onChange={(e) =>
                                  handleSubContentChange(index, e)
                                }
                                fullWidth
                                multiline
                                rows={2}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                label="Nội dung 3"
                                name="content3"
                                value={subContent.content3}
                                onChange={(e) =>
                                  handleSubContentChange(index, e)
                                }
                                fullWidth
                                multiline
                                rows={2}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                label="Ghi chú"
                                name="note"
                                value={subContent.note}
                                onChange={(e) =>
                                  handleSubContentChange(index, e)
                                }
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                label="Tên Ảnh"
                                name="imageName"
                                value={subContent.image.name}
                                onChange={(e) =>
                                  handleSubContentChange(index, e)
                                }
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                label="Mô tả ảnh"
                                name="imageDescription"
                                value={subContent.image.description}
                                onChange={(e) =>
                                  handleSubContentChange(index, e)
                                }
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                label="Link ảnh"
                                name="imageUrl"
                                value={subContent.image.imageUrl}
                                onChange={(e) =>
                                  handleSubContentChange(index, e)
                                }
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12} data-index={index}>
                              <input
                                hidden
                                id={index}
                                label="Image"
                                placeholder="Chọn ảnh"
                                accept="image/png,image/jpeg"
                                type="file"
                                onChange={(e) => handleOnImageChange(e, index)}
                              />

                              <MDButton
                                type="button"
                                variant="contained"
                                color="warning"
                                onClick={(e) => {
                                  handleButtonClick(e, index);
                                }}
                              >
                                Chọn Ảnh
                              </MDButton>
                              {imageUpload && (
                                <>
                                  <MDButton
                                    type="button"
                                    variant="contained"
                                    color="info"
                                    onClick={() => {
                                      uploadFile(index);
                                    }}
                                    sx={{ mx: 1 }}
                                  >
                                    upload ảnh
                                  </MDButton>
                                  <MDTypography>
                                    {imageUpload.name}
                                  </MDTypography>
                                  <progress
                                    id="uploader"
                                    value={progress}
                                    max="100"
                                  >
                                    0%
                                  </progress>
                                </>
                              )}
                            </Grid>
                          </Grid>
                        </CardContent>
                        <CardActions>
                          <IconButton
                            color="secondary"
                            onClick={() => handleRemoveSubContent(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                <Grid item xs={12}>
                  <MDButton
                    variant="outlined"
                    color="info"
                    onClick={handleAddSubContent}
                    startIcon={<AddIcon />}
                  >
                    Thêm SubContent
                  </MDButton>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <MDButton type="submit" variant="contained" color="success">
                Lưu bài đăng
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
}

export default BlogEditPage;
