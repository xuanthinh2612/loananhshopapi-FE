import MDBox from "components/shared/MDBox";
import Carousel from "react-bootstrap/Carousel";
import backgroundImage from "assets/images/bg-profile.jpeg";
import { Image } from "react-bootstrap";

function CoverCarousel() {
  const ExampleCarouselImage = () => {
    <MDBox
      display="flex"
      alignItems="center"
      position="relative"
      minHeight="18.75rem"
      borderRadius="xl"
      sx={{
        backgroundImage: ({
          functions: { rgba, linearGradient },
          palette: { gradients },
        }) =>
          `${linearGradient(
            rgba(gradients.info.main, 0),
            rgba(gradients.info.state, 0)
          )}, url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "50%",
        overflow: "hidden",
      }}
    />;
  };

  return (
    <Carousel>
      <Carousel.Item style={{ height: `${500}px` }}>
        {/* <ExampleCarouselImage text="First slide" /> */}
        <Image className="d-block w-100  h-100" src={backgroundImage}></Image>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{ height: `${500}px` }}>
        {/* <ExampleCarouselImage text="First slide" /> */}
        <Image className="d-block w-100  h-100" src={backgroundImage}></Image>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{ height: `${500}px` }}>
        {/* <ExampleCarouselImage text="First slide" /> */}
        <Image className="d-block w-100 h-100" src={backgroundImage}></Image>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CoverCarousel;
