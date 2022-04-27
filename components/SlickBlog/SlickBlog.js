import React from "react";
import s from "../../styles/SlickBlog.module.scss";
import Slider from "react-slick";
import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";

const SlickBlog = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    arrows:false,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
    <div className={s.mainSlickBlogSlider}>
      <Slider {...settings}>
        <div className={s.upperSlide1}>
          <div className={s.upper}>
            <div className={s.imageNext}>
              <Image src="/Assets/blog8.jpg" alt="" layout="fill" />
            </div>
            <div className={s.dark}></div>
            <div className={s.containt}>
              <div>
                <div className={s.head}>Informative blogs with you</div>
                <div className={s.des}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Sunt, asperiores.
                </div>
                <Link href="/writeBlog">
                  <a>
                    <div className={s.menuItem}>
                      <button>Write blog</button>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={s.upperSlide1}>
          <div className={s.upper}>
            <div className={s.imageNext}>
              <Image src="/Assets/first7.jpg" alt="" layout="fill" />
            </div>
            <div className={s.dark}></div>
            <div className={s.containt}>
              <div>
                <div className={s.head}>Blogging is good for you </div>
                <div className={s.des}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Sunt, asperiores.
                </div>
                <Link href="/writeBlog">
                  <a>
                    <div className={s.menuItem}>
                      <button>Write blog</button>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={s.upperSlide1}>
          <div className={s.upper}>
            <div className={s.imageNext}>
              <Image src="/Assets/first4.jpg" alt="" layout="fill" />
            </div>
            <div className={s.dark}></div>
            <div className={s.containt}>
              <div>
                <div className={s.head}>Buy attention with blog</div>
                <div className={s.des}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Sunt, asperiores.
                </div>
                <Link href="/writeBlog">
                  <a>
                    <div className={s.menuItem}>
                      <button>Write blog</button>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default SlickBlog;
