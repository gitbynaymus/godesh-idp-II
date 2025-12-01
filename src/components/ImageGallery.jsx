import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PropTypes from "prop-types";

const ImageCarousel = ({ images }) => {
  return (
    <div className="overflow-hidden rounded bg-gray-100">
      <Carousel
        showArrows={false}
        autoPlay
        infiniteLoop
        showThumbs={true}
        showStatus={false}
        dynamicHeight={false}
        thumbWidth={35}
        showIndicators={false}
      >
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`slide-${index}`}
              className="h-30 w-full rounded object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageCarousel;
