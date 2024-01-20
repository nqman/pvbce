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
      } else if (key === "productDetails") {
        if (Array.isArray(equipments[key])) {
          // Modify the structure of each productDetails object to include a file property
          const productDetailsArray = equipments[key].map((detail) => ({
            id: detail.id,
            detailName: detail.detailName,
            detailValue: detail.detailValue,
            file: detail.file || null, // Include the file property
          }));

          formData.append(
            "productDetails",
            JSON.stringify(productDetailsArray)
          );
        }
      } else {
        formData.append(key, equipments[key]);
      }
    });
    const resp = await baseAPI.post("/products/save", formData, {
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
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

export const updateEquipmentAPI = async (equipments) => {
  try {
    const resp = await baseAPI.put("/products/save", equipments);
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
