import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import {
  fetchPdfProduct,
  selectEquipmentAPI,
} from "../../../../apis/equipmentAPI";
const EquipDetail = () => {
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
    // speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
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

  return (
    <div>
      <Container className="mt-4">
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
                    <b>Ghi chú: </b>
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
                style={{ width: "200px", border: "1px solid" }}
                src={product.imageOfQR}
                alt={product.divideCode}
              />
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
                    {detail.pathFile ? (
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
                    ) : (
                      <span>{detail.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </List>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography variant="h5" gutterBottom>
              Nhật kí bảo dưỡng
            </Typography>
            <List>
              <ul>
                {productDiaries?.map((diary) => (
                  <li className="mb-2">
                    <b>{diary.name}: </b>
                    <span
                      className="link-primary"
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                      onClick={() => getPdfDetail(diary?.id, "diary")}
                    >
                      {diary?.value}
                    </span>
                  </li>
                ))}
              </ul>
            </List>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default EquipDetail;
