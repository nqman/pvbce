import baseAPI from "./baseAPI";

//Lấy danh sách các thiết bị
export async function listLibrariesAPI() {
  try {
    const resp = await baseAPI.get("products");
    const data = resp.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
