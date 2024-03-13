import Button from "react-bootstrap/Button";
import ProjectItem from "./ProjectItem";
import { useEffect, useState } from "react";
import {
  addActualQuantityAndRevenueAPI,
  getCategoriesAPI,
  selectProjectAPI,
} from "../../../apis/reportAPI";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Grid, TextField } from "@mui/material";
import ActualCostItem from "./ActualCostItem";

export function ActualCostPerWeek(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const newEmptyProjectDetail = () => {
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
  const [rpQuantityAndRevenueDetails, setRpQuantityAndRevenueDetails] =
    useState([]);

  const idProject = params.code;
  const getProjects = async (idProject) => {
    try {
      const data = await selectProjectAPI(idProject);
      setProject(data);
      setRpQuantityAndRevenueDetails(data.rpQuantityAndRevenueDetails);
      return data;
    } catch (error) {
      console.error("Error fetching equipments:", error);
    }
  };
  useEffect(() => {
    getProjects(idProject);
  }, [idProject]);

  const [projectItems, setProjectItems] = useState([newEmptyProjectDetail()]);
  const addProjectItem = () => {
    setProjectItems((oldProjectItems) => {
      return [...oldProjectItems, newEmptyProjectDetail()];
    });
  };
  //Tính tổng tiền
  const [totalAmount, setTotalAmount] = useState(0);

  const updateTotalAmount = () => {
    const totalAmountNew = projectItems.reduce((accumulator, projectItem) => {
      return accumulator + projectItem.quantity * projectItem.price;
    }, 0);
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
  const handleProjectDetailChange = (detail) => {
    setProjectItems((oldProjectItems) => {
      const index = oldProjectItems.findIndex((el) => el.id === detail.id);
      const newProjectItems = [...oldProjectItems]; // clone array, avoid side effect
      newProjectItems.splice(index, 1, detail);
      return [...newProjectItems];
    });
  };

  const handleRemoveProjectDetail = (detail) => {
    setProjectItems((oldProjectItems) => {
      return [...oldProjectItems.filter((el) => detail.id !== el.id)];
    });
  };
  // console.log(projectItems);
  // const [childValue, setChildValue] = useState("");

  // const handleChange = (event) => {
  //   const value = event.target.value;
  //   setChildValue(value);
  //   // Gọi hàm callback để truyền giá trị lên component cha
  //   props.onValueChange(value);
  // };

  // useEffect(() => {
  //   // setChildValue(projectItems);
  //   // Gọi hàm callback để truyền giá trị lên component cha
  //   props.onValueChange(projectItems, props.currentWeek);
  // }, [projectItems]);
  const saveProjectItem = () => {
    props.onValueChange(projectItems, props.currentWeek);
  };

  return (
    <div style={{ marginBottom: "50px" }}>
      {/* OLD */}
      {props.oldCostPerWeek ? (
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
              {props.oldWeek}
            </span>
          </Grid>
          <Grid item lg={12}>
            <div>
              {props.actualQuantityAndRevenueDetails.map((detail) => (
                <ActualCostItem
                  key={detail.id}
                  oldDetail={detail}
                  categories={categories}
                  oldCategory={detail.category}
                  onChange={handleProjectDetailChange}
                  onRemove={handleRemoveProjectDetail}
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
        ""
      )}

      {/* NEW */}
      {props.currentWeek ? (
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
              {props.currentWeek}
            </span>
          </Grid>
          <Grid item lg={12}>
            <div>
              {projectItems.map((detail) => (
                <ActualCostItem
                  key={detail.id}
                  detail={detail}
                  categories={categories}
                  onChange={handleProjectDetailChange}
                  onRemove={handleRemoveProjectDetail}
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
                <Button style={{}} onClick={saveProjectItem}>
                  Lưu tuần
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
        ""
      )}
    </div>
  );
}
