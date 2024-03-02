import baseAPI from "./baseAPI";

//Lấy danh sách hạng mục
export async function getCategoriesAPI() {
  try {
    const resp = await baseAPI.get("http://103.82.39.125:8080/categories");
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
    const resp = await baseAPI.post(
      "http://103.82.39.125:8080/categories/save",
      formData
    );
  } catch (error) {}
}

export async function deleteCategoryAPI(id) {
  try {
    const resp = await baseAPI.get(
      `http://103.82.39.125:8080/categories/delete/${id}`
    );
    return resp.data;
  } catch (error) {
    throw error.response.data;
  }
}
