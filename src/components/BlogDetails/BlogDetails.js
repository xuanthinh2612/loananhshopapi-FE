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
          <>
            {/* <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card p={0} m={0}>
                  <CardMedia
                    sx={{ p: 0, m: 0 }}
                    component="img"
                    image={blog.avatar.imageUrl}
                    alt={blog.title}
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  height="100%"
                >
                  <Typography variant="h2">{blog.title}</Typography>
                  <Typography variant="h4" color={"primary"}>
                    {blog.author}
                  </Typography>
                  <Typography variant="subtitle1">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1">
                    {blog.shortDescription}
                  </Typography>
                </Box>
              </Grid>
            </Grid> */}
            <Grid container spacing={4} mt={5}>
              {/* <Grid> */}
              {/* <Typography variant="h3">Chi tiết bài viết</Typography>
                <Divider /> */}
              <Grid item xs={12} md={8}>
                <Card>
                  {blog.subContentList.map((subContent, index) => (
                    <Grid
                      key={index}
                      p={2}
                      mb={0}
                      container
                      justifyContent="center"
                    >
                      {/* {subContent.image.imageUrl ? ( */}
                      <>
                        <Grid item xs={12} md={10}>
                          {subContent.image && subContent.image.imageUrl && (
                            <Card>
                              <CardMedia
                                sx={{ p: 0, m: 0 }}
                                component="img"
                                image={subContent.image.imageUrl}
                                alt={blog.title}
                              />
                            </Card>
                          )}

                          {subContent.title && (
                            <CardContent sx={{ textAlign: "center", pt: 1 }}>
                              <Typography variant="caption">
                                {subContent.title}
                              </Typography>
                            </CardContent>
                          )}
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <Box display="flex" alignItems="center" height="100%">
                            <CardContent>
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
                      {/* //   ) : (
                    //     <Grid item xs={12}>
                    //       <Box display="flex" alignItems="center" height="100%">
                    //         <CardContent>
                    //           <Typography
                    //             variant="body1"
                    //             sx={{ textAlign: "justify" }}
                    //           >
                    //             {subContent.content1}
                    //           </Typography>
                    //           <Typography
                    //             variant="body1"
                    //             sx={{ textAlign: "justify" }}
                    //           >
                    //             {subContent.content2}
                    //           </Typography>
                    //           <Typography
                    //             variant="body1"
                    //             sx={{ textAlign: "justify" }}
                    //           >
                    //             {subContent.content3}
                    //           </Typography>
                    //         </CardContent>
                    //       </Box>
                    //     </Grid>
                    //   )} */}
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
                {/* </Grid> */}
              </Grid>
            </Grid>
          </>
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

// import * as React from "react";
// import CssBaseline from "@mui/material/CssBaseline";
// import Grid from "@mui/material/Grid";
// import Container from "@mui/material/Container";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import XIcon from "@mui/icons-material/X";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Header from "./Header";
// import MainFeaturedPost from "./MainFeaturedPost";
// import FeaturedPost from "./FeaturedPost";
// import Main from "./Main";
// import Sidebar from "./Sidebar";
// import Footer from "./Footer";
// import post1 from "./blog-post.1.md";
// import post2 from "./blog-post.2.md";
// import post3 from "./blog-post.3.md";

// const sections = [
//   { title: "Technology", url: "#" },
//   { title: "Design", url: "#" },
//   { title: "Culture", url: "#" },
//   { title: "Business", url: "#" },
//   { title: "Politics", url: "#" },
//   { title: "Opinion", url: "#" },
//   { title: "Science", url: "#" },
//   { title: "Health", url: "#" },
//   { title: "Style", url: "#" },
//   { title: "Travel", url: "#" },
// ];

// const mainFeaturedPost = {
//   title: "Title of a longer featured blog post",
//   description:
//     "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
//   image: "https://source.unsplash.com/random?wallpapers",
//   imageText: "main image description",
//   linkText: "Continue reading…",
// };

// const featuredPosts = [
//   {
//     title: "Featured post",
//     date: "Nov 12",
//     description:
//       "This is a wider card with supporting text below as a natural lead-in to additional content.",
//     image: "https://source.unsplash.com/random?wallpapers",
//     imageLabel: "Image Text",
//   },
//   {
//     title: "Post title",
//     date: "Nov 11",
//     description:
//       "This is a wider card with supporting text below as a natural lead-in to additional content.",
//     image: "https://source.unsplash.com/random?wallpapers",
//     imageLabel: "Image Text",
//   },
// ];

// const posts = [post1, post2, post3];

// const sidebar = {
//   title: "About",
//   description:
//     "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
//   archives: [
//     { title: "March 2020", url: "#" },
//     { title: "February 2020", url: "#" },
//     { title: "January 2020", url: "#" },
//     { title: "November 1999", url: "#" },
//     { title: "October 1999", url: "#" },
//     { title: "September 1999", url: "#" },
//     { title: "August 1999", url: "#" },
//     { title: "July 1999", url: "#" },
//     { title: "June 1999", url: "#" },
//     { title: "May 1999", url: "#" },
//     { title: "April 1999", url: "#" },
//   ],
//   social: [
//     { name: "GitHub", icon: GitHubIcon },
//     { name: "X", icon: XIcon },
//     { name: "Facebook", icon: FacebookIcon },
//   ],
// };

// // TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

// export default function BlogDetails() {
//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <CssBaseline />
//       <Container maxWidth="lg">
//         <Header title="Blog" sections={sections} />
//         <main>
//           <MainFeaturedPost post={mainFeaturedPost} />
//           <Grid container spacing={4}>
//             {featuredPosts.map((post) => (
//               <FeaturedPost key={post.title} post={post} />
//             ))}
//           </Grid>
//           <Grid container spacing={5} sx={{ mt: 3 }}>
//             <Main title="From the firehose" posts={posts} />
//             <Sidebar
//               title={sidebar.title}
//               description={sidebar.description}
//               archives={sidebar.archives}
//               social={sidebar.social}
//             />
//           </Grid>
//         </main>
//       </Container>
//       <Footer
//         title="Footer"
//         description="Something here to give the footer a purpose!"
//       />
//     </ThemeProvider>
//   );
// }
