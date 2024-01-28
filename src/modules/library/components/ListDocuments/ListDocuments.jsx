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

            <th style={{ color: "#00477b", fontWeight: "bold", width: "40%" }}>
              Nội dung
            </th>
            <th style={{ color: "#00477b", fontWeight: "bold", width: "10%" }}>
              Tùy chọn
            </th>
          </tr>
        </thead>
        <tbody>
          {listDocs.map((doc) => (
            <tr>
              <td>{doc.name}</td>
              {doc.link ? <td>{doc.link}</td> : <td>{doc.file}</td>}
              <td>
                <button style={{ padding: "3px" }} className="btn btn-success">
                  <VisibilityIcon />
                </button>
                <button
                  style={{ padding: "3px" }}
                  className="btn btn-danger ms-2"
                >
                  <ClearIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
