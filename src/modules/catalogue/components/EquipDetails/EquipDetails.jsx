import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Link,
  Button,
} from "@mui/material";
import Slider from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchPdfProduct,
  selectEquipmentAPI,
} from "../../../../apis/equipmentAPI";
import Cookies from "js-cookie";

const EquipDetail = () => {
  const navigate = useNavigate();
  const role = Cookies.get("role")?.replace(/"/g, "");
  // READ
  const getPdfDetail = async (id, type) => {
    try {
      const url = await fetchPdfProduct(id, type);
      window.open(url, "_blank");
    } catch (error) {}
  };
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    // autoplaySpeed: 3000,
  };
  const params = useParams();
  const [product, setProduct] = useState();
  const [images, setImages] = useState([]);
  const [productDetails, setproductDetails] = useState([]);
  const [productDiaries, setProductDiaries] = useState([]);

  const idEquip = params.code;
  const getEquip = async (idEquip) => {
    try {
      const data = await selectEquipmentAPI(idEquip);
      setProduct(data);

      setImages(data.productImages);
      setproductDetails(data.productDetails);
      setProductDiaries(data.productDiaries);
      return data;
    } catch (error) {
      console.error("Error fetching equipments:", error);
    }
  };
  useEffect(() => {
    getEquip(idEquip);
  }, [idEquip]);
  if (!product) {
    return;
  }
  //download IMAGE
  const downloadQRImage = async () => {
    try {
      const response = await fetch(product.imageOfQR);
      const blob = await response.blob();

      // Lấy loại dữ liệu từ phản hồi để xác định định dạng của ảnh
      const contentType = response.headers.get("content-type");

      // Tạo một URL đến dữ liệu nhận được
      const url = window.URL.createObjectURL(
        new Blob([blob], { type: contentType })
      );

      // Tạo một thẻ <a> để tải xuống
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", product.divideCode); // Đổi định dạng ảnh thành định dạng bạn muốn tải xuống
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div>
      <Container className="mt-4">
        <div className="mb-2">
          <Link
            sx={{ fontSize: "16px" }}
            component="button"
            variant="body2"
            onClick={() => {
              navigate("/catalogue");
            }}
          >
            <ArrowBackIosIcon sx={{ fontSize: "15px" }} />
            Danh sách thiết bị
          </Link>
        </div>
        <Grid container spacing={5} style={{ overflow: "hidden" }}>
          <Grid item xs={12} lg={6}>
            <Slider {...carouselSettings}>
              {images?.map((image) => (
                <div>
                  <img
                    style={{ width: "100%", maxWidth: "100%", height: "570px" }}
                    src={image.imageOfProduct}
                    alt={image.id}
                  />
                </div>
              ))}
            </Slider>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography variant="h5" gutterBottom>
              Thông tin chung:
            </Typography>
            <List>
              <ul>
                {
                  <li className="mb-2">
                    {" "}
                    <b>Tên thiết bị: </b>
                    {product.name}
                  </li>
                }
                {
                  <li className="mb-2">
                    <b>Mã thiết bị: </b> {product.divideCode}
                  </li>
                }
                {product.constructionProject ? (
                  <li className="mb-2">
                    <b>Thi công dự án:</b> {product.constructionProject}
                  </li>
                ) : (
                  ""
                )}
                {product.location ? (
                  <li className="mb-2">
                    <b>Nằm ở kho bãi: </b>
                    {product.location}
                  </li>
                ) : (
                  ""
                )}
                {
                  <li className="mb-2">
                    <b>Lịch sử thi công: </b>
                    {product.note}
                  </li>
                }
              </ul>
            </List>
            <Typography variant="h5" gutterBottom>
              Mã QR:
            </Typography>
            <div>
              <img
                style={{ width: "250px", border: "1px solid" }}
                src={product.imageOfQR}
                alt={product.divideCode}
                id="qrImage"
              />
            </div>
            <div style={{ marginLeft: "55px", marginTop: "5px" }}>
              <Button sx={{ fontSize: "16px" }} onClick={downloadQRImage}>
                <span style={{ color: "black", marginRight: "4px" }}>
                  {" "}
                  {product.divideCode}{" "}
                </span>
                <DownloadForOfflineIcon />
              </Button>
            </div>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Typography variant="h5" gutterBottom>
              Thông số kỹ thuật:
            </Typography>
            <List>
              <ul>
                {productDetails.map((detail) => (
                  <li className="mb-2">
                    <b>{detail.name}: </b>
                    {console.log(detail)}
                    {detail.type && detail.type === "file" ? (
                      <span
                        className="link-primary"
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => getPdfDetail(detail.id, "detail")}
                      >
                        {detail.value}
                      </span>
                    ) : detail.type === "link" ? (
                      <a
                        style={
                          {
                            // textDecoration: "underline",
                            // cursor: "pointer",
                          }
                        }
                        href={detail.value}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <span>{detail.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </List>
          </Grid>

          {role && (role === "Admin" || role === "Employee") && (
            <Grid item xs={12} lg={6}>
              <Typography variant="h5" gutterBottom>
                Nhật kí bảo dưỡng:
              </Typography>
              <List>
                <ul>
                  {productDiaries?.map((diary) => (
                    <li className="mb-2">
                      <b>{diary.name}: </b>

                      <span
                        className="link-primary"
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => getPdfDetail(diary?.id, "diary")}
                      >
                        {diary?.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </List>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default EquipDetail;
