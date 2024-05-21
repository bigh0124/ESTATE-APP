import { useState } from "react";
import "./slider.scss";

const Slider = ({ images }) => {
  const [firstImage, ...restImage] = images;
  const [imageIndex, setImageIndex] = useState(null);
  // console.log(imageIndex);
  const handleImageClick = (imageIndex) => {
    setImageIndex(imageIndex);
  };

  const handleArrowClick = (imageIndex) => {
    if (imageIndex < 0) {
      return setImageIndex(images.length - 1);
    }
    if (imageIndex > images.length - 1) {
      return setImageIndex(0);
    }

    setImageIndex(imageIndex);
  };

  return (
    <div className="slider">
      {imageIndex !== null && (
        <div className="fullSlider">
          <div className="arrow">
            <img src="/arrow.png" alt="" onClick={() => handleArrowClick(imageIndex - 1)} />
          </div>
          <div className="imageContainer">
            <img src={images[imageIndex]} alt="" />
          </div>
          <div className="arrow">
            <img src="/arrow.png" alt="" className="right" onClick={() => handleArrowClick(imageIndex + 1)} />
          </div>
          <div className="close">
            <span onClick={() => handleImageClick(null)}>X</span>
          </div>
        </div>
      )}
      <div className="bigImage">
        <img src={firstImage} alt="" onClick={() => handleImageClick(0)} />
      </div>
      <div className="smImages">
        {restImage.map((img, index) => (
          <img src={img} key={img} onClick={() => handleImageClick(index + 1)} />
        ))}
      </div>
    </div>
  );
};

export default Slider;
