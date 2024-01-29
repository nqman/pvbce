import baseAPI from "./baseAPI";

//Lấy danh sách tài liệu
export async function listDocumentsAPI() {
  try {
    const resp = await baseAPI.get("documents");
    const data = resp.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function addDocumentAPI(document) {
  try {
    const formData = new FormData();
    if (document.file instanceof File) {
      // console.log(document.file);
      formData.append("libraryFileId", 0);
      formData.append("fileName", document.name);
      formData.append("libraryFile", document.file);
    } else {
      formData.append("detailID", 0);
      formData.append("detailName", document.name);
      formData.append("detailValue", document.link);
    }
    const resp = await baseAPI.post("documents/save", document);
    return resp;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// xóa tài liệu
export async function deleteDocumentAPI(id) {
  try {
    const resp = await baseAPI.get(`documents/delete/${id}`);
    return resp.data;
  } catch (error) {
    throw error.response.data;
  }
}
