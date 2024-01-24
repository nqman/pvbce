import React, { useEffect, useState } from "react";
import { Grid, Typography, List, ListItem, ListItemText } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import { selectEquipmentAPI } from "../../../../../apis/equipmentAPI";

const GeneralInfor = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    // speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 3000,
  };
  const [product, setProduct] = useState();

  const params = useParams();
  const idEquip = params.code;
  console.log(idEquip);
  const getEquip = async (idEquip) => {
    try {
      const data = await selectEquipmentAPI(idEquip);
      setProduct(data);
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching equipments:", error);
    }
  };
  useEffect(() => {
    getEquip(idEquip);
  }, [idEquip]);
  // console.log(product);
  if (!product) {
    return;
  }
  return (
    <div>
      <Grid container maxWidth={"lg"} margin={"auto"} spacing={5}>
        <Typography variant="h5" gutterBottom></Typography>
        <Grid item xs={12} lg={6}>
          <Typography variant="h5" gutterBottom></Typography>
          <Slider {...carouselSettings}>
            {product?.productImages.map((image) => {
              <div>
                <img src={image.pathImage} alt={image.pathImage} />
              </div>;
            })}
          </Slider>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h5" gutterBottom>
            Thông tin chung:
          </Typography>
          <List>
            <ul>
              {<li className="mb-2">Tên thiết bị: {product.name}</li>}
              {<li className="mb-2">Mã thiết bị: {product.divideCode}</li>}
              {
                <li className="mb-2">
                  Thi công dự án: {product.constructionProject}
                </li>
              }
              {<li className="mb-2">Nằm ở kho bãi: {product.location}</li>}
              {<li className="mb-2">Ghi chú: {product.note}</li>}
            </ul>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default GeneralInfor;
