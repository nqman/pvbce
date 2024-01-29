import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearIcon from "@mui/icons-material/Clear";

export default function ListDocuments({ onDelete, listDocs }) {
  return (
    <div className="mt-3">
      <table className="table">
        <thead>
          <tr>
            <th style={{ color: "#00477b", fontWeight: "bold", width: "50%" }}>
              Tên tài liệu
            </th>
            <th style={{ color: "#00477b", fontWeight: "bold", width: "10%" }}>
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
                    <a href={doc?.linkDoc} target="_blank">
                      <VisibilityIcon />
                    </a>
                    <button
                      style={{
                        border: "1px solid",
                        padding: "0px",
                        marginLeft: "10px",
                        color: "red",
                      }}
                      className="btn"
                    >
                      <ClearIcon />
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>
                    <a href={doc?.pathDoc} target="_blank">
                      <VisibilityIcon />
                    </a>

                    <button
                      style={{
                        border: "1px solid",
                        padding: "0px",
                        marginLeft: "10px",
                        color: "red",
                      }}
                      className="btn"
                    >
                      <ClearIcon />
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
