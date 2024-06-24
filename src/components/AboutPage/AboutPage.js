import React from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import DefaultLayout from "layouts/defaultLayout";
import productImage from "assets/images/bg-profile.jpeg"; // Example image path

function AboutPage() {
  return (
    <DefaultLayout>
      <Container>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                alt="Product Image"
                height="450"
                image={productImage}
                title="Product Image"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  Sản phẩm Nhật Bản chính hãng
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cam kết chất lượng của chúng tôi đảm bảo rằng mọi sản phẩm
                  chúng tôi cung cấp đều là hàng chính hãng 100% và được nhập
                  trực tiếp từ Nhật Bản.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" gutterBottom>
              Chào mừng đến với Loan Anh Shop!
            </Typography>
            <Typography variant="body1" paragraph>
              Tại Loan Anh Shop, chúng tôi chuyên cung cấp các sản phẩm Nhật Bản
              chính hãng, chất lượng cao cho khách hàng. Cho dù bạn đang tìm
              kiếm lựa chọn bán buôn hay bán lẻ, cửa hàng của chúng tôi cung cấp
              một loạt các sản phẩm Nhật Bản chính hãng, đảm bảo bạn nhận được
              giá trị tốt nhất cho số tiền của mình.
            </Typography>
            <Typography variant="body1" paragraph>
              Chúng tôi hiểu tầm quan trọng của chất lượng và tính xác thực, đó
              là lý do tại sao chúng tôi lựa chọn cẩn thận các sản phẩm của mình
              để chỉ bao gồm những mặt hàng tốt nhất trực tiếp từ Nhật Bản. Từ
              hàng gia dụng đến sản phẩm làm đẹp, kho hàng của chúng tôi được
              thiết kế để đáp ứng tất cả các nhu cầu của bạn.
            </Typography>
            <Typography variant="body1" paragraph>
              Sứ mệnh của chúng tôi là mang những điều tốt đẹp nhất từ Nhật Bản
              đến với bạn, cung cấp trải nghiệm mua sắm liền mạch với dịch vụ
              khách hàng xuất sắc. Tin tưởng Loan Anh Shop cho tất cả nhu cầu về
              sản phẩm Nhật Bản của bạn và khám phá sự khác biệt khi mua sắm với
              một cửa hàng tận tâm, lấy khách hàng làm trung tâm.
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="h4" gutterBottom>
            Tại sao chọn chúng tôi?
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Đảm bảo tính xác thực
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Chúng tôi đảm bảo 100% sản phẩm của chúng tôi là hàng chính
                    hãng, được nhập trực tiếp từ các nhà cung cấp uy tín tại
                    Nhật Bản.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Giá cả cạnh tranh
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Giá cả cạnh tranh của chúng tôi giúp bạn dễ dàng tiếp cận
                    các sản phẩm Nhật Bản chất lượng cao với giá trị tuyệt vời.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Tập trung vào khách hàng
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Chúng tôi cam kết cung cấp dịch vụ khách hàng xuất sắc, đảm
                    bảo sự hài lòng của bạn với mọi đơn hàng.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </DefaultLayout>
  );
}

export default AboutPage;
