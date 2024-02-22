import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearIcon from "@mui/icons-material/Clear";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { fetchPdfDoc } from "../../../../apis/documentAPI";

export default function ListDocuments({ onDelete, listDocs }) {
  const getPdf = async (id, type) => {
    try {
      const url = await fetchPdfDoc(id, type);
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
              style={{
                color: "#00477b",
                fontWeight: "bold",
                width: "150px",
                textAlign: "end",
              }}
            >
              Tùy chọn
            </th>
          </tr>
        </thead>
        <tbody>
          {listDocs?.map((doc) => (
            <tr>
              <td>{doc?.name}</td>

              {doc?.type === "link" ? (
                <>
                  <td style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      className="btn btn-success"
                      style={{
                        padding: "0px",
                        height: "25px",
                        width: "25px",
                        marginRight: "10px",
                      }}
                      onClick={() => getPdf(doc.id, "view")}
                    >
                      <VisibilityIcon
                        sx={{
                          fontSize: "17px",
                          marginBottom: "2px",
                        }}
                      />
                    </button>
                    <button
                      style={{
                        padding: "0px",
                        height: "25px",
                        width: "25px",
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
              ) : doc?.type === "pdf" ? (
                <>
                  <td style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      className="btn btn-success"
                      style={{
                        padding: "0px",
                        height: "25px",
                        width: "25px",
                        marginRight: "10px",
                      }}
                      onClick={() => getPdf(doc.id, "view")}
                    >
                      <VisibilityIcon
                        sx={{
                          fontSize: "17px",
                          marginBottom: "2px",
                        }}
                      />
                    </button>
                    <button
                      className="btn btn-dark"
                      style={{
                        padding: "0px",
                        height: "25px",
                        width: "25px",
                        marginRight: "10px",
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
              ) : (
                <>
                  <td style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      className="btn btn-dark"
                      style={{
                        padding: "0px",
                        height: "25px",
                        width: "25px",
                        marginRight: "10px",
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
