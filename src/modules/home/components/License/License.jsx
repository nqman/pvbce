import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";

import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const steps = [
  {
    imagePath: "./image/giayphep1.png",
  },
  {
    imagePath: "./image/giayphep2.png",
  },
  {
    imagePath: "./image/giayphep3.png",
  },
];

export default function License() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <h1
        className="text-center "
        style={{ fontSize: "30px ", fontWeight: "bold", marginBottom: "30px" }}
      >
        GIẤY PHÉP ĐĂNG KÝ KINH DOANH
      </h1>
      <Box sx={{ maxWidth: "100%" }}>
        <Box width={"100%"} display={"flex"} justifyContent={"center"}>
          <img
            src={steps[activeStep].imagePath}
            alt=""
            style={{ height: "450px" }}
          />
        </Box>

        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          style={{ maxWidth: "50%", margin: "auto" }}
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              {/* Next */}
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              {/* Back */}
            </Button>
          }
        />
      </Box>
    </div>
  );
}
