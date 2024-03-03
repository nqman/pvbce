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
                formData.append("detailFile", detail.file);
              } else {
                formData.append("detailID", 0);
                formData.append("detailName", detail.name);
                formData.append("detailValue", detail.value);
              }
            }
          });
        }
      } else if (key === "productDiaries") {
        if (Array.isArray(equipments[key])) {
          equipments[key].forEach((diary) => {
            //EDIT
            if (diary.id > 0) {
              if (
                diary.file !== null ||
                (typeof diary.file !== "undefined" &&
                  diary.file instanceof File)
              ) {
                if (
                  typeof diary.file !== "undefined" &&
                  diary.file instanceof File
                ) {
                  formData.append("diaryFileUpdate", diary.file);
                  formData.append("diaryFileIDUpdatePart", diary.id);
                  formData.append("diaryFileHeaderUpdatePart", diary.name);
                } else {
                  formData.append("pathDiaryFile", diary.pathFile);
                  formData.append("diaryFileIDUpdatePath", diary.id);
                  formData.append("diaryFileHeaderUpdatePath", diary.name);
                  formData.append("diaryFileNameUpdatePath", diary.value);
                }
              }
            }
            //NEW
            else {
              if (diary.file instanceof File) {
                console.log(diary.file);
                formData.append("diaryFileIDNew", 0);
                formData.append("diaryFileHeaderNew", diary.name);
                formData.append("diaryFile", diary.file);
              }
            }
          });
        }
      } else {
        formData.append(key, equipments[key]);
      }
    });

    // formData.forEach((a, k) => console.log("data", k, a));
    // const resp = await axios.post(
    //   "http://103.82.39.125:8080/products/save",
    const resp = await baseAPI.post("products/save", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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

export async function deleteEquipmentAPI(id) {
  try {
    const resp = await baseAPI.get(`products/delete/${id}`);
    return resp.data;
  } catch (error) {
    throw error.response.data;
  }
}

//PDF
export async function fetchPdfProduct(id, tab) {
  try {
    const response = await baseAPI.get(`products/url/${tab}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching PDF:", error);
  }
}
