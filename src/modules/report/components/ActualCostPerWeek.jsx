import Button from "react-bootstrap/Button";
import ProjectItem from "./ProjectItem";
import { useEffect, useState } from "react";
import { getCategoriesAPI, selectProjectAPI } from "../../../apis/reportAPI";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Grid, TextField } from "@mui/material";
import ActualCostItem from "./ActualCostItem";

export function ActualCostPerWeek() {
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

      // date: "",
    };
  };
  const params = useParams();
  const [project, setProject] = useState();
  const [rpQuantityAndRevenueDetails, setRpQuantityAndRevenueDetails] =
    useState([]);
  const [rpQuantityAndRevenueLibraries, setRpQuantityAndRevenueLibraries] =
    useState([]);

  const idProject = params.code;
  const getProjects = async (idProject) => {
    try {
      const data = await selectProjectAPI(idProject);
      setProject(data);
      setRpQuantityAndRevenueDetails(data.rpQuantityAndRevenueDetails);
      setRpQuantityAndRevenueLibraries(data.rpQuantityAndRevenueLibraries);
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
  return (
    <div>
      <Grid
        container
        spacing={5}
        style={{ overflow: "hidden", display: "flex", alignItems: "start" }}
      >
        <Grid item lg={2} sx={{ marginTop: "5px" }}>
          <span
            style={{
              fontWeight: "bold",
              border: "1px solid black",
              borderRadius: "2px",
              padding: "10px 20px",
            }}
          >
            12-02-2024
          </span>
        </Grid>
        <Grid item lg={10}>
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
              }}
            >
              <Button
                style={{ marginTop: "-10px", marginBottom: "20px" }}
                onClick={addProjectItem}
              >
                Thêm
              </Button>
              <TextField
                label={"Tổng cộng"}
                size="small"
                disabled={true}
                value={`${totalAmount.toLocaleString()} VND`}
                sx={{
                  marginRight: "90px",
                  width: "320px",
                }}
              />
            </div>
          </div>
        </Grid>
      </Grid>
      <Button className="btn btn-warning">Thêm tuần</Button>
    </div>
  );
}
