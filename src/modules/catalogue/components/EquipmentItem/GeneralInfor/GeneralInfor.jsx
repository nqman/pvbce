import React from "react";
import { Grid, Typography, List, ListItem, ListItemText } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import data from "../../EquipmentList/equipmentData.json";
import { useParams } from "react-router-dom";

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
  const params = useParams();

  const nameEquipment = data.find((item) => {
    return item.code === params;
  });

  console.log(nameEquipment);
  return (
    <Grid container maxWidth={"lg"} margin={"auto"} spacing={5}>
      <Typography variant="h5" gutterBottom></Typography>
      <Grid item xs={12} lg={6}>
        <Typography variant="h5" gutterBottom>
          {data.code}
        </Typography>
        <Slider {...carouselSettings}>
          <div>
            <img src="https://placekitten.com/600/400" alt="Product 1" />
          </div>
          <div>
            <img src="https://placekitten.com/600/401" alt="Product 2" />
          </div>
          <div>
            <img src="https://placekitten.com/600/402" alt="Product 3" />
          </div>
        </Slider>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography variant="h5" gutterBottom>
          Thông tin chung:
        </Typography>
        <List>
          <ul>
            <li>Dàn trượt – leader: 33m</li>
            <li>Cáp tời chính: &phi;18 - &phi;20mm/330</li>
            <li>Cáp tời phụ: &phi;18 - &phi;20mm/330</li>
            <li>Cáp tời điều khiển (cáp 1): &phi;18mm/120m</li>
            <li>Cáp cương leader: &phi;16mm/180m</li>
            <li>Dây cương: &phi;37.5 x 10 đoạn (3+6+3+3+3m)</li>
            <li>Nhiên liệu: Diesel</li>
          </ul>
        </List>
      </Grid>
    </Grid>
  );
};

export default GeneralInfor;
