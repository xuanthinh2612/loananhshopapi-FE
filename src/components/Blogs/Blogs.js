import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import DefaultLayout from "layouts/defaultLayout";
import MDButton from "components/shared/MDButton";

import MultiLineEllipsis from "components/shared/MultiLineEllipsis";
import MDBox from "components/shared/MDBox";
import { Margin } from "@mui/icons-material";
import { getBlogList, getMainBlog } from "service/blogService";

const Blogs = () => {
  const [mainBlog, setMainBlog] = useState(null);
  const [blogList, setBlogList] = useState([]);

  const fetchBlogListData = async () => {
    const blogs = await getBlogList();
    setBlogList(blogs);
  };

  const fectMainBlog = async () => {
    const mainBlog = await getMainBlog();
    setMainBlog(mainBlog);
  };

  useEffect(() => {
    fetchBlogListData();
    fectMainBlog();
  }, []);

  return (
    <DefaultLayout>
      <Container maxWidth="lg">
        {mainBlog && (
          <Grid container spacing={4} justifyContent="left" alignItems="center">
            <Grid item xs={12} md={6}>
              <Card style={{ marginBottom: "20px", paddingBottom: "20px" }}>
                <CardMedia
                  component="img"
                  image={mainBlog.avatar.imageUrl}
                  alt={mainBlog.title}
                  title={mainBlog.title}
                  sx={{
                    height: {
                      xs: "220px",
                      sm: "200px",
                      md: "300px",
                      lg: "380px",
                    },
                    objectFit: "cover",
                  }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {mainBlog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {mainBlog.shortDescription}
                </Typography>
                <MDButton
                  sx={{ m: "5px" }}
                  component={Link}
                  to={`/blogs/${mainBlog.id}`}
                  variant="contained"
                  color="info"
                >
                  Đọc Thêm
                </MDButton>
              </CardContent>
            </Grid>
          </Grid>
        )}
        <Typography variant="h3" mb={3}>
          Bài viết nổi bật
        </Typography>
        <Grid container spacing={2}>
          {blogList &&
            blogList.map((blog) => (
              <Grid mb={3} item key={blog.id} xs={12} sm={6} md={6} lg={4}>
                <Link to={`/blogs/${blog.id}`}>
                  <Card sx={{ p: 0, m: 0, borderRadius: 0 }}>
                    <CardMedia
                      component="img"
                      sx={{
                        height: {
                          xs: "180px",
                          sm: "200px",
                          md: "220px",
                          lg: "250px",
                        },
                        objectFit: "cover",
                      }}
                      image={blog.avatar.imageUrl}
                      alt={blog.title}
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {/* <MDBox mb={3} lineHeight={0}> */}
                        <MultiLineEllipsis
                        // variant="button"
                        // fontWeight="light"
                        // color="text"
                        >
                          {blog.title}
                        </MultiLineEllipsis>
                        {/* </MDBox> */}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <MDBox mb={3} lineHeight={0}>
                          <MultiLineEllipsis
                            variant="button"
                            fontWeight="light"
                            color="text"
                          >
                            {blog.shortDescription}
                          </MultiLineEllipsis>
                        </MDBox>
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
        </Grid>
      </Container>
    </DefaultLayout>
  );
};

export default Blogs;
