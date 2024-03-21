import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { getCategoriesAPI, selectProjectAPI } from "../../../apis/reportAPI";
import { useParams } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import QuantityRevenueItem from "./QuantityRevenueItem";

export function QuantityRevenuePerWeek({
  idQuantityRevenue,
  week,
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
  const [project, setProject] = useState();
  const [quantityAndRevenueDetails, setQuantityAndRevenueDetails] = useState(
    []
  );

  const idProject = params.code;
  const getProjects = async (idProject) => {
    try {
      const data = await selectProjectAPI(idProject);
      setProject(data);
      setQuantityAndRevenueDetails(data.quantityAndRevenueDetails);
      return data;
    } catch (error) {
      console.error("Error fetching equipments:", error);
    }
  };
  useEffect(() => {
    getProjects(idProject);
  }, [idProject]);

  const [quantityRevenueItems, setQuantityRevenueItems] = useState(
    actualQuantityAndRevenueDetails
      ? actualQuantityAndRevenueDetails
      : [newEmptyQuantityRevenueDetail()]
  );
  // const [quantityRevenueItems, setQuantityRevenueItems] = useState([]);
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
      let response = await getCategoriesAPI();
      setCategories(response);
    }
    fetchMyAPI();
  }, []);
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
  }, [quantityRevenueItems, idQuantityRevenue]);

  return (
    <div style={{ marginBottom: "50px" }}>
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
              {week}
            </span>
          </Grid>
          <Grid item lg={12}>
            <div>
              {quantityRevenueItems.map((detail) => (
                <QuantityRevenueItem
                  key={detail.id}
                  detail={detail}
                  categories={categories}
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
                  label={"Tổng cộng"}
                  size="small"
                  disabled={true}
                  value={`${totalAmount.toLocaleString()} VND`}
                  sx={{
                    marginRight: "120px",
                    width: "200px",
                  }}
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
              {week}
            </span>
          </Grid>
          <Grid item lg={12}>
            <div>
              {quantityRevenueItems.map((detail) => (
                <QuantityRevenueItem
                  key={detail.id}
                  detail={detail}
                  categories={categories}
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
                  label={"Tổng cộng"}
                  size="small"
                  disabled={true}
                  value={`${totalAmount.toLocaleString()} VND`}
                  sx={{
                    marginRight: "120px",
                    width: "200px",
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
