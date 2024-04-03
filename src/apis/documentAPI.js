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
      formData.append("documentFileId", 0);
      formData.append("documentFile", document.file);
    } else {
      formData.append("documentLinkId", 0);
      formData.append("documentLink", document.link);
    }
    formData.append("name", document.name);
    formData.append("scope", document.scope);

    const resp = await baseAPI.post("documents/save", formData, {
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

export async function fetchPdfDoc(documentId, type) {
  try {
    const response = await baseAPI.get(`documents/url/${type}/${documentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching PDF:", error);
  }
}
