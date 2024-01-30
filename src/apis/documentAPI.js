import axios from "axios";
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
    // debugger;
    const formData = new FormData();
    if (document.file instanceof File) {
      // console.log(document.file);
      formData.append("documentFileId", 0);
      formData.append("name", document.name);
      formData.append("documentFile", document.file);
    } else {
      formData.append("documentLinkId", 0);
      formData.append("name", document.name);
      formData.append("documentLink", document.link);
    }

    const resp = await baseAPI.post("documents/save", formData, {
      // const resp = await axios.post(
      //   "http://103.82.38.121:8080/document/save",
      //   formData,
      //   {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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

export async function fetchPdf(documentId) {
  try {
    const response = await baseAPI.get(
      `documents/view/${documentId}`,
      // const response = await axios.get(
      //   `http://103.82.38.121:8080/documents/view/${documentId}`,
      {
        responseType: "arraybuffer",
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    console.log(url);
    return url;
  } catch (error) {
    console.error("Error fetching PDF:", error);
  }
}
