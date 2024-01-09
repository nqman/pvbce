import baseAPI from "./baseAPI";

//Lấy danh sách các thiết bị
export async function getListEquipmentsAPI() {
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
// export async function addEquipmentAPI(informations) {
//   try {
//     const resp = await baseAPI.post("products/save", informations);
//     console.log(resp);
//     return resp.data;
//   } catch (error) {
//     console.log(error);
//   }
// }
export async function addEquipmentAPI(informations) {
  try {
    const resp = await baseAPI.post("/products/save", informations);
    return resp;
  } catch (error) {
    if (error.response) {
      throw error.response;
    }
    throw error.message;
  }
}
