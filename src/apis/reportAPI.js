import baseAPI from "./baseAPI";

//Lấy danh sách hạng mục
export async function getCategoriesAPI(type) {
  // debugger;
  try {
    const resp = await baseAPI.get(`categories/list_categories/${type}`);
    // const resp = await baseAPI.get("categories");
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// lấy danh sách hạng mục theo từng dự án
export async function getCategoriesOfProjectAPI(idProject) {
  // debugger;
  try {
    const resp = await baseAPI.get(`categories/project/${idProject}`);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// lấy danh sách hạng mục tổng + hạng mục theo từng dự án
export async function getCategoriesAndCategoriesOfProjectAPI(idProject) {
  // debugger;
  try {
    const resp = await baseAPI.get(`projects/categories/${idProject}`);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function selectCategoryAPI(id) {
  try {
    const resp = await baseAPI.get(`categories/${id}`);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//lấy danh mục 1 và danh mục 2
export async function getCategoriesOneAndTwoAPI(type) {
  try {
    const resp = await baseAPI.get(`categories/list_categories/${type}`);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function saveCategoryAPI(category) {
  // debugger;
  try {
    const formData = new FormData();
    // NEW
    if (category.id === null) {
      formData.append("id", 0);
      formData.append("name", category.name);
      formData.append("type", category.type);
      if (category.unit) {
        formData.append("unit", category.unit);
      }
    }
    // EDIT
    else {
      formData.append("id", category.id);
      formData.append("name", category.name);
      formData.append("type", category.type);
      if (category.unit) {
        formData.append("unit", category.unit);
      }
    }
    // console.log(formData);
    const resp = await baseAPI.post("categories/save", formData);
  } catch (error) {}
}

//save hạng mục 2
export async function saveCategoryTwoAPI(category, idSelectedCategoryOne) {
  // debugger;
  try {
    const formData = new FormData();
    // NEW
    if (category.id === null) {
      formData.append("id", 0);
      formData.append("name", category.name);
      formData.append("type", category.type);
      if (category.unit) {
        formData.append("unit", category.unit);
      }
    }
    // EDIT
    else {
      formData.append("id", category.id);
      formData.append("name", category.name);
      formData.append("type", category.type);
      if (category.unit) {
        formData.append("unit", category.unit);
      }
    }
    // console.log(formData);
    const resp = await baseAPI.post(
      `categories/save/${idSelectedCategoryOne}`,
      formData
    );
  } catch (error) {}
}

export async function deleteCategoryAPI(id) {
  try {
    const resp = await baseAPI.get(`categories/delete/${id}`);
    return resp.data;
  } catch (error) {
    throw error.response.data;
  }
}
//validate categoryName
export async function validateCategoryAPI(categoryName, type) {
  try {
    const resp = await baseAPI.get(
      `categories/validate/category/${categoryName}/${type}`
    );
    return resp.data;
  } catch (error) {
    throw error.response.data;
  }
}

//Lấy danh sách CHI PHÍ
export async function getCostsAPI() {
  try {
    const resp = await baseAPI.get("costs");
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function saveCostAPI(cost) {
  try {
    const formData = new FormData();
    if (cost.id === null) {
      formData.append("id", 0);
      formData.append("name", cost.name);
    } else {
      formData.append("id", cost.id);
      formData.append("name", cost.name);
    }
    const resp = await baseAPI.post("costs/save", formData);
  } catch (error) {}
}

export async function deleteCostAPI(id) {
  try {
    const resp = await baseAPI.get(`costs/delete/${id}`);
    return resp.data;
  } catch (error) {
    throw error.response.data;
  }
}
export async function selectCostAPI(id) {
  try {
    const resp = await baseAPI.get(`costs/${id}`);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
//validate categoryName
export async function validateCostAPI(costName) {
  try {
    const resp = await baseAPI.get(`costs/validate/cost/${costName}`);
    return resp.data;
  } catch (error) {
    throw error.response.data;
  }
}

// PROJECTS
//Lấy danh sách các thiết bị
export async function listProjectsAPI() {
  try {
    const resp = await baseAPI.get("projects");
    const data = resp?.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
// Lưu dự án
export async function saveProjectAPI(project) {
  debugger;
  try {
    const formData = new FormData();
    Object.keys(project).map((key) => {
      // thông tin hợp đồng
      if (key === "rpQuantityAndRevenueDetails") {
        if (Array.isArray(project[key])) {
          project[key].forEach((detail) => {
            //EDIT
            if (detail.id > 0) {
              formData.append("idDetails", detail.id);
            }
            //NEW
            else {
              formData.append("idDetails", 0);
            }
            formData.append("categories", detail.category);
            formData.append("units", detail.unit);
            formData.append("quantities", detail.quantity);
            formData.append("prices", detail.price);
          });
        }
      }
      // thư viện dự án
      else if (key === "rpQuantityAndRevenueLibraries") {
        if (Array.isArray(project[key])) {
          project[key].forEach((detail) => {
            //EDIT
            if (detail.id > 0) {
              //UPDATE FILE
              if (detail?.files) {
                // FILE

                detail.files.forEach((file) => {
                  formData.append("idUpdatePartLibraries", detail.id);
                  formData.append("categoriesOneUpdate", detail.categoryOne);
                  if (detail.categoryTwo === "") {
                    formData.append("categoriesTwoUpdate", detail.categoryOne);
                  } else {
                    formData.append("categoriesTwoUpdate", detail.categoryTwo);
                  }
                  formData.append("partNameUpdateLibraries", file.name);
                  formData.append("partUpdateLibraries", file);
                });
              }
              //UPDATE LINK
              else if (detail.linkLibrary) {
                formData.append("idLinkLibraries", detail.id);
                formData.append("categoriesOneLink", detail.categoryOne);
                if (detail.categoryTwo === "") {
                  formData.append("categoriesTwoLink", detail.categoryOne);
                } else {
                  formData.append("categoriesTwoLink", detail.categoryTwo);
                }
                formData.append("linkLibraries", detail.linkLibrary);
              }
              //NO-UPDATE FILE || UPDATE PATH
              else {
                formData.append("idUpdatePathLibraries", detail.id);
                formData.append("categoriesOneUpdatePath", detail.categoryOne);
                if (detail.categoryTwo === "") {
                  formData.append(
                    "categoriesTwoUpdatePath",
                    detail.categoryOne
                  );
                } else {
                  formData.append(
                    "categoriesTwoUpdatePath",
                    detail.categoryTwo
                  );
                }
                formData.append("pathUpdateLibraries", detail.pathLibrary);
                formData.append("pathValueUpdateLibraries", detail.fileName);
              }
            }
            //NEW
            else {
              // FILE
              if (detail.files.length > 0) {
                detail.files.forEach((file) => {
                  formData.append("idNewPartLibraries", 0);
                  formData.append("categoriesOneNew", detail.categoryOne);
                  if (detail.categoryTwo === "") {
                    formData.append("categoriesTwoNew", detail.categoryOne);
                  } else {
                    formData.append("categoriesTwoNew", detail.categoryTwo);
                  }
                  formData.append("partNameNewLibraries", file.name);
                  formData.append("partNewLibraries", file);
                });
              }
              // LINK
              else {
                formData.append("idLinkLibraries", 0);
                formData.append("categoriesOneLink", detail.categoryOne);
                if (detail.categoryTwo === "") {
                  formData.append("categoriesTwoLink", detail.categoryOne);
                } else {
                  formData.append("categoriesTwoLink", detail.categoryTwo);
                }
                formData.append("linkLibraries", detail.linkLibrary);
              }
            }
          });
        }
      } else {
        formData.append(key, project[key]);
      }
    });

    const resp = await baseAPI.post("projects/save", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(formData);
    return resp;
  } catch (error) {
    console.log(error);
    if (error.response) {
      throw error.response;
    }
    throw error.message;
  }
}

export async function selectProjectAPI(id) {
  try {
    const resp = await baseAPI.get(`projects/${id}`);
    // console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteProjectAPI(id) {
  try {
    const resp = await baseAPI.get(`projects/delete/${id}`);
    return resp.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function fetchPdfProject(documentId, type) {
  try {
    const response = await baseAPI.get(`projects/url/${type}/${documentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching PDF:", error);
  }
}

//Get-next-monday
export async function getNextMondayAPI(actualWeek, id) {
  try {
    const resp = await baseAPI.get(`date/get-next-monday/${actualWeek}/${id}`);
    // console.log(resp.data);
    return resp.data;
  } catch (error) {
    throw error.response.data;
  }
}

//get actual-quantity-revenue
export async function getOldQuantityRevenueAPI(id) {
  try {
    const resp = await baseAPI.get(`actual-quantity-revenue/${id}`);
    return resp.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function addActualQuantityAndRevenueAPI(
  actualQuantityAndRevenues,
  idProject
) {
  debugger;
  try {
    console.log(actualQuantityAndRevenues);
    const formData = new FormData();
    actualQuantityAndRevenues.map((dataPerWeek) =>
      Object.keys(dataPerWeek).map((key) => {
        if (key === "quantityRevenue") {
          if (Array.isArray(dataPerWeek[key])) {
            dataPerWeek[key].forEach((detail) => {
              if (
                detail.category === "" ||
                detail.unit === "" ||
                detail.quantity === "" ||
                detail.price === ""
              ) {
                return;
              }
              //EDIT
              if (detail.id > 0) {
                formData.append("idActualDetails", detail.id);
                formData.append("entryDate", detail.entryDate);
              }
              //NEW
              else {
                formData.append("idActualDetails", 0);
                formData.append("entryDate", dataPerWeek.actualWeek);
              }
              formData.append("categories", detail.category);
              formData.append("units", detail.unit);
              formData.append("quantities", detail.quantity);
              formData.append("prices", detail.price);
            });
          }
        } else if (key === "actualWeek") {
          // EDIT
          if (dataPerWeek.idQuantityRevenue > 0) {
            formData.append("idActualWeek", dataPerWeek.idQuantityRevenue);
          }
          // NEW
          else {
            formData.append("idActualWeek", 0);
          }
          formData.append("actualWeeks", dataPerWeek[key]);
        }
      })
    );
    const resp = await baseAPI.post(
      `actual-quantity-revenue/save/${idProject}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // console.log(formData);
    return resp;
  } catch (error) {
    // console.log(error);
    if (error.response) {
      throw error.response;
    }
    throw error.message;
  }
}

//get actual-quantity-revenue
export async function getOldActualCostAPI(id) {
  try {
    const resp = await baseAPI.get(`actual-cost/${id}`);
    return resp.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function addActualCostAPI(actualCosts, idProject) {
  // console.log(actualCosts);
  // debugger;
  try {
    // console.log(actualCosts);
    const formData = new FormData();
    actualCosts.map((dataPerWeek) =>
      Object.keys(dataPerWeek).map((key) => {
        if (key === "actualCost") {
          if (Array.isArray(dataPerWeek[key])) {
            dataPerWeek[key].forEach((detail) => {
              //EDIT
              if (detail.id > 0) {
                formData.append("idActualCostDetails", detail.id);
                formData.append("entryDate", detail.entryDate);
              }
              //NEW
              else {
                formData.append("idActualCostDetails", 0);
                formData.append("entryDate", dataPerWeek.actualCostWeek);
              }
              formData.append("cost", detail.cost);

              formData.append("amounts", detail.amount);
            });
          }
        } else if (key === "actualCostWeek") {
          // EDIT
          if (dataPerWeek.idActualCost > 0) {
            formData.append("idActualCostWeek", dataPerWeek.idActualCost);
          }
          // NEW
          else {
            formData.append("idActualCostWeek", 0);
          }
          formData.append("actualCostWeeks", dataPerWeek[key]);
        }
      })
    );
    const resp = await baseAPI.post(`actual-cost/save/${idProject}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(formData);
    return resp;
  } catch (error) {
    console.log(error);
    if (error.response) {
      throw error.response;
    }
    throw error.message;
  }
}
// validateDatePickerAPI
export async function validateDatePickerAPI(date, idProject) {
  // debugger;
  try {
    const resp = await baseAPI.get(`date/validate/${date}/${idProject}`);
    return resp.data;
  } catch (error) {
    throw error.response.data;
  }
}

// EXPORT REPORT
export async function getViewReportQuantityRevenueAndCostAPI(
  idProject,
  typeReport,
  startPicker,
  endPicker,
  categories
) {
  const jsonData = {
    id: idProject,
    type: typeReport,
    startPicker: startPicker,
    endPicker: endPicker,
    categories: categories,
  };
  console.log(jsonData);
  try {
    const resp = await baseAPI.post(`projects/view-report`, jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return resp.data;
  } catch (error) {
    throw error.response.data;
  }
}

// EXPORT REPORT TOTAL
export async function getViewReportCostTotalAPI(startPicker, endPicker) {
  const jsonData = {
    startPicker: startPicker,
    endPicker: endPicker,
  };
  console.log(jsonData);
  try {
    const resp = await baseAPI.post(`projects/view-total-report`, jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return resp.data;
  } catch (error) {
    throw error.response.data;
  }
}
