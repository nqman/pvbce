import axios from "axios";
import baseAPI from "./baseAPI";

//Lấy danh sách các thiết bị
export async function listEquipmentsAPI() {
  try {
    const resp = await baseAPI.get("products");
    const data = resp.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//Thêm thiết bị
export async function addEquipmentAPI(equipments) {
  try {
    // const requestData = JSON.stringify(equipments);
    const formData = new FormData();
    Object.keys(equipments).map((key) => {
      if (key === "productImages") {
        // TODO: add file to form data
        if (Array.isArray(equipments[key])) {
          equipments[key].forEach((detail) => {
            formData.append("imagesOfProduct", detail);
            // formData.append("productImageName", detail.name);
          });
        }
        // if (Array.isArray(equipments[key])) {
        //   equipments[key].forEach((detail) => {
        //     if (detail.file instanceof File) {
        //       formData.append("productImages", detail);
        //       formData.append("productImageName", detail.name);
        //     }
        //   });
        // }
      } else if (key === "productDetails") {
        if (Array.isArray(equipments[key])) {
          equipments[key].forEach((detail, index) => {
            // Append other properties of the object to FormData
            formData.append("detailIDs", 0);
            formData.append("detailNames", detail.detailName);
            formData.append("detailValues", detail.detailValue);
            // Handle the file if it exists
            if (detail.file instanceof File) {
              // Append the file directly to FormData
              formData.append("fileIDs", 0);
              formData.append("fileNames", detail.file.name);
              formData.append("detailFiles", detail.file);
            }
          });
        }
      } else {
        formData.append(key, equipments[key]);
      }
    });

    formData.forEach((a, k) => console.log("data", k, a));
    const resp = await axios.post(
      "http://103.82.38.121:8080/products/save",
      formData,
      {
        headers: {
          // "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return resp;
  } catch (error) {
    console.log(error);
    if (error.response) {
      throw error.response;
    }
    throw error.message;
  }
}
export async function selectEquipmentAPI(id) {
  try {
    const resp = await baseAPI.get(`products/${id}`);
    const data = resp.data;
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const editEquipmentAPI = async (id) => {
  try {
    const resp = await baseAPI.put(`products/${id}`);
    return resp;
  } catch (error) {
    throw error.response;
  }
};

export async function deleteEquipmentAPI(id) {
  try {
    const resp = await baseAPI.get(`products/delete/${id}`);
    return resp.data;
  } catch (error) {
    throw error.response.data;
  }
}
