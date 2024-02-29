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
    formData.append("id", 0);
    formData.append("category", category);
    const resp = await baseAPI.post(
      "http://103.82.39.125:8080/categories/save",
      formData
    );
    // console.log(resp)
  } catch (error) {}
}
