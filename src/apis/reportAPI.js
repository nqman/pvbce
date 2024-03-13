import axios from "axios";
import baseAPI from "./baseAPI";

//Lấy danh sách hạng mục
export async function getCategoriesAPI() {
  try {
    const resp = await baseAPI.get("categories");
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addCategoryAPI(category) {
  try {
    const formData = new FormData();
    console.log(category);
    formData.append("id", 0);
    formData.append("name", category.name);
    formData.append("unit", category.unit);
    const resp = await baseAPI.post("categories/save", formData);
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
export async function addProjectAPI(project) {
  try {
    const formData = new FormData();
    Object.keys(project).map((key) => {
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
      } else if (key === "projectLibraries") {
        if (Array.isArray(project[key])) {
          project[key].forEach((detail) => {
            //EDIT
            if (detail.id > 0) {
              if (
                detail.pathFile !== null ||
                (typeof detail.file !== "undefined" &&
                  detail.file instanceof File)
              ) {
                if (
                  typeof detail.file !== "undefined" &&
                  detail.file instanceof File
                ) {
                  formData.append("idUpdatePartLibraries", detail.id);
                  formData.append("partNameUpdateLibraries", detail.name);
                  formData.append("partUpdateLibraries", detail.file);
                } else {
                  formData.append("idUpdatePathLibraries", detail.id);
                  formData.append("pathNameUpdateLibraries", detail.name);
                  formData.append("pathValueUpdateLibraries", detail.value);
                  formData.append("pathUpdateLibraries", detail.pathFile);
                }
              } else {
                formData.append("idLinkLibraries", detail.id);
                formData.append("linkNameLibraries", detail.name);
                formData.append("linkLibraries", detail.value);
              }
            }
            //NEW
            else {
              if (detail.file instanceof File) {
                console.log(detail.file);
                formData.append("idNewPartLibraries", 0);
                formData.append("partNameNewLibraries", detail.name);
                formData.append("partNewLibraries", detail.file);
              } else {
                formData.append("idLinkLibraries", 0);
                formData.append("linkNameLibraries", detail.name);
                formData.append("linkLibraries", detail.value);
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
export async function getNextMondayAPI(currentWeek, id) {
  try {
    const resp = await baseAPI.get(`date/get-next-monday/${currentWeek}/${id}`);
    return resp.data;
  } catch (error) {
    throw error.response.data;
  }
}

//get actual-quantity-revenue
export async function getActualQuantityRevenueAPI(id) {
  try {
    // const resp = await baseAPI.get(`actual-quantity-revenue/${id}`);
    const resp = await baseAPI.get(`actual-quantity-revenue/${id}`);
    return resp.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function addActualQuantityAndRevenueAPI(data) {
  try {
    const formData = new FormData();
    Object.keys(data).map((key) => {
      if (key === "rpQuantityAndRevenueDetails") {
        if (Array.isArray(data[key])) {
          data[key].forEach((detail) => {
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
      } else if (key === "dataLibraries") {
        if (Array.isArray(data[key])) {
          data[key].forEach((detail) => {
            //EDIT
            if (detail.id > 0) {
              if (
                detail.pathFile !== null ||
                (typeof detail.file !== "undefined" &&
                  detail.file instanceof File)
              ) {
                if (
                  typeof detail.file !== "undefined" &&
                  detail.file instanceof File
                ) {
                  formData.append("idUpdatePartLibraries", detail.id);
                  formData.append("partNameUpdateLibraries", detail.name);
                  formData.append("partUpdateLibraries", detail.file);
                } else {
                  formData.append("idUpdatePathLibraries", detail.id);
                  formData.append("pathNameUpdateLibraries", detail.name);
                  formData.append("pathValueUpdateLibraries", detail.value);
                  formData.append("pathUpdateLibraries", detail.pathFile);
                }
              } else {
                formData.append("idLinkLibraries", detail.id);
                formData.append("linkNameLibraries", detail.name);
                formData.append("linkLibraries", detail.value);
              }
            }
            //NEW
            else {
              if (detail.file instanceof File) {
                console.log(detail.file);
                formData.append("idNewPartLibraries", 0);
                formData.append("partNameNewLibraries", detail.name);
                formData.append("partNewLibraries", detail.file);
              } else {
                formData.append("idLinkLibraries", 0);
                formData.append("linkNameLibraries", detail.name);
                formData.append("linkLibraries", detail.value);
              }
            }
          });
        }
      } else {
        formData.append(key, data[key]);
      }
    });

    const resp = await baseAPI.post(
      `actual-quantity-revenue/save/${data.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
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
