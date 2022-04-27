import React from "react";
import s from "../../styles/TopBlogSlide.module.scss";
import Slider from "react-slick";
import SmallOne from "../SmallOne/SmallOne";
import { Row, Col } from "antd";

const TopBlogSlide = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className={s.topBlogContainer}>
      <Row justify="center">
        <Col xs={22}>
          <Slider {...settings}>
            <div>
              <SmallOne imgPath="/Assets/first1.jpeg" />
            </div>
            <div>
              <SmallOne imgPath="/Assets/first2.jpeg" />
            </div>
            <div>
              <SmallOne imgPath="/Assets/first3.jpeg" />
            </div>
            <div>
              <SmallOne imgPath="/Assets/blog4.jpg" />
            </div>
            <div>
              <SmallOne imgPath="/Assets/blog2.jpg" />
            </div>
          </Slider>
        </Col>
      </Row>
    </div>
  );
};

export default TopBlogSlide;
