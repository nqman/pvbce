import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { getCostsAPI } from "../../../apis/reportAPI";
import { useParams } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import ActualCostItem from "./ActualCostItem";

export default function ActualCostPerWeek({
  idActualCost,
  week,
  fromDateToDate,
  actualCostDetails,
  onValueChange = () => {},
}) {
  const [isLoading, setIsLoading] = useState(false);
  const newEmptyActualCostDetail = () => {
    return {
      id: -Date.now(),
      cost: "",
      amount: "",
    };
  };
  const params = useParams();
  const [disableAddItem, setDisableAddItem] = useState(false);
  const [countItem, setCountItem] = useState(0);
  const [remainingCosts, setRemainingCosts] = useState([]);

  const idProject = params.code;

  const [actualCostItems, setActualCostItems] = useState(
    actualCostDetails ? actualCostDetails : []
  );
  const addActualCostItem = () => {
    const tempCount = countItem + 1;
    setCountItem(tempCount);
    if (tempCount === costs.length) {
      setDisableAddItem(true);
    }
    setActualCostItems((oldActualCostItems) => {
      return [...oldActualCostItems, newEmptyActualCostDetail()];
    });
  };
  //Tính tổng tiền
  const [totalAmount, setTotalAmount] = useState(0);

  const updateTotalAmount = () => {
    const totalAmountNew = actualCostItems.reduce(
      (accumulator, actualCostItem) => {
        return accumulator + actualCostItem.amount * 1;
      },
      0
    );
    setTotalAmount(totalAmountNew);
  };
  // Get cost selection
  const [costs, setCosts] = useState([]);
  useEffect(() => {
    // debugger;
    async function fetchCostsAPI() {
      let costs = await getCostsAPI();
      setCosts(costs);
      let remaining = [];
      costs.forEach((item2) => {
        if (!actualCostDetails?.some((item1) => item1.cost === item2.name)) {
          remaining.push({
            name: item2.name,
          });
        }
      });
      setRemainingCosts(remaining);
      setCountItem(costs?.length - remaining.length);
      if (remaining.length === 0) {
        setDisableAddItem(true);
      }
    }
    fetchCostsAPI();
  }, []);
  const handleActualCostDetailChange = (detail) => {
    setActualCostItems((oldActualCostItems) => {
      const index = oldActualCostItems.findIndex((el) => el.id === detail.id);
      const newActualCostItems = [...oldActualCostItems]; // clone array, avoid side effect
      newActualCostItems.splice(index, 1, detail);
      return [...newActualCostItems];
    });
  };

  const handleRemoveActualCostDetail = (detail) => {
    const tempCount = countItem - 1;
    setCountItem(tempCount);

    if (tempCount < costs.length) {
      setDisableAddItem(false);
    }
    const filteredCosts = detail;
    if (filteredCosts.cost) {
      let obj3 = [];
      costs.forEach((item2) => {
        if (filteredCosts.cost === item2.name) {
          obj3.push({
            name: item2.name,
          });
        }
        const newcosts = [...remainingCosts, obj3[0]];
        setRemainingCosts([...remainingCosts, obj3[0]]);
        if (newcosts.length > 0) {
          setDisableAddItem(false);
        }
      });
    }
    setActualCostItems((oldActualCostItems) => {
      return [...oldActualCostItems.filter((el) => detail.id !== el.id)];
    });
  };
  const handleCostSelect = (selectedCost) => {
    const temCostIndex = remainingCosts.findIndex(
      (el) => el.name === selectedCost.name
    );
    if (temCostIndex !== -1) {
      const updatedremainingCosts = [...remainingCosts];
      updatedremainingCosts.splice(temCostIndex, 1);
      setRemainingCosts(updatedremainingCosts);
      return selectedCost;
    } else if (remainingCosts.length === 1) {
      setDisableAddItem(true);
      return;
    }
  };

  useEffect(() => {
    onValueChange(actualCostItems, week, idActualCost);
    updateTotalAmount();
  }, [actualCostItems, idActualCost]);

  return (
    <div style={{ marginBottom: "50px" }}>
      {idActualCost > 0 ? (
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
              {actualCostItems.map((detail) => (
                <ActualCostItem
                  key={detail.id}
                  detail={detail}
                  costs={costs}
                  remainingCosts={[
                    ...remainingCosts,
                    ...costs.filter((el) => el.name === detail.cost),
                  ]}
                  onCostSelect={handleCostSelect}
                  onChange={handleActualCostDetailChange}
                  onRemove={handleRemoveActualCostDetail}
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
                <Button disabled={disableAddItem} onClick={addActualCostItem}>
                  Thêm
                </Button>
                <TextField
                  label={"Tổng cộng"}
                  size="small"
                  value={`${totalAmount.toLocaleString()} VND`}
                  sx={{
                    marginRight: "160px",
                    width: "200px",
                    pointerEvents: "none",
                  }}
                  disabled={true}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      ) : (
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
              {actualCostItems.map((detail) => (
                <ActualCostItem
                  key={detail.id}
                  detail={detail}
                  costs={costs}
                  remainingCosts={[
                    ...remainingCosts,
                    ...costs.filter((el) => el.name === detail.cost),
                  ]}
                  onCostSelect={handleCostSelect}
                  onChange={handleActualCostDetailChange}
                  onRemove={handleRemoveActualCostDetail}
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
                <Button disabled={disableAddItem} onClick={addActualCostItem}>
                  Thêm
                </Button>
                <TextField
                  label={"Tổng cộng"}
                  size="small"
                  value={`${totalAmount.toLocaleString()} VND`}
                  sx={{
                    marginRight: "160px",
                    width: "200px",
                    pointerEvents: "none",
                  }}
                  disabled={true}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
