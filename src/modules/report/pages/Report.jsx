import React from "react";
import { useNavigate } from "react-router-dom";

export default function Report() {
  const navigate = useNavigate();
  return (
    <div>
      {/* Chức năng này vẫn đang trong quá trình phát triển. Hãy quay lại sau! */}
      <button onClick={() => navigate("/report/create-project")}>
        Khởi tạo dự án
      </button>
    </div>
  );
}
