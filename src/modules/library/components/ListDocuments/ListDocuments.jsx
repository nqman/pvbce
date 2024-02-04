import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearIcon from "@mui/icons-material/Clear";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { fetchPdfDoc } from "../../../../apis/documentAPI";

export default function ListDocuments({ onDelete, listDocs }) {
  const getPdf = async (id, type) => {
    try {
      const url = await fetchPdfDoc(id, type);
      // console.log(url);
      window.open(url, "_blank");
    } catch (error) {}
  };

  return (
    <div className="mt-3">
      <table className="table">
        <thead>
          <tr>
            <th style={{ color: "#00477b", fontWeight: "bold" }}>
              Tên tài liệu
            </th>
            <th
              style={{ color: "#00477b", fontWeight: "bold", width: "150px" }}
            >
              Tùy chọn
            </th>
          </tr>
        </thead>
        <tbody>
          {listDocs?.map((doc) => (
            <tr>
              <td>{doc?.name}</td>
              {doc?.linkDoc ? (
                <>
                  <td>
                    <button
                      className="read-doc"
                      onClick={() => getPdf(doc.id, "view")}
                    >
                      <VisibilityIcon
                        sx={{
                          fontSize: "17px",
                          margin: "auto",
                        }}
                      />
                    </button>
                    <button
                      style={{
                        border: "1px solid",
                        padding: "0px",
                        marginLeft: "10px",
                        color: "red",
                      }}
                      className="btn"
                      onClick={() => onDelete(doc.id)}
                    >
                      <ClearIcon />
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>
                    <button
                      className="btn btn-success"
                      style={{
                        padding: "0px",
                        height: "25px",
                        width: "25px",
                      }}
                      onClick={() => getPdf(doc.id, "view")}
                    >
                      <VisibilityIcon
                        sx={{
                          fontSize: "17px",
                        }}
                      />
                    </button>
                    <button
                      className="btn btn-dark"
                      style={{
                        padding: "0px",
                        height: "25px",
                        width: "25px",
                        marginLeft: "10px",
                      }}
                      onClick={() => getPdf(doc.id, "attachment")}
                    >
                      <FileDownloadIcon
                        sx={{
                          fontSize: "17px",
                        }}
                      />
                    </button>

                    <button
                      style={{
                        padding: "0px",
                        height: "25px",
                        width: "25px",
                        marginLeft: "10px",
                      }}
                      className="btn btn-danger"
                      onClick={() => onDelete(doc.id)}
                    >
                      <ClearIcon
                        sx={{
                          fontSize: "17px",
                        }}
                      />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
