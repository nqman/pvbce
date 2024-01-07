import baseAPI from "./baseAPI";

//Lấy danh sách các thiết bị
export async function getListEquipmentsAPI() {
  try {
    const resp = await baseAPI.get("products");
    const data = await resp.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//Thêm thiết bị
export async function addEquipmentAPI(informations) {
  try {
    const resp = await baseAPI.post("/save", informations);
    return resp;
  } catch (error) {
    console.log(error);
  }
}
