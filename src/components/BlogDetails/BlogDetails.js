import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";

import { useEffect, useState } from "react";
import { getBlogById } from "service/blogService";
import DefaultLayout from "layouts/defaultLayout";
import SideBar from "./Sidebar";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const fetchBlogDataById = async (id) => {
    const fetchData = await getBlogById(id);
    setBlog(fetchData);
  };

  useEffect(() => {
    fetchBlogDataById(id);
  }, [id]);

  const sidebar = {
    title: "About",
    description:
      "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
    archives: [
      { title: "March 2020", url: "#" },
      { title: "February 2020", url: "#" },
      { title: "January 2020", url: "#" },
      { title: "November 1999", url: "#" },
      { title: "October 1999", url: "#" },
      { title: "September 1999", url: "#" },
      { title: "August 1999", url: "#" },
      { title: "July 1999", url: "#" },
      { title: "June 1999", url: "#" },
      { title: "May 1999", url: "#" },
      { title: "April 1999", url: "#" },
    ],
    social: [
      { name: "GitHub", icon: GitHubIcon },
      { name: "X", icon: XIcon },
      { name: "Facebook", icon: FacebookIcon },
    ],
  };

  return (
    <DefaultLayout>
      <Container>
        {blog && (
          <Grid container>
            <Grid item xs={12} md={8}>
              <Card>
                <Grid p={2} mb={0} container justifyContent="center">
                  <Grid item xs={12} md={12}>
                    <Box display="flex" alignItems="center" height="100%">
                      <CardContent>
                        <Typography variant="h3" py={2}>
                          {blog.title}
                        </Typography>
                        <Typography variant="h6" color={"secondary"}>
                          Tác giả:&nbsp; {blog.author}
                        </Typography>
                        <Typography variant="caption" color={"secondary"}>
                          Ngày Đăng:&nbsp;
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </Typography>

                        <Typography
                          variant="h6"
                          sx={{ textAlign: "justify" }}
                          py={2}
                        >
                          {blog.shortDescription}
                        </Typography>
                      </CardContent>
                    </Box>
                  </Grid>
                </Grid>

                {blog.subContentList.map((subContent, index) => (
                  <Grid
                    key={index}
                    px={2}
                    mb={0}
                    container
                    justifyContent="center"
                  >
                    <>
                      {subContent.image && subContent.image.imageUrl && (
                        <Grid item xs={12} md={10}>
                          <Card>
                            <CardMedia
                              sx={{ p: 0, m: 0 }}
                              component="img"
                              image={subContent.image.imageUrl}
                              alt={blog.title}
                            />
                          </Card>

                          {subContent.image.imageName && (
                            <CardContent sx={{ textAlign: "center", pt: 1 }}>
                              <Typography variant="caption">
                                {subContent.image.imageName}
                              </Typography>
                            </CardContent>
                          )}
                        </Grid>
                      )}
                      <Grid item xs={12} md={12}>
                        <Box display="flex" alignItems="center" height="100%">
                          <CardContent>
                            {subContent.title && (
                              <Typography
                                variant="h4"
                                sx={{ textAlign: "justify" }}
                                py={2}
                              >
                                {subContent.title}
                              </Typography>
                            )}
                            <Typography
                              variant="body1"
                              sx={{ textAlign: "justify" }}
                            >
                              {subContent.content1}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{ textAlign: "justify" }}
                            >
                              {subContent.content2}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{ textAlign: "justify" }}
                            >
                              {subContent.content3}
                            </Typography>
                          </CardContent>
                        </Box>
                      </Grid>
                    </>
                  </Grid>
                ))}
              </Card>
            </Grid>
            <Grid item xs={12} md={4} sx={{ position: "relative" }}>
              <SideBar
                title={sidebar.title}
                description={sidebar.description}
                archives={sidebar.archives}
                social={sidebar.social}
              />
            </Grid>
          </Grid>
        )}
        <Grid container spacing={4} mt={5}>
          <Grid item xs={12}>
            <Divider />
            <Typography variant="h3" mb={3}>
              Bài viết liên quan
            </Typography>
            <Grid container spacing={3}>
              {/* Replace this with the logic to fetch and display related blogs */}
              {/* {relatedBlogs.map((relatedBlog, index) => (
                <Grid item xs={6} sm={6} md={3} key={index}>
                  <Link
                    to={`/blog-detail/${relatedBlog.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card sx={{ p: 0, m: 0, borderRadius: 0 }}>
                      <CardMedia
                        sx={{ p: 0, m: 0, borderRadius: 0 }}
                        component="img"
                        image={relatedBlog.avatar.imageUrl}
                        alt={relatedBlog.title}
                      />
                      <Box mt={1} mx={2}>
                        <Typography
                          variant="button"
                          fontWeight="regular"
                          color="red"
                          textTransform="capitalize"
                        >
                          {relatedBlog.author}
                        </Typography>
                        <Box mb={1}>
                          <Typography
                            component={Link}
                            variant="h5"
                            textTransform="capitalize"
                          >
                            {relatedBlog.title}
                          </Typography>
                        </Box>
                        <Box mb={3} lineHeight={0}>
                          <Typography
                            variant="button"
                            fontWeight="light"
                            color="text"
                          >
                            {relatedBlog.shortDescription}
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  </Link>
                </Grid>
              ))} */}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  );
};

export default BlogDetails;
