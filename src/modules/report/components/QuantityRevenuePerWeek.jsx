import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import {
  getCategoriesAndCategoriesOfProjectAPI,
  getCategoriesOfProjectAPI,
  selectProjectAPI,
} from "../../../apis/reportAPI";
import { useParams } from "react-router-dom";
import { Grid, Paper, TextField } from "@mui/material";
import QuantityRevenueItem from "./QuantityRevenueItem";

export function QuantityRevenuePerWeek({
  idQuantityRevenue,
  week,
  fromDateToDate,
  actualQuantityAndRevenueDetails,
  // key,
  onValueChange = () => {},
}) {
  const params = useParams();
  const idProject = params.code;
  // Get category selection
  const [categories, setCategories] = useState([]);
  const [remainingCategories, setRemainingCategories] = useState([]);
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
  const [disableAddItem, setDisableAddItem] = useState(false);
  const [countItem, setCountItem] = useState(0);

  useEffect(() => {
    async function fetchMyAPI() {
      // debugger
      let categories = await getCategoriesOfProjectAPI(idProject);
      setCategories(categories);

      let remaining = [];
      categories.forEach((item2) => {
        if (
          !actualQuantityAndRevenueDetails?.some(
            (item1) => item1.category === item2.name
          )
        ) {
          remaining.push({
            name: item2.name,
            unit: item2.unit,
            price: item2.price,
          });
        }
      });
      setRemainingCategories(remaining);
      setCountItem(categories?.length - remaining.length);
      if (remaining.length === 0) {
        setDisableAddItem(true);
      }
    }
    fetchMyAPI();
  }, []);

  const [quantityRevenueItems, setQuantityRevenueItems] = useState(
    actualQuantityAndRevenueDetails ? actualQuantityAndRevenueDetails : []
  );
  const addProjectItem = () => {
    // debugger;
    const tempCount = countItem + 1;
    setCountItem(tempCount);
    if (tempCount === categories.length) {
      setDisableAddItem(true);
    }
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
    // debugger;
    const tempCount = countItem - 1;
    setCountItem(tempCount);

    if (tempCount < categories.length) {
      setDisableAddItem(false);
    }
    const filteredCategories = detail;
    if (filteredCategories.category) {
      let obj3 = [];
      categories.forEach((item2) => {
        if (filteredCategories.category === item2.name) {
          obj3.push({
            name: item2.name,
            unit: item2.unit,
            price: item2.price,
          });
        }
        // console.log(obj3);
        const newCategories = [...remainingCategories, obj3[0]];
        setRemainingCategories([...remainingCategories, obj3[0]]);
        if (newCategories.length > 0) {
          setDisableAddItem(false);
        }
      });
    }

    setQuantityRevenueItems((oldQuantityRevenueItems) => {
      return [...oldQuantityRevenueItems.filter((el) => detail.id !== el.id)];
    });
  };

  useEffect(() => {
    onValueChange(quantityRevenueItems, week, idQuantityRevenue);
    updateTotalAmount();
  }, [quantityRevenueItems, idQuantityRevenue]);

  const handleCategorySelect = (selectedCategory) => {
    // debugger;

    const temCategoryIndex = remainingCategories?.findIndex(
      (el) => el.name === selectedCategory?.name
    );
    // Nếu tìm thấy phần tử có name giống
    if (temCategoryIndex !== -1) {
      // Loại bỏ phần tử đó khỏi mảng remainingCategories
      const updatedRemainingCategories = [...remainingCategories];
      updatedRemainingCategories.splice(temCategoryIndex, 1);

      // Cập nhật lại mảng remainingCategories
      setRemainingCategories(updatedRemainingCategories);

      // Trả về selectedCategory
      return selectedCategory;
    } else if (remainingCategories.length === 1) {
      setDisableAddItem(true);
      return;
    }
  };

  return (
    <div>
      {/* EDIT */}
      {idQuantityRevenue > 0 ? (
        <Grid
          container
          style={{
            overflow: "hidden",
            display: "flex",
            alignItems: "start",
            borderRadius: "5px",
            backgroundColor: "#f5f5f5ab",
            padding: "30px",
          }}
        >
          <Grid item sm={12}>
            <div>
              {quantityRevenueItems.map((detail) => (
                <QuantityRevenueItem
                  key={detail.id}
                  detail={detail}
                  categories={categories}
                  remainingCategories={[
                    ...remainingCategories,
                    ...categories.filter((el) => el.name === detail.category),
                  ]}
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
                }}
              >
                <Button
                  style={{ fontSize: "14px" }}
                  disabled={disableAddItem}
                  onClick={addProjectItem}
                >
                  Thêm
                </Button>
                <TextField
                  label={"Tổng cộng (VND)"}
                  size="small"
                  value={`${totalAmount.toLocaleString()}`}
                  sx={{
                    marginRight: "35px",
                    width: "190px",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          style={{
            overflow: "hidden",
            display: "flex",
            alignItems: "start",
            borderRadius: "5px",
            backgroundColor: "#f5f5f5ab",
            padding: "30px",
          }}
        >
          <Grid item sm={12}>
            <div>
              {quantityRevenueItems.map((detail) => (
                <QuantityRevenueItem
                  key={detail.id}
                  detail={detail}
                  categories={categories}
                  remainingCategories={[
                    ...remainingCategories,
                    ...categories.filter((el) => el.name === detail.category),
                  ]}
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
                <Button
                  style={{ fontSize: "14px" }}
                  disabled={disableAddItem}
                  onClick={addProjectItem}
                >
                  Thêm
                </Button>
                <TextField
                  label={"Tổng cộng(VND)"}
                  size="small"
                  value={`${totalAmount.toLocaleString()}`}
                  sx={{
                    marginRight: "35px",
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
