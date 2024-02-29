import baseAPI from "./baseAPI";

export async function addCategoryAPI(category) {
  try {
    const resp = await baseAPI.post("category/save", category);
  } catch (error) {}
}
