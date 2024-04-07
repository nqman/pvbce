import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import {
  getCategoriesAndCategoriesOfProjectAPI,
  getCategoriesOfProjectAPI,
  selectProjectAPI,
} from "../../../apis/reportAPI";
import { useParams } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import QuantityRevenueItem from "./QuantityRevenueItem";

export function QuantityRevenuePerWeek({
  idQuantityRevenue,
  week,
  fromDateToDate,
  actualQuantityAndRevenueDetails,
  onValueChange = () => {},
}) {
  const [isLoading, setIsLoading] = useState(false);
  const newEmptyQuantityRevenueDetail = () => {
    return {
      id: -Date.now(),
      category: "",
      unit: "",
      quantity: "",
      price: "",
      amount: "",
    };
  };
  const params = useParams();
  const idProject = params.code;
  const [quantityRevenueItems, setQuantityRevenueItems] = useState(
    actualQuantityAndRevenueDetails
      ? actualQuantityAndRevenueDetails
      : [newEmptyQuantityRevenueDetail()]
  );
  const addProjectItem = () => {
    setQuantityRevenueItems((oldQuantityRevenueItems) => {
      return [...oldQuantityRevenueItems, newEmptyQuantityRevenueDetail()];
    });
  };
  //Tính tổng tiền
  const [totalAmount, setTotalAmount] = useState(0);

  const updateTotalAmount = () => {
    const totalAmountNew = quantityRevenueItems.reduce(
      (accumulator, projectItem) => {
        return accumulator + projectItem.quantity * projectItem.price;
      },
      0
    );
    setTotalAmount(totalAmountNew);
  };
  // Get category selection
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await getCategoriesOfProjectAPI(idProject);
      setCategories(response);
      console.log(response);
    }
    fetchMyAPI();
  }, [idProject]);
  const handleQuantityRevenueDetailChange = (detail) => {
    setQuantityRevenueItems((oldQuantityRevenueItems) => {
      const index = oldQuantityRevenueItems.findIndex(
        (el) => el.id === detail.id
      );
      const newQuantityRevenueItems = [...oldQuantityRevenueItems]; // clone array, avoid side effect
      newQuantityRevenueItems.splice(index, 1, detail);
      return [...newQuantityRevenueItems];
    });
  };

  const handleRemoveQuantityRevenueDetail = (detail) => {
    setQuantityRevenueItems((oldQuantityRevenueItems) => {
      return [...oldQuantityRevenueItems.filter((el) => detail.id !== el.id)];
    });
  };

  useEffect(() => {
    onValueChange(quantityRevenueItems, week, idQuantityRevenue);
    updateTotalAmount();
  }, [quantityRevenueItems, idQuantityRevenue]);

  const [exitedCategory, setExitedCategory] = useState([]);
  // const [validateCategory, setValidateCategory] = useState([]);
  useEffect(() => {
    const exitedCategory = actualQuantityAndRevenueDetails?.map(
      (item) => item.category
    );
    setExitedCategory(exitedCategory);
  }, []);
  // if (exitedCategory !== null) {
  //   for (let i = 0; i < exitedCategory.length; i++) {
  //     if (!validateCategory.includes(exitedCategory[i])) {
  //       // validateCategory
  //     }
  //   }
  // }
  console.log(exitedCategory);
  // console.log(actualQuantityAndRevenueDetails);
  const handleCategorySelect = (selectedCategory) => {
    debugger;
    const tem = exitedCategory.find((el) => el === selectedCategory.name);
    if (!tem) {
      // Xử lý giá trị selectedCategory ở đây
      // console.log(tem);
      setExitedCategory([...exitedCategory, selectedCategory.name]);
      return selectedCategory.name;
    }
    // console.log("bị trùng");
    return "";
  };
  //check trùng hạng mục

  return (
    <div style={{ marginBottom: "50px" }}>
      {/* EDIT */}
      {idQuantityRevenue > 0 ? (
        <Grid
          container
          spacing={5}
          style={{
            overflow: "hidden",
            display: "flex",
            alignItems: "start",
            border: "1px solid",
            borderRadius: "5px",
            padding: "10px 0",
          }}
        >
          <Grid item lg={12} sx={{ margin: "-20px 0 -10px 0" }}>
            <span
              style={{
                padding: "5px 10px",
                border: "1px solid",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                backgroundColor: "rgb(242, 228, 38)",
                fontWeight: "bold",
                color: "black",
                borderRadius: "5px",
              }}
            >
              {fromDateToDate}
            </span>
          </Grid>
          <Grid item lg={12}>
            <div>
              {quantityRevenueItems.map((detail) => (
                <QuantityRevenueItem
                  key={detail.id}
                  detail={detail}
                  categories={categories}
                  exitedCategory={exitedCategory}
                  onCategorySelect={handleCategorySelect}
                  onChange={handleQuantityRevenueDetailChange}
                  onRemove={handleRemoveQuantityRevenueDetail}
                  updateTotalAmount={updateTotalAmount}
                />
              ))}
              {/* <p className="text-danger">{errorDetail}</p> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: "10px",
                }}
              >
                <Button style={{}} onClick={addProjectItem}>
                  Thêm
                </Button>
                <TextField
                  label={"Tổng cộng (VND)"}
                  size="small"
                  value={`${totalAmount.toLocaleString()}`}
                  sx={{
                    marginRight: "80px",
                    width: "190px",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      ) : (
        // NEW
        <Grid
          container
          spacing={5}
          style={{
            overflow: "hidden",
            display: "flex",
            alignItems: "start",
            border: "1px solid",
            borderRadius: "5px",
            padding: "10px 0",
          }}
        >
          <Grid item lg={12} sx={{ margin: "-20px 0 -10px 0" }}>
            <span
              style={{
                padding: "5px 10px",
                border: "1px solid",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                backgroundColor: "rgb(242, 228, 38)",
                fontWeight: "bold",
                color: "black",
                borderRadius: "5px",
              }}
            >
              {fromDateToDate}
            </span>
          </Grid>
          <Grid item lg={12}>
            <div>
              {quantityRevenueItems.map((detail) => (
                <QuantityRevenueItem
                  key={detail.id}
                  detail={detail}
                  categories={categories}
                  exitedCategory={exitedCategory}
                  onCategorySelect={handleCategorySelect}
                  onChange={handleQuantityRevenueDetailChange}
                  onRemove={handleRemoveQuantityRevenueDetail}
                  updateTotalAmount={updateTotalAmount}
                />
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: "10px",
                }}
              >
                <Button style={{}} onClick={addProjectItem}>
                  Thêm
                </Button>
                <TextField
                  label={"Tổng cộng(VND)"}
                  size="small"
                  value={`${totalAmount.toLocaleString()}`}
                  sx={{
                    marginRight: "80px",
                    width: "190px",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
