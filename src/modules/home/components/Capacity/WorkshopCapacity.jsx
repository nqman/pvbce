import React from "react";
import Slider from "react-slick";

export default function WorkshopCapacity() {
  const settings = {
    dots: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <Slider {...settings}>
      <div>
        <img
          src="./image/khoxuong1.png"
          alt=""
          style={{ height: "450px", margin: "auto" }}
        />
      </div>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: "46.77%",
            top: "35%",
            maxWidth: "420px",
            zIndex: 10,
          }}
        >
          <h6>Năng lực kho xưởng của PVB tập trung chủ yếu:</h6>
          <ul>
            <li>Sửa chữa thiết bị cho Tập đoàn mẹ PVG</li>
            <li> Gia công và cải tiến mới thiết bị thi công</li>
            <li>Cho thuê mặt bằng kho xưởng</li>
            <li>Dịch vụ trung chuyển đường bộ sang đường thủy</li>
            <li>Và các dịch vụ khác,...</li>
          </ul>
        </div>
        <img
          src="./image/khoxuong2.png"
          alt=""
          style={{ height: "450px", margin: "auto" }}
        />
      </div>
    </Slider>
  );
}
