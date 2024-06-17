import axios from "axios";
import baseAPI from "./baseAPI";

//Lấy danh sách tài liệu
export async function listDocumentsAPI(categoryOne, categoryTwo) {
  try {
    const resp = await baseAPI.get(
      `documents/get_list_document/${categoryOne}/${categoryTwo}`
    );
    const data = resp.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function addDocumentAPI(document) {
  // debugger;
  try {
    const formData = new FormData();
    if (document.type === "LIBRARY") {
      if (
        (document.file !== null || document.link.trim().length > 0) &&
        document.name.trim().length > 0
      ) {
        formData.append("type", document.type);
        formData.append("name", document.name);
        if (document.file instanceof File) {
          formData.append("documentFileId", 0);
          formData.append("documentFile", document.file);
        } else {
          formData.append("documentLinkId", 0);
          formData.append("documentLink", document.link);
        }
        if (document.scope === "") {
          formData.append("scope", "public");
        } else {
          formData.append("scope", document.scope);
        }
        formData.append("categoryOne", document.categoryOne);
        if (document.categoryTwo === "") {
          formData.append("categoryTwo", document.categoryOne);
        } else {
          formData.append("categoryTwo", document.categoryTwo);
        }
      }
    } else if (document.type === "PROJECT") {
      formData.append("type", document.type);
      if (document.files.length > 0) {
        document.files.forEach((file) => {
          formData.append("documentFileId", 0);
          formData.append("documentFile", file);
        });
      } else {
        formData.append("documentLinkId", 0);
        formData.append("documentLink", document.link);
      }
      formData.append("categoryOne", document.categoryOne);
      if (document.categoryTwo === "") {
        formData.append("categoryTwo", document.categoryOne);
      } else {
        formData.append("categoryTwo", document.categoryTwo);
      }
    }
    console.log(formData);
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
