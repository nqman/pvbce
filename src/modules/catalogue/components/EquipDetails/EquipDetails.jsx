import React, { useEffect, useState } from "react";
import { Grid, Typography, List, ListItem, ListItemText } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import { selectEquipmentAPI } from "../../../../apis/equipmentAPI";
import cn from "classnames";
const EquipDetail = () => {
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

  const idEquip = params.code;
  console.log(idEquip);
  const getEquip = async (idEquip) => {
    try {
      const data = await selectEquipmentAPI(idEquip);
      setProduct(data);
      console.log(data);
      setImages(data.productImages);
      setproductDetails(data.productDetails);
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
  console.log("images", images);
  console.log("productDetails", productDetails);
  return (
    <div>
      <Grid container maxWidth={"lg"} margin={"auto"} spacing={5}>
        <Grid item xs={12} lg={6}>
          <Slider {...carouselSettings}>
            {images?.map((image) => (
              <div>
                <img
                  style={{ width: "100%", height: "570px" }}
                  src={image.pathImage}
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
              src={product.pathOfQR}
              alt=""
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
                  {detail.value}
                </li>
              ))}
            </ul>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default EquipDetail;
