import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { getCostsAPI, selectProjectAPI } from "../../../apis/reportAPI";
import { useParams } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import ActualCostItem from "./ActualCostItem";

export default function ActualCostPerWeek({
  idActualCost,
  week,
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
  // const [project, setProject] = useState();
  // console.log(actualCostDetails);

  const idProject = params.code;
  // const getProjects = async (idProject) => {
  //   try {
  //     const data = await selectProjectAPI(idProject);
  //     setProject(data);
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching equipments:", error);
  //   }
  // };
  // useEffect(() => {
  //   getProjects(idProject);
  // }, [idProject]);

  const [actualCostItems, setActualCostItems] = useState(
    actualCostDetails ? actualCostDetails : [newEmptyActualCostDetail()]
  );
  const addActualCostItem = () => {
    setActualCostItems((oldActualCostItems) => {
      return [...oldActualCostItems, newEmptyActualCostDetail()];
    });
  };
  //Tính tổng tiền
  const [totalAmount, setTotalAmount] = useState(0);

  const updateTotalAmount = () => {
    debugger;
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
    async function fetchCostsAPI() {
      let response = await getCostsAPI(idProject);
      setCosts(response);
    }
    fetchCostsAPI();
  }, [idProject]);
  const handleActualCostDetailChange = (detail) => {
    setActualCostItems((oldActualCostItems) => {
      const index = oldActualCostItems.findIndex((el) => el.id === detail.id);
      const newActualCostItems = [...oldActualCostItems]; // clone array, avoid side effect
      newActualCostItems.splice(index, 1, detail);
      return [...newActualCostItems];
    });
  };

  const handleRemoveActualCostDetail = (detail) => {
    setActualCostItems((oldActualCostItems) => {
      return [...oldActualCostItems.filter((el) => detail.id !== el.id)];
    });
  };

  useEffect(() => {
    onValueChange(actualCostItems, week, idActualCost);
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
              {week}
            </span>
          </Grid>
          <Grid item lg={12}>
            <div>
              {actualCostItems.map((detail) => (
                <ActualCostItem
                  key={detail.id}
                  detail={detail}
                  costs={costs}
                  onChange={handleActualCostDetailChange}
                  onRemove={handleRemoveActualCostDetail}
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
                <Button style={{}} onClick={addActualCostItem}>
                  Thêm
                </Button>
                <TextField
                  label={"Tổng cộng"}
                  size="small"
                  value={`${totalAmount.toLocaleString()} VND`}
                  sx={{
                    marginRight: "120px",
                    width: "200px",
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
              {actualCostItems.map((detail) => (
                <ActualCostItem
                  key={detail.id}
                  detail={detail}
                  costs={costs}
                  onChange={handleActualCostDetailChange}
                  onRemove={handleRemoveActualCostDetail}
                  updateTotalAmount={updateTotalAmount}
                />
              ))}
              {/* <p className="text-danger">{errorDetail}</p> */}
              <div
                style={{
                  display: "flex",
                  // justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: "10px",
                }}
              >
                <Button style={{}} onClick={addActualCostItem}>
                  Thêm
                </Button>
                <TextField
                  label={"Tổng cộng"}
                  size="small"
                  // disabled={true}
                  value={`${totalAmount.toLocaleString()} VND`}
                  sx={{
                    marginLeft: "300px",
                    width: "200px",
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
