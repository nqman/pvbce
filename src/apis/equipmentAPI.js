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
        if (Array.isArray(equipments[key])) {
          equipments[key].forEach((image) => {
            //EDIT
            if (image.id > 0) {
              formData.append("imageIDUpdate", image.id);
              formData.append("pathImage", image.pathImage);
            }
            //NEW
            else {
              formData.append("imageIDNew", 0);
              formData.append("imageFile", image.imageFile);
            }
          });
        }
      } else if (key === "productDetails") {
        if (Array.isArray(equipments[key])) {
          equipments[key].forEach((detail) => {
            //EDIT
            // console.log(detail);
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
                  formData.append("fileUpdate", detail.file);
                  formData.append("fileIDUpdatePart", detail.id);
                  formData.append("fileHeaderUpdatePart", detail.name);
                } else {
                  formData.append("pathFile", detail.pathFile);
                  formData.append("fileIDUpdatePath", detail.id);
                  formData.append("fileHeaderUpdatePath", detail.name);
                  formData.append("fileNameUpdatePath", detail.value);
                }
              } else {
                formData.append("detailID", detail.id);
                formData.append("detailName", detail.name);
                formData.append("detailValue", detail.value);
              }
            }
            //NEW
            else {
              if (detail.file instanceof File) {
                console.log(detail.file);
                formData.append("fileIDNew", 0);
                formData.append("fileHeaderNew", detail.name);
                // formData.append("fileNameNew", detail.file.name);
                formData.append("detailFile", detail.file);
              } else {
                formData.append("detailID", 0);
                formData.append("detailName", detail.name);
                formData.append("detailValue", detail.value);
              }
            }
          });
        }
      } else {
        formData.append(key, equipments[key]);
      }
    });

    // formData.forEach((a, k) => console.log("data", k, a));
    const resp = await axios.post(
      "http://103.82.38.121:8080/products/save",
      // const resp = await baseAPI.post(
      //   "products/save",
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
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// export const editEquipmentAPI = async (id) => {
//   try {
//     const resp = await baseAPI.put(`products/${id}`);
//     return resp;
//   } catch (error) {
//     throw error.response;
//   }
// };

export async function deleteEquipmentAPI(id) {
  try {
    const resp = await baseAPI.get(`products/delete/${id}`);
    return resp.data;
  } catch (error) {
    throw error.response.data;
  }
}
